-- VALORAIPLUS® Safe Access Audit Phase 2 Hardened Schema
-- Architecture: Privacy-Preserving Telemetry, Bounded Flows, HMAC-SHA256 Identity

-- 1. BASE ACCESS LOGS
CREATE TABLE IF NOT EXISTS public.valoraiplus_access_logs (
    id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_hash    CHAR(64)     NOT NULL,
    request_path    TEXT         NOT NULL,
    country_code    VARCHAR(10),
    region_code     VARCHAR(10),
    city_name       TEXT,
    referrer        TEXT,
    is_anomaly      BOOLEAN      DEFAULT FALSE,
    anomaly_type    TEXT,
    anomaly_score   NUMERIC(4,2) DEFAULT 0.00,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 2. AUTOMATED SESSION ROLLUPS
CREATE TABLE IF NOT EXISTS public.valoraiplus_session_rollups (
    id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_hash   CHAR(64)    NOT NULL UNIQUE,
    total_requests INT         DEFAULT 1,
    first_seen     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_seen      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. NETWORK FINGERPRINTS (ANONYMIZED META-FIELDS)
CREATE TABLE IF NOT EXISTS public.valoraiplus_network_fingerprints (
    id                  UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_hash        CHAR(64)    NOT NULL UNIQUE,
    fingerprint_hash    CHAR(64)    NOT NULL,
    last_updated        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. INDEXES
CREATE INDEX IF NOT EXISTS idx_access_logs_hash     ON public.valoraiplus_access_logs(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_access_logs_created  ON public.valoraiplus_access_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_access_logs_path     ON public.valoraiplus_access_logs(request_path);
CREATE INDEX IF NOT EXISTS idx_access_logs_anomaly  ON public.valoraiplus_access_logs(is_anomaly) WHERE is_anomaly = TRUE;
CREATE INDEX IF NOT EXISTS idx_session_rollups_last ON public.valoraiplus_session_rollups(last_seen);

-- 5. TRIGGER FUNCTION: SESSION ROLLUP + FINGERPRINT ANCHOR
CREATE OR REPLACE FUNCTION public.sync_valoraiplus_phase2_telemetry()
RETURNS TRIGGER AS $$
DECLARE
    computed_fingerprint CHAR(64);
BEGIN
    -- Session rollup upsert
    INSERT INTO public.valoraiplus_session_rollups (visitor_hash, total_requests, first_seen, last_seen)
    VALUES (NEW.visitor_hash, 1, NEW.created_at, NEW.created_at)
    ON CONFLICT (visitor_hash) DO UPDATE
        SET total_requests = public.valoraiplus_session_rollups.total_requests + 1,
            last_seen      = EXCLUDED.created_at;

    -- Compute salted fingerprint anchor (pgcrypto digest)
    computed_fingerprint := encode(
        digest(NEW.visitor_hash || COALESCE(NEW.country_code, 'XX'), 'sha256'),
        'hex'
    );

    INSERT INTO public.valoraiplus_network_fingerprints (visitor_hash, fingerprint_hash, last_updated)
    VALUES (NEW.visitor_hash, computed_fingerprint, NEW.created_at)
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

-- 6. ROW LEVEL SECURITY
ALTER TABLE public.valoraiplus_access_logs          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valoraiplus_session_rollups      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valoraiplus_network_fingerprints ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "edge insert policy"                ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "admin read policy"                 ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "service role full access logs"     ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "service role full access rollups"  ON public.valoraiplus_session_rollups;
DROP POLICY IF EXISTS "service role full access fp"       ON public.valoraiplus_network_fingerprints;
DROP POLICY IF EXISTS "admin reads logs"                  ON public.valoraiplus_access_logs;
DROP POLICY IF EXISTS "admin reads rollups"               ON public.valoraiplus_session_rollups;
DROP POLICY IF EXISTS "admin reads fingerprints"          ON public.valoraiplus_network_fingerprints;

-- Service role (Vercel Edge API) — full write access
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
