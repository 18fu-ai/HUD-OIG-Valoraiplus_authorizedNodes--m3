import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';

const supabaseUrl         = process.env.NEXT_PUBLIC_SUPABASE_URL        || '';
const supabaseServiceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY       || '';

// Service-role client — bypasses RLS for telemetry inserts
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export async function POST(req: NextRequest) {
  try {
    const {
      rawIp,
      rawUserAgent,
      path,
      country,
      region,
      city,
      referrer,
    } = await req.json();

    const secret = process.env.VALORAIPLUS_TELEMETRY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { status: 'ERROR', message: 'Missing core verification secret' },
        { status: 500 }
      );
    }

    // HMAC-SHA256: neutralise raw PII before any write
    const visitorHash = createHmac('sha256', secret)
      .update(`${rawIp}-${rawUserAgent}`)
      .digest('hex');

    // Anomaly scoring
    let isAnomaly    = false;
    let anomalyType  : string | null = null;
    let anomalyScore = 0.00;

    const uaLower = (rawUserAgent || '').toLowerCase();

    if (
      uaLower.includes('bot')      ||
      uaLower.includes('scraper')  ||
      uaLower.includes('headless') ||
      uaLower.includes('crawler')  ||
      uaLower.includes('spider')
    ) {
      isAnomaly    = true;
      anomalyType  = 'AUTOMATED_BOT_DETECTION';
      anomalyScore = 0.75;
    } else if (
      path.includes('.env')        ||
      path.includes('.git')        ||
      path.includes('wp-admin')    ||
      path.includes('phpMyAdmin')  ||
      path.includes('../')
    ) {
      isAnomaly    = true;
      anomalyType  = 'INVALID_PATH_TRAVERSAL';
      anomalyScore = 0.95;
    } else if (!referrer || referrer === 'DIRECT') {
      if (path !== '/' && path !== '') {
        isAnomaly    = true;
        anomalyType  = 'UNEXPECTED_ENTRY_FLOW';
        anomalyScore = 0.30;
      }
    }

    const { error } = await supabase
      .from('valoraiplus_access_logs')
      .insert([{
        visitor_hash  : visitorHash,
        request_path  : path,
        country_code  : country  || null,
        region_code   : region   || null,
        city_name     : city === 'UNKNOWN' ? null : (city || null),
        referrer      : (!referrer || referrer === 'DIRECT') ? null : referrer,
        is_anomaly    : isAnomaly,
        anomaly_type  : anomalyType,
        anomaly_score : anomalyScore,
      }]);

    if (error) throw error;

    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { status: 'ERROR', message: err.message },
      { status: 500 }
    );
  }
}
