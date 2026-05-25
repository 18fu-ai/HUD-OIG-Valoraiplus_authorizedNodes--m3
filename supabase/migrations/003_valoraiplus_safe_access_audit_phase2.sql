-- VALORAIPLUS® Safe Access Audit — Production Schema (Final)
-- Privacy contract: Raw IP and raw user-agent exist only transiently in
-- server memory for HMAC generation. They are never stored, displayed,
-- exported, or placed into court filings.
--
-- System description (court-safe):
--   VALORAIPLUS maintains a privacy-preserving access-audit layer for owned
--   web infrastructure. The system records timestamped technical access events,
--   route paths, request categories, coarse hosting-provider geolocation headers,
--   and anonymized HMAC-based visitor/session indicators. It does not store raw
--   IP addresses, raw user-agent strings, private contact information, medical
--   information, or confidential witness material. The system is used for
--   security monitoring, access-pattern review, and evidence-preservation only.

-- ---------------------------------------------------------------------------
-- 1. BASE ACCESS LOGS
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.valoraiplus_access_logs (
    id               UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    -- HMAC-SHA256 hashes — no raw PII stored
    visitor_hash     CHAR(64)     NOT NULL,
    user_agent_hash  CHAR(64),
    session_hash     CHAR(64),
    -- Safe request metadata
    request_path     TEXT         NOT NULL,
    request_method   VARCHAR(10)  NOT NULL DEFAULT 'GET',
    request_category TEXT         NOT NULL DEFAULT 'PAGE',
    ua_family        TEXT,
    referrer_origin  TEXT,
    -- Coarse geo (Vercel Edge headers — provider-level, not precise)
    country_code     VARCHAR(10),
    region_code      VARCHAR(10),
    city_name        TEXT,
    -- Anomaly classification
    is_anomaly       BOOLEAN      NOT NULL DEFAULT FALSE,
    anomaly_type     TEXT,
    anomaly_score    NUMERIC(4,2) NOT NULL DEFAULT 0.00,
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 2. SESSION ROLLUPS (auto-maintained by trigger)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.valoraiplus_session_rollups (
    id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_hash   CHAR(64)    NOT NULL UNIQUE,
    total_requests INT         NOT NULL DEFAULT 1,
    first_seen     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 3. NETWORK FINGERPRINTS (anonymized meta anchors)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.valoraiplus_network_fingerprints (
    id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_hash     CHAR(64)    NOT NULL UNIQUE,
    fingerprint_hash CHAR(64)    NOT NULL,
    last_updated     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------------------------
-- 4. INDEXES
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_access_logs_hash        ON public.valoraiplus_access_logs(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_access_logs_session     ON public.valoraiplus_access_logs(session_hash);
CREATE INDEX IF NOT EXISTS idx_access_logs_created     ON public.valoraiplus_access_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_access_logs_path        ON public.valoraiplus_access_logs(request_path);
CREATE INDEX IF NOT EXISTS idx_access_logs_category    ON public.valoraiplus_access_logs(request_category);
CREATE INDEX IF NOT EXISTS idx_access_logs_anomaly     ON public.valoraiplus_access_logs(is_anomaly) WHERE is_anomaly = TRUE;
CREATE INDEX IF NOT EXISTS idx_session_rollups_hash    ON public.valoraiplus_session_rollups(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_session_rollups_last    ON public.valoraiplus_session_rollups(last_seen);

-- ---------------------------------------------------------------------------
-- 5. TRIGGER: SESSION ROLLUP + NETWORK FINGERPRINT ANCHOR
-- ---------------------------------------------------------------------------
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION public.sync_valoraiplus_phase2_telemetry()
RETURNS TRIGGER AS $$
DECLARE
    computed_fingerprint CHAR(64);
BEGIN
    -- Session rollup upsert
    INSERT INTO public.valoraiplus_session_rollups
        (visitor_hash, total_requests, first_seen, last_seen)
    VALUES
        (NEW.visitor_hash, 1, NEW.created_at, NEW.created_at)
    ON CONFLICT (visitor_hash) DO UPDATE
        SET total_requests = public.valoraiplus_session_rollups.total_requests + 1,
            last_seen      = EXCLUDED.created_at;

    -- Salted fingerprint anchor (visitor_hash + country, no raw data)
    computed_fingerprint := encode(
        digest(NEW.visitor_hash || COALESCE(NEW.country_code, 'XX'), 'sha256'),
        'hex'
    );

    INSERT INTO public.valoraiplus_network_fingerprints
        (visitor_hash, fingerprint_hash, last_updated)
    VALUES
        (NEW.visitor_hash, computed_fingerprint, NEW.created_at)
    ON CONFLICT (visitor_hash) DO UPDATE
        SET fingerprint_hash = EXCLUDED.fingerprint_hash,
            last_updated     = EXCLUDED.created_at;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_valoraiplus_phase2_telemetry ON public.valoraiplus_access_logs;
CREATE TRIGGER trg_sync_valoraiplus_phase2_telemetry
AFTER INSERT ON public.valoraiplus_access_logs
FOR EACH ROW EXECUTE FUNCTION public.sync_valoraiplus_phase2_telemetry();

-- ---------------------------------------------------------------------------
-- 6. ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------
ALTER TABLE public.valoraiplus_access_logs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valoraiplus_session_rollups      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valoraiplus_network_fingerprints ENABLE ROW LEVEL SECURITY;

-- Drop any legacy policies
DROP POLICY IF EXISTS "edge insert policy"                ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "admin read policy"                 ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "service role full access logs"     ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "service role full access rollups"  ON public.valoraiplus_session_rollups;
DROP POLICY IF EXISTS "service role full access fp"       ON public.valoraiplus_network_fingerprints;
DROP POLICY IF EXISTS "admin reads logs"                  ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "admin reads rollups"               ON public.valoraiplus_session_rollups;
DROP POLICY IF EXISTS "admin reads fingerprints"          ON public.valoraiplus_network_fingerprints;

-- Service role (Vercel Edge API) — full insert/read access
CREATE POLICY "service role full access logs"
    ON public.valoraiplus_access_logs FOR ALL
    USING     (auth.role() = 'service_role')
    WITH CHECK(auth.role() = 'service_role');

CREATE POLICY "service role full access rollups"
    ON public.valoraiplus_session_rollups FOR ALL
    USING     (auth.role() = 'service_role')
    WITH CHECK(auth.role() = 'service_role');

CREATE POLICY "service role full access fp"
    ON public.valoraiplus_network_fingerprints FOR ALL
    USING     (auth.role() = 'service_role')
    WITH CHECK(auth.role() = 'service_role');

-- Admin role — read only
CREATE POLICY "admin reads logs"
    ON public.valoraiplus_access_logs FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "admin reads rollups"
    ON public.valoraiplus_session_rollups FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "admin reads fingerprints"
    ON public.valoraiplus_network_fingerprints FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.user_roles
            WHERE user_id = auth.uid() AND role = 'admin'
        )
    );
