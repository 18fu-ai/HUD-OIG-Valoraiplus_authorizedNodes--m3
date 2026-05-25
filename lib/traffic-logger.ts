// lib/traffic-logger.ts
// Real-time traffic logging system for visitor intelligence

import { createClient } from '@supabase/supabase-js';

interface TrafficEvent {
  ip_address: string;
  user_agent: string;
  path: string;
  method: string;
  referer?: string;
  country?: string;
  city?: string;
  device_type: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser?: string;
  os?: string;
  timestamp: string;
  response_time_ms: number;
  status_code: number;
}

interface SessionData {
  session_id: string;
  ip_address: string;
  first_page: string;
  last_page: string;
  pages_visited: number;
  session_duration_seconds: number;
  entry_time: string;
  exit_time: string;
  user_agent: string;
  country?: string;
  device_type: 'desktop' | 'mobile' | 'tablet';
}

class TrafficLogger {
  private supabase: any;
  private initialized: boolean = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('[TrafficLogger] Supabase credentials not configured');
        return;
      }

      this.supabase = createClient(supabaseUrl, supabaseAnonKey);
      this.initialized = true;
    } catch (error) {
      console.error('[TrafficLogger] Initialization failed:', error);
    }
  }

  parseUserAgent(userAgent: string): { device_type: 'desktop' | 'mobile' | 'tablet' | 'unknown'; browser?: string; os?: string } {
    const isMobile = /Mobile|Android|iPhone|iPad|iPod/.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/.test(userAgent);
    
    let browser = 'unknown';
    let os = 'unknown';

    if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    if (userAgent.includes('Windows')) os = 'Windows';
    else if (userAgent.includes('Mac')) os = 'macOS';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) os = 'iOS';
    else if (userAgent.includes('Android')) os = 'Android';

    return {
      device_type: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop',
      browser,
      os,
    };
  }

  async logPageView(data: {
    ip: string;
    userAgent: string;
    path: string;
    method: string;
    referer?: string;
    statusCode: number;
    responseTime: number;
  }) {
    if (!this.initialized) await this.initialize();
    if (!this.initialized) return;

    try {
      const { device_type, browser, os } = this.parseUserAgent(data.userAgent);
      
      const event: TrafficEvent = {
        ip_address: data.ip,
        user_agent: data.userAgent,
        path: data.path,
        method: data.method,
        referer: data.referer,
        device_type,
        browser,
        os,
        timestamp: new Date().toISOString(),
        response_time_ms: data.responseTime,
        status_code: data.statusCode,
      };

      const { error } = await this.supabase
        .from('page_views')
        .insert([event]);

      if (error) {
        console.error('[TrafficLogger] Insert failed:', error);
      }
    } catch (error) {
      console.error('[TrafficLogger] Log page view failed:', error);
    }
  }

  async getTrafficSummary(hours: number = 24) {
    if (!this.initialized) await this.initialize();
    if (!this.initialized) return null;

    try {
      const since = new Date(Date.now() - hours * 3600 * 1000).toISOString();

      const { data, error } = await this.supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', since)
        .order('timestamp', { ascending: false });

      if (error) throw error;

      // Aggregate statistics
      const uniqueIPs = new Set(data?.map((d: any) => d.ip_address) || []);
      const byPath: Record<string, number> = {};
      const byDevice: Record<string, number> = {};
      const byBrowser: Record<string, number> = {};
      const byCountry: Record<string, number> = {};

      data?.forEach((event: TrafficEvent) => {
        byPath[event.path] = (byPath[event.path] || 0) + 1;
        byDevice[event.device_type] = (byDevice[event.device_type] || 0) + 1;
        if (event.browser) byBrowser[event.browser] = (byBrowser[event.browser] || 0) + 1;
        if (event.country) byCountry[event.country] = (byCountry[event.country] || 0) + 1;
      });

      return {
        total_page_views: data?.length || 0,
        unique_visitors: uniqueIPs.size,
        page_views: data || [],
        by_path: byPath,
        by_device: byDevice,
        by_browser: byBrowser,
        by_country: byCountry,
        period_hours: hours,
      };
    } catch (error) {
      console.error('[TrafficLogger] Get summary failed:', error);
      return null;
    }
  }
}

export const trafficLogger = new TrafficLogger();
