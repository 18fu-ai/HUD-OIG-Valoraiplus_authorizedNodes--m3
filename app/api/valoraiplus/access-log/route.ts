import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHmac } from 'crypto';

const supabaseUrl         = process.env.NEXT_PUBLIC_SUPABASE_URL        || '';
const supabaseServiceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY       || '';

// Service-role client — bypasses RLS for telemetry inserts
const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
  : null;

export async function POST(req: NextRequest) {
  try {
    // Gracefully skip if Supabase is not configured
    if (!supabase) {
      return NextResponse.json({ status: 'SKIPPED', reason: 'Supabase not configured' }, { status: 200 });
    }

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
      // No secret configured — skip telemetry silently
      return NextResponse.json({ status: 'SKIPPED', reason: 'Telemetry secret not configured' }, { status: 200 });
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

    if (error) {
      // Table may not exist yet — gracefully skip
      // PGRST205 = "Could not find the table in the schema cache" (table doesn't exist)
      const isTableMissing = 
        error.code === 'PGRST205' ||
        error.code === 'PGRST204' || 
        error.code === 'PGRST116' ||
        error.code === '42P01' || 
        error.message?.includes('does not exist') ||
        error.message?.includes('schema cache') ||
        error.message?.includes('relation');
        
      if (isTableMissing) {
        // Silent skip — table not created yet, this is expected pre-migration
        return NextResponse.json({ status: 'SKIPPED', reason: 'Table not yet created' }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({ status: 'SUCCESS' }, { status: 200 });
  } catch (err: unknown) {
    // Check if it's a Supabase/PostgREST error indicating missing table
    const supabaseError = err as { code?: string; message?: string; status?: number };
    const isTableMissing = 
      supabaseError.code === 'PGRST205' ||
      supabaseError.code === 'PGRST204' || 
      supabaseError.code === 'PGRST116' ||
      supabaseError.code === '42P01' || 
      supabaseError.message?.includes('does not exist') ||
      supabaseError.message?.includes('schema cache') ||
      supabaseError.message?.includes('relation');
      
    if (isTableMissing) {
      // Silent skip — table not created yet (expected pre-migration)
      return NextResponse.json({ status: 'SKIPPED', reason: 'Table not yet created' }, { status: 200 });
    }
    
    // Log unexpected errors server-side only (not table-missing errors)
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[valoraiplus/access-log] Unexpected error:', message);
    // Return 200 to prevent middleware from retrying — telemetry failures are non-critical
    return NextResponse.json({ status: 'SKIPPED', reason: 'Internal error' }, { status: 200 });
  }
}
