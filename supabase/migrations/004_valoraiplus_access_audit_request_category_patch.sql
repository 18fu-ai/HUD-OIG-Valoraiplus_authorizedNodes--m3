-- ============================================================
-- VALORAIPLUS Safe Access Audit Layer — Phase 2 Full Patch
-- Migration: 004_valoraiplus_access_audit_request_category_patch
--
-- Implements:
-- 1. user_agent_hash
-- 2. session_hash
-- 3. request_category
-- 4. request category breakdown view
-- 5. public-safe hourly summary view
-- 6. enriched rollup trigger with per-category counters
--
-- Safe posture: no raw IP or raw user-agent stored.
-- ============================================================

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Base table for fresh installs
CREATE TABLE IF NOT EXISTS public.valoraiplus_access_logs (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  occurred_at     timestamptz NOT NULL DEFAULT now(),
  visitor_hash    char(64)    NOT NULL CHECK (visitor_hash ~ '^[a-f0-9]{64}$'),
  request_path    text        NOT NULL,
  request_class   text        NOT NULL DEFAULT 'unknown',
  country_code    varchar(10),
  region_code     varchar(32),
  city_name       text,
  referrer_origin text,
  is_anomaly      boolean     NOT NULL DEFAULT false,
  anomaly_type    text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Phase 2 columns (idempotent)
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS user_agent_hash       char(64);
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS session_hash          char(64);
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS request_category      text        NOT NULL DEFAULT 'unknown';
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS request_method        varchar(16) NOT NULL DEFAULT 'GET';
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS continent_code        varchar(10);
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS vercel_id             text;
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS deployment_url        text;
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS user_agent_family     text        NOT NULL DEFAULT 'unknown';
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS anomaly_flags         text[]      NOT NULL DEFAULT '{}';
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS anomaly_score         integer     NOT NULL DEFAULT 0;
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS source               text        NOT NULL DEFAULT 'vercel_edge_middleware_phase2';
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS raw_ip_stored         boolean     NOT NULL DEFAULT false;
ALTER TABLE public.valoraiplus_access_logs ADD COLUMN IF NOT EXISTS raw_user_agent_stored boolean     NOT NULL DEFAULT false;

-- Backfill request_category from request_class
UPDATE public.valoraiplus_access_logs
SET request_category = COALESCE(NULLIF(request_category, ''), request_class, 'unknown')
WHERE request_category IS NULL OR request_category = '';

-- Safety constraints (idempotent)
DO $$ BEGIN
  ALTER TABLE public.valoraiplus_access_logs
    ADD CONSTRAINT valoraiplus_access_logs_user_agent_hash_format
    CHECK (user_agent_hash IS NULL OR user_agent_hash ~ '^[a-f0-9]{64}$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.valoraiplus_access_logs
    ADD CONSTRAINT valoraiplus_access_logs_session_hash_format
    CHECK (session_hash IS NULL OR session_hash ~ '^[a-f0-9]{64}$');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.valoraiplus_access_logs
    ADD CONSTRAINT valoraiplus_access_logs_request_category_valid
    CHECK (request_category IN ('page','pdf','api','asset','document','search','unknown'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.valoraiplus_access_logs
    ADD CONSTRAINT valoraiplus_access_logs_user_agent_family_valid
    CHECK (user_agent_family IN ('bot','mobile_browser','desktop_browser','unknown'));
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.valoraiplus_access_logs
    ADD CONSTRAINT valoraiplus_access_logs_no_raw_ip
    CHECK (raw_ip_stored = false);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  ALTER TABLE public.valoraiplus_access_logs
    ADD CONSTRAINT valoraiplus_access_logs_no_raw_ua
    CHECK (raw_user_agent_stored = false);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Session rollups table
CREATE TABLE IF NOT EXISTS public.valoraiplus_session_rollups (
  id                    uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_hash          char(64)    NOT NULL UNIQUE CHECK (visitor_hash ~ '^[a-f0-9]{64}$'),
  session_hash          char(64)    CHECK (session_hash IS NULL OR session_hash ~ '^[a-f0-9]{64}$'),
  total_requests        integer     NOT NULL DEFAULT 0,
  page_requests         integer     NOT NULL DEFAULT 0,
  pdf_requests          integer     NOT NULL DEFAULT 0,
  api_requests          integer     NOT NULL DEFAULT 0,
  document_requests     integer     NOT NULL DEFAULT 0,
  search_requests       integer     NOT NULL DEFAULT 0,
  bot_like_requests     integer     NOT NULL DEFAULT 0,
  anomaly_count         integer     NOT NULL DEFAULT 0,
  first_seen            timestamptz NOT NULL DEFAULT now(),
  last_seen             timestamptz NOT NULL DEFAULT now(),
  latest_request_path   text,
  latest_referrer_origin text,
  latest_country_code   varchar(10),
  latest_region_code    varchar(32),
  latest_city_name      text,
  updated_at            timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.valoraiplus_session_rollups ADD COLUMN IF NOT EXISTS session_hash       char(64);
ALTER TABLE public.valoraiplus_session_rollups ADD COLUMN IF NOT EXISTS document_requests  integer NOT NULL DEFAULT 0;
ALTER TABLE public.valoraiplus_session_rollups ADD COLUMN IF NOT EXISTS search_requests    integer NOT NULL DEFAULT 0;

-- Enriched rollup trigger using request_category
CREATE OR REPLACE FUNCTION public.valoraiplus_rollup_access_log()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO public.valoraiplus_session_rollups (
    visitor_hash, session_hash,
    total_requests, page_requests, pdf_requests, api_requests,
    document_requests, search_requests, bot_like_requests, anomaly_count,
    first_seen, last_seen,
    latest_request_path, latest_referrer_origin,
    latest_country_code, latest_region_code, latest_city_name,
    updated_at
  ) VALUES (
    NEW.visitor_hash, NEW.session_hash,
    1,
    CASE WHEN NEW.request_category = 'page'     THEN 1 ELSE 0 END,
    CASE WHEN NEW.request_category = 'pdf'      THEN 1 ELSE 0 END,
    CASE WHEN NEW.request_category = 'api'      THEN 1 ELSE 0 END,
    CASE WHEN NEW.request_category = 'document' THEN 1 ELSE 0 END,
    CASE WHEN NEW.request_category = 'search'   THEN 1 ELSE 0 END,
    CASE WHEN NEW.user_agent_family = 'bot'     THEN 1 ELSE 0 END,
    CASE WHEN NEW.is_anomaly                    THEN 1 ELSE 0 END,
    COALESCE(NEW.occurred_at, NEW.created_at),
    COALESCE(NEW.occurred_at, NEW.created_at),
    NEW.request_path, NEW.referrer_origin,
    NEW.country_code, NEW.region_code, NEW.city_name,
    now()
  )
  ON CONFLICT (visitor_hash) DO UPDATE SET
    session_hash          = COALESCE(EXCLUDED.session_hash,         public.valoraiplus_session_rollups.session_hash),
    total_requests        = public.valoraiplus_session_rollups.total_requests    + 1,
    page_requests         = public.valoraiplus_session_rollups.page_requests     + EXCLUDED.page_requests,
    pdf_requests          = public.valoraiplus_session_rollups.pdf_requests      + EXCLUDED.pdf_requests,
    api_requests          = public.valoraiplus_session_rollups.api_requests      + EXCLUDED.api_requests,
    document_requests     = public.valoraiplus_session_rollups.document_requests + EXCLUDED.document_requests,
    search_requests       = public.valoraiplus_session_rollups.search_requests   + EXCLUDED.search_requests,
    bot_like_requests     = public.valoraiplus_session_rollups.bot_like_requests + EXCLUDED.bot_like_requests,
    anomaly_count         = public.valoraiplus_session_rollups.anomaly_count     + EXCLUDED.anomaly_count,
    last_seen             = GREATEST(public.valoraiplus_session_rollups.last_seen, EXCLUDED.last_seen),
    latest_request_path   = EXCLUDED.latest_request_path,
    latest_referrer_origin = EXCLUDED.latest_referrer_origin,
    latest_country_code   = COALESCE(EXCLUDED.latest_country_code,   public.valoraiplus_session_rollups.latest_country_code),
    latest_region_code    = COALESCE(EXCLUDED.latest_region_code,    public.valoraiplus_session_rollups.latest_region_code),
    latest_city_name      = COALESCE(EXCLUDED.latest_city_name,      public.valoraiplus_session_rollups.latest_city_name),
    updated_at            = now();

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_valoraiplus_rollup_access_log ON public.valoraiplus_access_logs;
CREATE TRIGGER trg_valoraiplus_rollup_access_log
AFTER INSERT ON public.valoraiplus_access_logs
FOR EACH ROW EXECUTE FUNCTION public.valoraiplus_rollup_access_log();

-- Indexes
CREATE INDEX IF NOT EXISTS idx_valoraiplus_access_logs_user_agent_hash     ON public.valoraiplus_access_logs(user_agent_hash);
CREATE INDEX IF NOT EXISTS idx_valoraiplus_access_logs_session_hash_created ON public.valoraiplus_access_logs(session_hash, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_valoraiplus_access_logs_request_category     ON public.valoraiplus_access_logs(request_category);
CREATE INDEX IF NOT EXISTS idx_valoraiplus_access_logs_category_time        ON public.valoraiplus_access_logs(request_category, created_at DESC);

-- Dashboard-ready request category breakdown view
CREATE OR REPLACE VIEW public.valoraiplus_request_category_breakdown AS
SELECT
  request_category,
  count(*)                                          AS total_hits,
  count(*) FILTER (WHERE is_anomaly = true)         AS anomaly_hits,
  count(*) FILTER (WHERE user_agent_family = 'bot') AS bot_like_hits,
  min(created_at)                                   AS first_seen,
  max(created_at)                                   AS last_seen
FROM public.valoraiplus_access_logs
GROUP BY request_category
ORDER BY total_hits DESC;

-- Public-safe hourly summary view
CREATE OR REPLACE VIEW public.valoraiplus_access_summary_public_safe AS
SELECT
  date_trunc('hour', created_at)                         AS hour_bucket,
  request_category,
  country_code,
  count(*)                                               AS total_hits,
  count(*) FILTER (WHERE request_category = 'pdf')       AS pdf_hits,
  count(*) FILTER (WHERE user_agent_family = 'bot')      AS bot_like_hits,
  count(*) FILTER (WHERE is_anomaly = true)              AS anomaly_hits
FROM public.valoraiplus_access_logs
GROUP BY 1, 2, 3
ORDER BY hour_bucket DESC;

-- RLS
ALTER TABLE public.valoraiplus_access_logs    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valoraiplus_session_rollups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "service role full access logs"    ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "service role full access rollups" ON public.valoraiplus_session_rollups;
DROP POLICY IF EXISTS "admin reads logs"                 ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "admin reads rollups"              ON public.valoraiplus_session_rollups;

CREATE POLICY "service role full access logs"
  ON public.valoraiplus_access_logs FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "service role full access rollups"
  ON public.valoraiplus_session_rollups FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "admin reads logs"
  ON public.valoraiplus_access_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

CREATE POLICY "admin reads rollups"
  ON public.valoraiplus_session_rollups FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'));

COMMIT;
