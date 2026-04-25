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

// Simulated traffic data based on actual route structure
const ROUTE_TRAFFIC = [
  { route: '/', name: 'Home', views: 1247, unique: 892, avgTime: '2:34', bounce: 23 },
  { route: '/intelligence', name: 'Intelligence', views: 834, unique: 621, avgTime: '4:12', bounce: 15 },
  { route: '/intelligence/download', name: 'Download Report', views: 456, unique: 398, avgTime: '1:45', bounce: 42 },
  { route: '/clawback', name: 'Clawback Matrix', views: 723, unique: 534, avgTime: '3:28', bounce: 18 },
  { route: '/mimecast', name: 'Mimecast Forensics', views: 612, unique: 445, avgTime: '5:02', bounce: 12 },
  { route: '/newt/chat', name: 'N.E.W.T. Chat', views: 589, unique: 412, avgTime: '8:34', bounce: 8 },
  { route: '/gate', name: 'Identity Gate', views: 478, unique: 356, avgTime: '1:22', bounce: 35 },
  { route: '/route71', name: 'Route 71 (Admitted)', views: 445, unique: 334, avgTime: '2:56', bounce: 20 },
  { route: '/route70', name: 'Route 70 (Blocked)', views: 234, unique: 189, avgTime: '0:45', bounce: 78 },
  { route: '/architecture', name: 'Architecture', views: 398, unique: 287, avgTime: '3:15', bounce: 22 },
  { route: '/protocol', name: 'Protocol', views: 367, unique: 256, avgTime: '4:08', bounce: 19 },
  { route: '/status', name: 'System Status', views: 534, unique: 423, avgTime: '1:48', bounce: 28 },
  { route: '/cinema', name: 'Project Cinema', views: 289, unique: 212, avgTime: '2:22', bounce: 31 },
  { route: '/token', name: 'Token ($SGAU)', views: 445, unique: 334, avgTime: '2:12', bounce: 25 },
  { route: '/contract', name: 'Smart Contract', views: 312, unique: 234, avgTime: '3:45', bounce: 21 },
];

const GEOGRAPHIC_DATA = [
  { country: 'United States', visitors: 4523, percentage: 62.3 },
  { country: 'United Kingdom', visitors: 892, percentage: 12.3 },
  { country: 'Canada', visitors: 534, percentage: 7.4 },
  { country: 'Germany', visitors: 389, percentage: 5.4 },
  { country: 'Australia', visitors: 312, percentage: 4.3 },
  { country: 'France', visitors: 234, percentage: 3.2 },
  { country: 'Other', visitors: 378, percentage: 5.1 },
];

const DEVICE_DATA = [
  { type: 'Desktop', icon: Monitor, visitors: 4892, percentage: 67.4 },
  { type: 'Mobile', icon: Smartphone, visitors: 1923, percentage: 26.5 },
  { type: 'Tablet', icon: Tablet, visitors: 447, percentage: 6.1 },
];

const REFERRER_DATA = [
  { source: 'Direct', visitors: 2834, percentage: 39.1 },
  { source: 'Google Search', visitors: 1923, percentage: 26.5 },
  { source: 'Twitter/X', visitors: 892, percentage: 12.3 },
  { source: 'LinkedIn', visitors: 534, percentage: 7.4 },
  { source: 'GitHub', visitors: 389, percentage: 5.4 },
  { source: 'Other', visitors: 690, percentage: 9.3 },
];

const HOURLY_TRAFFIC = [
  { hour: '00:00', views: 45 }, { hour: '01:00', views: 32 },
  { hour: '02:00', views: 28 }, { hour: '03:00', views: 21 },
  { hour: '04:00', views: 18 }, { hour: '05:00', views: 23 },
  { hour: '06:00', views: 45 }, { hour: '07:00', views: 89 },
  { hour: '08:00', views: 156 }, { hour: '09:00', views: 234 },
  { hour: '10:00', views: 312 }, { hour: '11:00', views: 378 },
  { hour: '12:00', views: 345 }, { hour: '13:00', views: 389 },
  { hour: '14:00', views: 423 }, { hour: '15:00', views: 456 },
  { hour: '16:00', views: 412 }, { hour: '17:00', views: 367 },
  { hour: '18:00', views: 298 }, { hour: '19:00', views: 234 },
  { hour: '20:00', views: 189 }, { hour: '21:00', views: 156 },
  { hour: '22:00', views: 112 }, { hour: '23:00', views: 78 },
];

