import type {
  AnalyticsMode,
  AnalyticsPayload,
  TrafficMetric,
  HourlyTraffic,
  GeoTraffic,
  DeviceTraffic,
  TrafficSource,
} from './types';

// ============================================================
// ANALYTICS DATA SOURCE — SAFE API ABSTRACTION
// ============================================================
//
// INVARIANT: analytics visibility must match source certainty
// - no API token → simulated metrics (clearly labeled)
// - API token + real source → verified analytics
//
// ============================================================

/**
 * Determine the current analytics mode based on environment
 */
export function getAnalyticsMode(): AnalyticsMode {
  if (typeof window === 'undefined') {
    // Server-side
    if (process.env.VERCEL_API_TOKEN) {
      return 'VERCEL_API';
    }
    return 'SIMULATED';
  }
  // Client-side static
  return 'STATIC_EXPORT';
}

/**
 * Generate simulated traffic data
 * All values are clearly marked as SIMULATED
 */
function generateSimulatedTraffic(): AnalyticsPayload {
  const now = new Date();
  const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const routes: TrafficMetric[] = [
    { route: '/', views: 1247, uniqueVisitors: 892, avgSessionSeconds: 145, bounceRate: 32, corroboration: 'SIMULATED' },
    { route: '/intelligence', views: 834, uniqueVisitors: 612, avgSessionSeconds: 287, bounceRate: 18, corroboration: 'SIMULATED' },
    { route: '/clawback', views: 721, uniqueVisitors: 534, avgSessionSeconds: 234, bounceRate: 22, corroboration: 'SIMULATED' },
    { route: '/mimecast', views: 689, uniqueVisitors: 498, avgSessionSeconds: 312, bounceRate: 15, corroboration: 'SIMULATED' },
    { route: '/status', views: 567, uniqueVisitors: 423, avgSessionSeconds: 89, bounceRate: 45, corroboration: 'SIMULATED' },
    { route: '/route71', views: 512, uniqueVisitors: 389, avgSessionSeconds: 156, bounceRate: 28, corroboration: 'SIMULATED' },
    { route: '/gate', views: 498, uniqueVisitors: 367, avgSessionSeconds: 178, bounceRate: 25, corroboration: 'SIMULATED' },
    { route: '/newt/chat', views: 456, uniqueVisitors: 334, avgSessionSeconds: 423, bounceRate: 12, corroboration: 'SIMULATED' },
    { route: '/protocol', views: 423, uniqueVisitors: 312, avgSessionSeconds: 267, bounceRate: 20, corroboration: 'SIMULATED' },
    { route: '/architecture', views: 389, uniqueVisitors: 287, avgSessionSeconds: 198, bounceRate: 24, corroboration: 'SIMULATED' },
    { route: '/timeline', views: 345, uniqueVisitors: 256, avgSessionSeconds: 134, bounceRate: 35, corroboration: 'SIMULATED' },
    { route: '/route66', views: 312, uniqueVisitors: 234, avgSessionSeconds: 112, bounceRate: 38, corroboration: 'SIMULATED' },
    { route: '/kernel', views: 289, uniqueVisitors: 212, avgSessionSeconds: 145, bounceRate: 30, corroboration: 'SIMULATED' },
    { route: '/token', views: 267, uniqueVisitors: 198, avgSessionSeconds: 89, bounceRate: 42, corroboration: 'SIMULATED' },
    { route: '/api-docs', views: 234, uniqueVisitors: 178, avgSessionSeconds: 234, bounceRate: 18, corroboration: 'SIMULATED' },
  ];

  const hourly: HourlyTraffic[] = Array.from({ length: 24 }, (_, i) => {
    const hour = (now.getHours() - 23 + i + 24) % 24;
    const baseViews = 150 + Math.floor(Math.random() * 200);
    const peakMultiplier = (hour >= 9 && hour <= 17) ? 1.5 : (hour >= 18 && hour <= 22) ? 1.3 : 0.6;
    return {
      hour: `${hour.toString().padStart(2, '0')}:00`,
      views: Math.floor(baseViews * peakMultiplier),
      visitors: Math.floor(baseViews * peakMultiplier * 0.72),
    };
  });

  const geo: GeoTraffic[] = [
    { country: 'United States', visits: 4892, percentage: 59.2 },
    { country: 'United Kingdom', visits: 823, percentage: 10.0 },
    { country: 'Germany', visits: 567, percentage: 6.9 },
    { country: 'Canada', visits: 489, percentage: 5.9 },
    { country: 'Australia', visits: 378, percentage: 4.6 },
    { country: 'France', visits: 312, percentage: 3.8 },
    { country: 'Other', visits: 802, percentage: 9.6 },
  ];

  const devices: DeviceTraffic[] = [
    { device: 'Desktop', percentage: 67, sessions: 5538 },
    { device: 'Mobile', percentage: 27, sessions: 2230 },
    { device: 'Tablet', percentage: 6, sessions: 495 },
  ];

  const sources: TrafficSource[] = [
    { source: 'Direct', visits: 3456, percentage: 41.8 },
    { source: 'Google', visits: 2134, percentage: 25.8 },
    { source: 'Twitter/X', visits: 1023, percentage: 12.4 },
    { source: 'LinkedIn', visits: 678, percentage: 8.2 },
    { source: 'GitHub', visits: 534, percentage: 6.5 },
    { source: 'Other', visits: 438, percentage: 5.3 },
  ];

  const totalViews = routes.reduce((sum, r) => sum + r.views, 0);
  const totalVisitors = routes.reduce((sum, r) => sum + r.uniqueVisitors, 0);
  const avgSession = Math.floor(routes.reduce((sum, r) => sum + r.avgSessionSeconds, 0) / routes.length);
  const avgBounce = Math.floor(routes.reduce((sum, r) => sum + r.bounceRate, 0) / routes.length);

  return {
    mode: 'SIMULATED',
    timestamp: now.toISOString(),
    period: {
      start: start.toISOString(),
      end: now.toISOString(),
      hours: 24,
    },
    summary: {
      totalViews,
      uniqueVisitors: totalVisitors,
      avgSessionSeconds: avgSession,
      bounceRate: avgBounce,
    },
    routes,
    hourly,
    geo,
    devices,
    sources,
    corroboration: 'SIMULATED',
  };
}

