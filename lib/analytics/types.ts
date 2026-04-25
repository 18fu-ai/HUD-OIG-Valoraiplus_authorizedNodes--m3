// ============================================================
// ANALYTICS TYPES — DUAL-BOUNDARY INVARIANT
// ============================================================
// 
// CORE INVARIANT:
// - analytics visibility must match source certainty
// - simulated → clearly labeled
// - live → source-backed
//
// ============================================================

/**
 * Analytics data source mode
 */
export type AnalyticsMode =
  | 'SIMULATED'      // No API token, using generated data
  | 'VERCEL_API'     // Live data from Vercel Analytics API
  | 'STATIC_EXPORT'; // Pre-built static data

/**
 * Individual route traffic metrics
 */
export interface TrafficMetric {
  route: string;
  views: number;
  uniqueVisitors: number;
  avgSessionSeconds: number;
  bounceRate: number;
  corroboration: 'SIMULATED' | 'VERIFIED';
}

/**
 * Hourly traffic data point
 */
export interface HourlyTraffic {
  hour: string;
  views: number;
  visitors: number;
}

/**
 * Geographic traffic distribution
 */
export interface GeoTraffic {
  country: string;
  visits: number;
  percentage: number;
}

/**
 * Device breakdown
 */
export interface DeviceTraffic {
  device: 'Desktop' | 'Mobile' | 'Tablet';
  percentage: number;
  sessions: number;
}

/**
 * Traffic source/referrer
 */
export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

/**
 * Complete analytics payload
 */
export interface AnalyticsPayload {
  mode: AnalyticsMode;
  timestamp: string;
  period: {
    start: string;
    end: string;
    hours: number;
  };
  summary: {
    totalViews: number;
    uniqueVisitors: number;
    avgSessionSeconds: number;
    bounceRate: number;
  };
  routes: TrafficMetric[];
  hourly: HourlyTraffic[];
  geo: GeoTraffic[];
  devices: DeviceTraffic[];
  sources: TrafficSource[];
  corroboration: 'SIMULATED' | 'VERIFIED';
}

/**
 * API response wrapper
 */
export interface AnalyticsResponse {
  success: boolean;
  data: AnalyticsPayload;
  meta: {
    version: string;
    source: AnalyticsMode;
  };
}