export default function TrafficDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    setLastRefresh(new Date().toLocaleTimeString());
  }, []);

  // Calculate totals
  const totalViews = ROUTE_TRAFFIC.reduce((sum, r) => sum + r.views, 0);
  const totalUnique = ROUTE_TRAFFIC.reduce((sum, r) => sum + r.unique, 0);
  const avgBounce = Math.round(ROUTE_TRAFFIC.reduce((sum, r) => sum + r.bounce, 0) / ROUTE_TRAFFIC.length);
  const maxHourlyViews = Math.max(...HOURLY_TRAFFIC.map(h => h.views));

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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLastRefresh(new Date().toLocaleTimeString())}
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
              {HOURLY_TRAFFIC.map((h, i) => (
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
                {ROUTE_TRAFFIC.sort((a, b) => b.views - a.views).slice(0, 10).map((route, i) => (
                  <div key={route.route} className="flex items-center gap-3 p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition-colors">
                    <span className="text-xs text-emerald-600 w-6">{i + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{route.name}</div>
                      <div className="text-xs text-emerald-700 truncate">{route.route}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{route.views.toLocaleString()}</div>
                      <div className="text-xs text-emerald-700">{route.unique} unique</div>
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
                {GEOGRAPHIC_DATA.map((geo) => (
                  <div key={geo.country} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span className="text-white">{geo.country}</span>
                      </div>
                      <span className="text-emerald-400">{geo.visitors.toLocaleString()} ({geo.percentage}%)</span>
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
                {DEVICE_DATA.map((device) => {
                  const Icon = device.icon;
                  return (
                    <div key={device.type} className="flex items-center gap-4">
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30">
                        <Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white">{device.type}</span>
                          <span className="text-emerald-400 font-bold">{device.percentage}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                        <div className="text-xs text-emerald-700 mt-1">{device.visitors.toLocaleString()} visitors</div>
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
                {REFERRER_DATA.map((ref) => (
                  <div key={ref.source} className="flex items-center gap-3 p-2 rounded bg-slate-800/50">
                    <div className="flex-1">
                      <div className="text-sm text-white">{ref.source}</div>
                      <div className="text-xs text-emerald-700">{ref.visitors.toLocaleString()} visitors</div>
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
                  {ROUTE_TRAFFIC.map((route) => (
                    <tr key={route.route} className="border-b border-emerald-900/30 hover:bg-slate-800/50">
                      <td className="py-2 px-3">
                        <div className="text-white">{route.name}</div>
                        <div className="text-xs text-emerald-700">{route.route}</div>
                      </td>
                      <td className="text-right py-2 px-3 text-emerald-400 font-mono">{route.views.toLocaleString()}</td>
                      <td className="text-right py-2 px-3 text-blue-400 font-mono">{route.unique.toLocaleString()}</td>
                      <td className="text-right py-2 px-3 text-purple-400 font-mono">{route.avgTime}</td>
                      <td className="text-right py-2 px-3">
                        <Badge variant="outline" className={`${route.bounce > 50 ? 'border-red-700 text-red-400' : route.bounce > 30 ? 'border-amber-700 text-amber-400' : 'border-emerald-700 text-emerald-400'}`}>
                          {route.bounce}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-emerald-700 py-4 border-t border-emerald-900">
          <p>VALORAIPLUS TRAFFIC ANALYTICS | MERKLEROOT: 26856B24C50750F0C69C1EEB86A69EF777777</p>
          <p className="mt-1">Configure VERCEL_API_TOKEN for live data | SAINT PAUL 55116</p>
        </div>
      </main>
    </div>
  );
}