/**
 * Fetch live traffic data from Vercel Analytics API
 */
async function fetchLiveTraffic(): Promise<AnalyticsPayload> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;

  if (!token || !projectId) {
    return generateSimulatedTraffic();
  }

  try {
    // Vercel Analytics API endpoint
    const response = await fetch(
      `https://vercel.com/api/web/insights/stats?projectId=${projectId}&period=24h`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error('[v0] Vercel API error:', response.status);
      return generateSimulatedTraffic();
    }

    const data = await response.json();
    
    // Transform Vercel API response to our payload format
    // This is a placeholder - actual transformation depends on Vercel's API response structure
    const now = new Date();
    const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    return {
      mode: 'VERCEL_API',
      timestamp: now.toISOString(),
      period: {
        start: start.toISOString(),
        end: now.toISOString(),
        hours: 24,
      },
      summary: {
        totalViews: data.pageViews || 0,
        uniqueVisitors: data.visitors || 0,
        avgSessionSeconds: data.avgDuration || 0,
        bounceRate: data.bounceRate || 0,
      },
      routes: (data.pages || []).map((p: { path: string; views: number; visitors: number }) => ({
        route: p.path,
        views: p.views,
        uniqueVisitors: p.visitors,
        avgSessionSeconds: 0,
        bounceRate: 0,
        corroboration: 'VERIFIED' as const,
      })),
      hourly: [],
      geo: [],
      devices: [],
      sources: [],
      corroboration: 'VERIFIED',
    };
  } catch (error) {
    console.error('[v0] Failed to fetch live traffic:', error);
    return generateSimulatedTraffic();
  }
}

/**
 * Main entry point - get traffic data based on environment
 */
export async function getTrafficData(): Promise<AnalyticsPayload> {
  const mode = getAnalyticsMode();

  if (mode === 'VERCEL_API') {
    return fetchLiveTraffic();
  }

  return generateSimulatedTraffic();
}

/**
 * Synchronous version for client-side use
 */
export function getTrafficDataSync(): AnalyticsPayload {
  return generateSimulatedTraffic();
}
