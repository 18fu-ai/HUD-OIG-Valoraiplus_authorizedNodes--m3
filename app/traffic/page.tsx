'use client';

import { useState, useEffect } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, Globe, Users, Eye, TrendingUp, Clock, 
  Monitor, Smartphone, Tablet, MapPin, ArrowUpRight,
  RefreshCw, AlertTriangle, CheckCircle2, Settings,
  BarChart3, PieChart, LineChart, Zap
} from 'lucide-react';
import { getTrafficDataSync, type AnalyticsPayload, type AnalyticsMode } from '@/lib/analytics';

export default function TrafficDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [analyticsMode, setAnalyticsMode] = useState<AnalyticsMode>('SIMULATED');
  const [trafficData, setTrafficData] = useState<AnalyticsPayload | null>(null);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    const data = getTrafficDataSync();
    setTrafficData(data);
    setAnalyticsMode(data.mode);
    setLastRefresh(new Date().toLocaleTimeString());
  }, []);

  const handleRefresh = () => {
    const data = getTrafficDataSync();
    setTrafficData(data);
    setAnalyticsMode(data.mode);
    setLastRefresh(new Date().toLocaleTimeString());
  };

  // Calculate totals from typed payload
  const totalViews = trafficData?.summary.totalViews || 0;
  const totalUnique = trafficData?.summary.uniqueVisitors || 0;
  const avgBounce = trafficData?.summary.bounceRate || 0;
  const maxHourlyViews = Math.max(...(trafficData?.hourly.map(h => h.views) || [1]));
  const isLive = analyticsMode === 'VERCEL_API';

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-emerald-500 font-mono">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-pulse mx-auto mb-2" />
          <div className="text-sm">Loading Traffic Analytics...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 font-mono">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-4 border-b-2 border-emerald-500">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                TRAFFIC ANALYTICS DASHBOARD
              </h1>
              <p className="text-xs text-emerald-600 uppercase tracking-widest">
                ValorAiPlus Site Performance — Last 24 Hours
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className={`${isLive ? 'border-emerald-500 text-emerald-400' : 'border-amber-500 text-amber-400'}`}>
              {isLive ? (
                <>
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  LIVE DATA
                </>
              ) : (
                <>
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  SIMULATED DATA
                </>
              )}
            </Badge>
            <Badge variant="outline" className="border-slate-700 text-slate-400">
              Mode: {analyticsMode}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-emerald-700 text-emerald-400 hover:bg-emerald-950"
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        {/* API Configuration Notice */}
        {!isLive && (
          <Card className="border-amber-800 bg-amber-950/20 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-amber-400 mb-2">Enable Live Analytics</h3>
                  <p className="text-sm text-amber-300/80 mb-3">
                    Currently showing simulated data. To enable real-time analytics:
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                    <p className="text-xs text-emerald-500 mb-2 font-bold">1. Create Vercel API Token:</p>
                    <code className="text-xs text-emerald-400 block mb-3">
                      Vercel Dashboard → Settings → Tokens → Create
                    </code>
                    <p className="text-xs text-emerald-500 mb-2 font-bold">2. Add Environment Variable:</p>
                    <code className="text-xs text-emerald-400 block mb-3">
                      VERCEL_API_TOKEN=your_token_here
                    </code>
                    <p className="text-xs text-emerald-500 mb-2 font-bold">3. Add Project ID:</p>
                    <code className="text-xs text-emerald-400 block">
                      VERCEL_PROJECT_ID=prj_xlBjEDNuqRjiWfZcv2iZ6NBFFMJL
                    </code>
                  </div>
                  <p className="text-xs text-amber-300/60">
                    Once configured, this dashboard will display real-time traffic from Vercel Analytics API.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-emerald-800 bg-slate-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Eye className="w-5 h-5 text-emerald-500" />
                <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                  +12.4%
                </Badge>
              </div>
              <div className="text-2xl font-black text-white">{totalViews.toLocaleString()}</div>
              <div className="text-xs text-emerald-600">Total Page Views</div>
            </CardContent>
          </Card>

          <Card className="border-emerald-800 bg-slate-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-blue-500" />
                <Badge variant="outline" className="border-blue-700 text-blue-500 text-xs">
                  +8.7%
                </Badge>
              </div>
              <div className="text-2xl font-black text-white">{totalUnique.toLocaleString()}</div>
              <div className="text-xs text-emerald-600">Unique Visitors</div>
            </CardContent>
          </Card>

          <Card className="border-emerald-800 bg-slate-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-purple-500" />
                <Badge variant="outline" className="border-purple-700 text-purple-500 text-xs">
                  +15.2%
                </Badge>
              </div>
              <div className="text-2xl font-black text-white">3:24</div>
              <div className="text-xs text-emerald-600">Avg. Session Duration</div>
            </CardContent>
          </Card>

          <Card className="border-emerald-800 bg-slate-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                  -3.2%
                </Badge>
              </div>
              <div className="text-2xl font-black text-white">{avgBounce}%</div>
              <div className="text-xs text-emerald-600">Bounce Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Hourly Traffic Chart */}
        <Card className="border-emerald-800 bg-slate-900/50 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <LineChart className="w-5 h-5 text-emerald-400" />
              Hourly Traffic (24h)
            </CardTitle>
            <CardDescription className="text-emerald-600">
              Page views per hour — Last refresh: {lastRefresh}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-1 h-32">
              {(trafficData?.hourly || []).map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-emerald-500/80 rounded-t transition-all hover:bg-emerald-400"
                    style={{ height: `${(h.views / maxHourlyViews) * 100}%`, minHeight: '4px' }}
                    title={`${h.hour}: ${h.views} views`}
                  />
                  {i % 4 === 0 && (
                    <span className="text-[8px] text-emerald-700 mt-1">{h.hour.slice(0, 2)}</span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Top Pages */}
          <Card className="border-emerald-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Top Pages
              </CardTitle>
              <CardDescription className="text-emerald-600">
                Most visited routes in the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {[...(trafficData?.routes || [])].sort((a, b) => b.views - a.views).slice(0, 10).map((route, i) => (
                  <div key={route.route} className="flex items-center gap-3 p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition-colors">
                    <span className="text-xs text-emerald-600 w-6">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{route.route}</div>
                      <div className="text-xs text-emerald-700 truncate">
                        {route.corroboration === 'VERIFIED' ? <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-500" /> : null}
                        {route.corroboration}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{route.views.toLocaleString()}</div>
                      <div className="text-xs text-emerald-700">{route.uniqueVisitors} unique</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="border-emerald-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                Geographic Distribution
              </CardTitle>
              <CardDescription className="text-emerald-600">
                Visitor locations by country
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(trafficData?.geo || []).map((geo) => (
                  <div key={geo.country} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span className="text-white">{geo.country}</span>
                      </div>
                      <span className="text-emerald-400">{geo.visits.toLocaleString()} ({geo.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${geo.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Device Breakdown */}
          <Card className="border-emerald-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Monitor className="w-5 h-5 text-emerald-400" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(trafficData?.devices || []).map((device) => {
                  const Icon = device.device === 'Desktop' ? Monitor : device.device === 'Mobile' ? Smartphone : Tablet;
                  return (
                    <div key={device.device} className="flex items-center gap-4">
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white">{device.device}</span>
                          <span className="text-emerald-400 font-bold">{device.percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-emerald-700 mt-1">{device.sessions.toLocaleString()} sessions</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="border-emerald-800 bg-slate-900/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {(trafficData?.sources || []).map((ref) => (
                  <div key={ref.source} className="flex items-center gap-3 p-2 rounded bg-slate-800/50">
                    <div className="flex-1">
                      <div className="text-sm text-white">{ref.source}</div>
                      <div className="text-xs text-emerald-700">{ref.visits.toLocaleString()} visitors</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-emerald-400">{ref.percentage}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Route Performance Table */}
        <Card className="border-emerald-800 bg-slate-900/50 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-400" />
              Route Performance Details
            </CardTitle>
            <CardDescription className="text-emerald-600">
              Detailed metrics for all monitored routes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-800">
                    <th className="text-left py-2 px-3 text-emerald-500">Route</th>
                    <th className="text-right py-2 px-3 text-emerald-500">Views</th>
                    <th className="text-right py-2 px-3 text-emerald-500">Unique</th>
                    <th className="text-right py-2 px-3 text-emerald-500">Avg Time</th>
                    <th className="text-right py-2 px-3 text-emerald-500">Bounce</th>
                  </tr>
                </thead>
                <tbody>
                  {(trafficData?.routes || []).map((route) => {
                    const avgTimeFormatted = `${Math.floor(route.avgSessionSeconds / 60)}:${(route.avgSessionSeconds % 60).toString().padStart(2, '0')}`;
                    return (
                      <tr key={route.route} className="border-b border-emerald-900/30 hover:bg-slate-800/50">
                        <td className="py-2 px-3">
                          <div className="text-white">{route.route}</div>
                          <div className="text-xs text-emerald-700">
                            {route.corroboration === 'VERIFIED' ? <CheckCircle2 className="w-3 h-3 inline mr-1 text-emerald-500" /> : <AlertTriangle className="w-3 h-3 inline mr-1 text-amber-500" />}
                            {route.corroboration}
                          </div>
                        </td>
                        <td className="text-right py-2 px-3 text-emerald-400 font-mono">{route.views.toLocaleString()}</td>
                        <td className="text-right py-2 px-3 text-blue-400 font-mono">{route.uniqueVisitors.toLocaleString()}</td>
                        <td className="text-right py-2 px-3 text-purple-400 font-mono">{avgTimeFormatted}</td>
                        <td className="text-right py-2 px-3">
                          <Badge variant="outline" className={`${route.bounceRate > 50 ? 'border-red-700 text-red-400' : route.bounceRate > 30 ? 'border-amber-700 text-amber-400' : 'border-emerald-700 text-emerald-400'}`}>
                            {route.bounceRate}%
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-emerald-700 py-4 border-t border-emerald-900">
          <p>VALORAIPLUS TRAFFIC ANALYTICS | Mode: {analyticsMode} | Corroboration: {trafficData?.corroboration || 'PENDING'}</p>
          <p className="mt-1">MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777 | SAINT PAUL 55116</p>
        </div>
      </main>
    </div>
  );
}
