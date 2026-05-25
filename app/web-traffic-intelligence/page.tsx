'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trafficLogger } from '@/lib/traffic-logger';
import {
  Globe,
  Users,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  BarChart3,
  Clock,
  MapPin,
  TrendingUp,
} from 'lucide-react';

interface TrafficSummary {
  total_page_views: number;
  unique_visitors: number;
  page_views: any[];
  by_path: Record<string, number>;
  by_device: Record<string, number>;
  by_browser: Record<string, number>;
  by_country: Record<string, number>;
  period_hours: number;
}

export default function WebTrafficIntelligence() {
  const [traffic24h, setTraffic24h] = useState<TrafficSummary | null>(null);
  const [traffic7d, setTraffic7d] = useState<TrafficSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    const fetchTraffic = async () => {
      setLoading(true);
      const [traffic24, traffic168] = await Promise.all([
        trafficLogger.getTrafficSummary(24),
        trafficLogger.getTrafficSummary(168),
      ]);
      
      setTraffic24h(traffic24);
      setTraffic7d(traffic168);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    };

    fetchTraffic();
    const interval = setInterval(fetchTraffic, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-secondary rounded-lg"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 bg-secondary rounded-lg"></div>
            <div className="h-24 bg-secondary rounded-lg"></div>
            <div className="h-24 bg-secondary rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="font-mono text-2xl font-bold text-foreground">Web Traffic Intelligence</h1>
        <p className="font-mono text-xs text-muted-foreground">
          Real-time visitor analytics — Last updated: {lastUpdated}
        </p>
      </div>

      {/* 24-Hour Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-primary/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">UNIQUE VISITORS (24h)</p>
                <p className="font-mono text-3xl font-bold text-primary">
                  {traffic24h?.unique_visitors || 0}
                </p>
              </div>
              <Users className="w-8 h-8 text-primary/40" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">PAGE VIEWS (24h)</p>
                <p className="font-mono text-3xl font-bold text-emerald-500">
                  {traffic24h?.total_page_views || 0}
                </p>
              </div>
              <Eye className="w-8 h-8 text-emerald-500/40" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground mb-1">AVG PAGE VIEWS PER VISITOR</p>
                <p className="font-mono text-3xl font-bold text-cyan-500">
                  {traffic24h && traffic24h.unique_visitors > 0
                    ? (traffic24h.total_page_views / traffic24h.unique_visitors).toFixed(1)
                    : 0}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-cyan-500/40" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Monitor className="w-4 h-4" />
            DEVICE BREAKDOWN (24h)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(traffic24h?.by_device || {}).length > 0 ? (
            Object.entries(traffic24h?.by_device || {}).map(([device, count]) => (
              <div key={device} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {device === 'desktop' && <Monitor className="w-4 h-4 text-amber-500" />}
                  {device === 'mobile' && <Smartphone className="w-4 h-4 text-blue-500" />}
                  {device === 'tablet' && <Tablet className="w-4 h-4 text-violet-500" />}
                  <span className="font-mono text-sm text-foreground capitalize">{device}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        device === 'desktop' ? 'bg-amber-500' : device === 'mobile' ? 'bg-blue-500' : 'bg-violet-500'
                      }`}
                      style={{
                        width: `${
                          ((count as number) / Math.max(...Object.values(traffic24h?.by_device || {})) as any) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground w-12 text-right">{count}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="font-mono text-xs text-muted-foreground">No device data available</p>
          )}
        </CardContent>
      </Card>

      {/* Top Pages */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            TOP PAGES (24h)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(traffic24h?.by_path || {})
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .slice(0, 10)
              .map(([path, count]) => (
                <div key={path} className="flex items-center justify-between p-2 rounded border border-border/50 hover:bg-secondary/30 transition-colors">
                  <span className="font-mono text-xs text-foreground truncate flex-1">{path}</span>
                  <span className="font-mono text-xs font-bold text-primary ml-2">{count}</span>
                </div>
              ))}
            {Object.entries(traffic24h?.by_path || {}).length === 0 && (
              <p className="font-mono text-xs text-muted-foreground">No page view data available</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Browser & OS Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm">BROWSERS (24h)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(traffic24h?.by_browser || {})
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .map(([browser, count]) => (
                <div key={browser} className="flex justify-between items-center p-2 rounded border border-border/50 text-xs">
                  <span className="font-mono text-foreground capitalize">{browser}</span>
                  <span className="font-mono font-bold text-primary">{count}</span>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm">LOCATIONS (24h)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(traffic24h?.by_country || {})
              .sort(([, a], [, b]) => (b as number) - (a as number))
              .slice(0, 8)
              .map(([country, count]) => (
                <div key={country} className="flex justify-between items-center p-2 rounded border border-border/50 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-cyan-500" />
                    <span className="font-mono text-foreground">{country}</span>
                  </div>
                  <span className="font-mono font-bold text-primary">{count}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* 7-Day Trend */}
      <Card className="bg-secondary/30 border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            7-DAY SUMMARY
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-mono text-xs text-muted-foreground">Total Page Views</p>
              <p className="font-mono font-bold text-foreground">{traffic7d?.total_page_views || 0}</p>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">Unique Visitors</p>
              <p className="font-mono font-bold text-foreground">{traffic7d?.unique_visitors || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="pt-4 border-t border-border">
        <p className="font-mono text-[10px] text-muted-foreground">
          Traffic intelligence powered by real-time page view tracking. Data refreshes every 60 seconds. Visitor IP addresses are captured for geographic analysis and user flow understanding. This system tracks: device type, browser, operating system, page paths, referrers, response times, and HTTP status codes.
        </p>
      </div>
    </div>
  );
}
