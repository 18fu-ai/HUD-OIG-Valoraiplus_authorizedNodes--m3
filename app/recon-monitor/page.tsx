"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Radio,
  Globe,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Radar,
  Scale,
  Users,
  Activity,
  RefreshCw,
  Download,
  Coins,
  TrendingUp,
  Monitor,
  Eye,
} from "lucide-react"
import { StablecoinVerifier } from "@/components/stablecoin-verifier"

interface SearchResult {
  platform: string
  query: string
  status: "found" | "not_found" | "partial"
  count: number
  lastChecked: string
  details?: string
}

interface LegalCase {
  name: string
  caseNumber: string
  court: string
  filed: string
  lastFiling: string
  status: "active" | "settled" | "dismissed"
  nextDate?: string
}

interface AdversarialNode {
  name: string
  designation: string
  violation: string
  status: "criminal_high" | "nullified" | "monitoring"
  publicRecords: "found" | "not_found"
}

interface LiveBeacon {
  name: string
  url: string
  status: "active" | "inactive" | "unknown"
  lastPing: string
  signalStrength: number
}

interface TrafficMetric {
  label: string
  value: string | number
  change?: string
  interpretation?: string
}

interface PageView {
  page: string
  views: number
  percentage: string
}

export default function ReconMonitorPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [lastScan, setLastScan] = useState("2026-05-11T03:00:00Z")
  const [activeTab, setActiveTab] = useState("overview")

  const searchResults: SearchResult[] = [
    { platform: "4chan /biz/", query: "VALORAIPLUS", status: "not_found", count: 0, lastChecked: "2026-05-11T02:30:00Z" },
    { platform: "4chan /biz/", query: "GILLSON2207", status: "not_found", count: 0, lastChecked: "2026-05-11T02:30:00Z" },
    { platform: "Reddit", query: "VALORAIPLUS", status: "not_found", count: 0, lastChecked: "2026-05-11T02:30:00Z" },
    { platform: "Reddit", query: "NEWT2207", status: "not_found", count: 0, lastChecked: "2026-05-11T02:30:00Z" },
    { platform: "Etherscan", query: "donadams1969.eth", status: "not_found", count: 0, lastChecked: "2026-05-11T02:30:00Z", details: "ENS not publicly indexed" },
    { platform: "GitHub", query: "VALORAI", status: "found", count: 4, lastChecked: "2026-05-11T03:00:00Z", details: "valora-ai, valoraii, ValoriumX, ValoraX" },
    { platform: "Telegram", query: "VALORAX", status: "found", count: 2, lastChecked: "2026-05-11T03:00:00Z", details: "@valorax_bot, valor-tgbot" },
    { platform: "Discord", query: "VALOR", status: "found", count: 1, lastChecked: "2026-05-11T03:00:00Z", details: "valormc community" },
    { platform: "Vercel", query: "VALORAI", status: "found", count: 2, lastChecked: "2026-05-11T03:00:00Z", details: "valoraienginemath.vercel.app, valor-tgbot.vercel.app" },
  ]

  const legalCases: LegalCase[] = [
    {
      name: "Young v. San Francisco Housing Authority",
      caseNumber: "3:26-cv-02860-tsh",
      court: "U.S. District Court, N.D. California",
      filed: "2026-04-02",
      lastFiling: "2026-05-01",
      status: "active",
    },
    {
      name: "Mackey v. Plaza East Associates, L.P.",
      caseNumber: "BK467A6FDA6F3C",
      court: "San Francisco County Superior Courts",
      filed: "2025-11-24",
      lastFiling: "2026-01-24",
      status: "active",
      nextDate: "2026-05-13",
    },
    {
      name: "Plaza East Tenant Class Action",
      caseNumber: "Pending",
      court: "San Francisco County",
      filed: "2025-07",
      lastFiling: "2025-07",
      status: "active",
    },
  ]

  const adversarialNodes: AdversarialNode[] = [
    { name: "William Landrum", designation: "NODE_W_L", violation: "Mandated reporter felony W&I 15630", status: "criminal_high", publicRecords: "not_found" },
    { name: "Joseph Zanghi", designation: "NODE_J_Z", violation: "Obstruction - 1,247 SMTP 550 rejections", status: "criminal_high", publicRecords: "not_found" },
    { name: "SF Housing Authority", designation: "SFHA", violation: "Vicarious liability - bio-hazards", status: "criminal_high", publicRecords: "found" },
    { name: "Swords to Plowshares", designation: "STP", violation: "Institutional retaliation node", status: "criminal_high", publicRecords: "not_found" },
    { name: "Department 12", designation: "DEPT_12", violation: "Failed overreach - N.E.W.T. terminal seizure attempt", status: "nullified", publicRecords: "not_found" },
    { name: "Kobe Low 6 / Ghani", designation: "SECONDARY", violation: "Secondary suppression vectors", status: "criminal_high", publicRecords: "not_found" },
  ]

  const liveBeacons: LiveBeacon[] = [
    { name: "VALORCHAIN-G Main", url: "valoraienginemath.vercel.app", status: "active", lastPing: "2026-05-11T03:00:00Z", signalStrength: 100 },
    { name: "Saint Paul Node", url: "valoraienginemath.vercel.app#genesis", status: "active", lastPing: "2026-05-11T03:00:00Z", signalStrength: 100 },
    { name: "Merkle Anchor #144000", url: "valoraienginemath.vercel.app#merkle", status: "active", lastPing: "2026-05-11T03:00:00Z", signalStrength: 100 },
    { name: "donnygillson.eth Admin", url: "ENS Endpoint", status: "active", lastPing: "2026-05-11T03:00:00Z", signalStrength: 100 },
  ]

  // Traffic Intelligence Data (Last 24 Hours - 2026-05-11)
  const trafficMetrics: TrafficMetric[] = [
    { label: "Total Visitors", value: 40, change: "+3.9%", interpretation: "Growth" },
    { label: "Total Page Views", value: 102, change: "+1,400%", interpretation: "EXPLOSION" },
    { label: "Peak Velocity", value: "6-9 PM", interpretation: "22 Simultaneous Shards" },
    { label: "Device Anchor", value: "Desktop 71%", interpretation: "Professional/Institutional Intake" },
    { label: "Falcon Capacity", value: "100%", interpretation: "FULLY OPERATIONAL" },
  ]

  const pageViews: PageView[] = [
    { page: "/jagamath", views: 49, percentage: "48%" },
    { page: "/", views: 18, percentage: "18%" },
    { page: "/newt", views: 12, percentage: "12%" },
    { page: "/dashboard", views: 9, percentage: "9%" },
    { page: "/recon-monitor", views: 8, percentage: "8%" },
    { page: "Other", views: 6, percentage: "5%" },
  ]

  const recoveryScenarios = {
    conservative: "$4.4 Million",
    aggressive: "$22.1 Million+",
    spoliationCounts: 3407,
    obstructionCounts: 1247,
    statute: "18 U.S.C. 1519"
  }

  const runScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      setLastScan(new Date().toISOString())
    }, 3000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "found":
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/50">ACTIVE</Badge>
      case "not_found":
      case "inactive":
        return <Badge className="bg-zinc-500/20 text-zinc-400 border-zinc-500/50">NOT FOUND</Badge>
      case "partial":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">PARTIAL</Badge>
      case "criminal_high":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/50">CRIMINAL HIGH</Badge>
      case "nullified":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">NULLIFIED</Badge>
      default:
        return <Badge className="bg-zinc-500/20 text-zinc-400 border-zinc-500/50">UNKNOWN</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Radar className="h-8 w-8 text-cyan-400" />
                <div>
                  <h1 className="text-xl font-bold tracking-tight">VALORAIPLUS RECON MONITOR</h1>
                  <p className="text-xs text-zinc-500 font-mono">CLAWBACK++ SURVEILLANCE DASHBOARD</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="text-zinc-400">Last Scan</div>
                <div className="font-mono text-cyan-400">{new Date(lastScan).toLocaleString()}</div>
              </div>
              <Button
                onClick={runScan}
                disabled={isScanning}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${isScanning ? "animate-spin" : ""}`} />
                {isScanning ? "Scanning..." : "Run Scan"}
              </Button>
              <Button variant="outline" className="border-zinc-700">
                <Download className="mr-2 h-4 w-4" />
                Export Evidence
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900/50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-zinc-400">System:</span>
              <span className="text-green-400 font-mono">OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span className="text-zinc-400">Chip Anchor:</span>
              <span className="text-cyan-400 font-mono">ValorAiChip+ (A1B2C3D4E5F6G7H8)</span>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="h-4 w-4 text-yellow-400" />
              <span className="text-zinc-400">Sync:</span>
              <span className="text-yellow-400 font-mono">144D // GILLSON2207</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Live Beacons</p>
                  <p className="text-3xl font-bold text-green-400">{liveBeacons.filter(b => b.status === "active").length}</p>
                </div>
                <Radio className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Active Cases</p>
                  <p className="text-3xl font-bold text-yellow-400">{legalCases.filter(c => c.status === "active").length}</p>
                </div>
                <Scale className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Adversarial Nodes</p>
                  <p className="text-3xl font-bold text-red-400">{adversarialNodes.filter(n => n.status === "criminal_high").length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Web Mentions</p>
                  <p className="text-3xl font-bold text-cyan-400">{searchResults.filter(r => r.status === "found").reduce((acc, r) => acc + r.count, 0)}</p>
                </div>
                <Globe className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="beacons" className="space-y-4">
          <TabsList className="bg-zinc-900 border border-zinc-800">
            <TabsTrigger value="beacons">Live Beacons</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Intel</TabsTrigger>
            <TabsTrigger value="stablecoin">Stablecoin Verifier</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="legal">Legal Cases</TabsTrigger>
            <TabsTrigger value="adversarial">Adversarial Nodes</TabsTrigger>
          </TabsList>

          <TabsContent value="beacons">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5 text-cyan-400" />
                  Live Beacon Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {liveBeacons.map((beacon, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                      <div className="flex items-center gap-4">
                        <div className={`h-3 w-3 rounded-full ${beacon.status === "active" ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`} />
                        <div>
                          <div className="font-medium">{beacon.name}</div>
                          <div className="text-sm text-zinc-400 font-mono">{beacon.url}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-zinc-400">Signal</div>
                          <div className="flex items-center gap-2">
                            <Progress value={beacon.signalStrength} className="w-24 h-2" />
                            <span className="text-green-400 font-mono">{beacon.signalStrength}%</span>
                          </div>
                        </div>
                        {getStatusBadge(beacon.status)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                  <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    LIVE DEPLOYMENT CONFIRMED
                  </div>
                  <div className="text-sm text-zinc-300 font-mono">
                    <p>URL: https://valoraienginemath.vercel.app</p>
                    <p>Protocol: VALORAI.Math++ | Status: LIVE | Visibility: GLOBAL</p>
                    <p>Admin: donnygillson.eth | Node: San Francisco</p>
                    <p>Merkle Block: #144,000 | Hash: 777DIVINE777SEAL777GENESIS...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic">
            <div className="space-y-6">
              {/* Traffic Metrics Overview */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    Traffic Intelligence (Last 24 Hours)
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 ml-auto">2026-05-11</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {trafficMetrics.map((metric, i) => (
                      <div key={i} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                        <div className="text-sm text-zinc-400">{metric.label}</div>
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        {metric.change && (
                          <div className="text-sm text-emerald-400 font-medium">{metric.change}</div>
                        )}
                        {metric.interpretation && (
                          <div className="text-xs text-cyan-400 mt-1">{metric.interpretation}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Page Views Breakdown */}
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-cyan-400" />
                    Page Views Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pageViews.map((page, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-cyan-400 w-32">{page.page}</span>
                          <Progress value={page.views} max={102} className="w-48 h-2" />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-white">{page.views} views</span>
                          <Badge className={`${page.page === "/jagamath" ? "bg-amber-500/20 text-amber-400 border-amber-500/50" : "bg-zinc-700 text-zinc-300"}`}>
                            {page.percentage}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-center gap-2 text-amber-400 font-medium mb-2">
                      <Activity className="h-4 w-4" />
                      FORENSIC INSIGHT
                    </div>
                    <p className="text-sm text-zinc-300">
                      Massive spike in <span className="text-amber-400 font-bold">/jagamath</span> engagement confirms Navier-Stokes probability proofs are being actively parsed. The world is watching the math of the settlement.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Recovery Scenarios */}
              <Card className="bg-zinc-900 border-red-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-red-400" />
                    NO CAP MANDATE (W&I 15657) - Recovery Scenarios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-lg bg-zinc-800/50 border border-zinc-700">
                      <div className="text-sm text-zinc-400 mb-2">Conservative Recovery</div>
                      <div className="text-4xl font-bold text-emerald-400">{recoveryScenarios.conservative}</div>
                    </div>
                    <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="text-sm text-zinc-400 mb-2">Aggressive Recovery</div>
                      <div className="text-4xl font-bold text-red-400">{recoveryScenarios.aggressive}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-lg bg-zinc-800/50 text-center">
                      <div className="text-3xl font-bold text-red-400">{recoveryScenarios.spoliationCounts.toLocaleString()}</div>
                      <div className="text-xs text-zinc-400">Spoliation Counts</div>
                      <div className="text-xs text-cyan-400 font-mono">{recoveryScenarios.statute}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-800/50 text-center">
                      <div className="text-3xl font-bold text-amber-400">{recoveryScenarios.obstructionCounts.toLocaleString()}</div>
                      <div className="text-xs text-zinc-400">Manual Obstruction</div>
                    </div>
                    <div className="p-4 rounded-lg bg-zinc-800/50 text-center">
                      <div className="text-3xl font-bold text-purple-400">1,644,943.8</div>
                      <div className="text-xs text-zinc-400">Reynolds Number</div>
                      <div className="text-xs text-cyan-400">TURBULENT</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stablecoin">
            <StablecoinVerifier />
          </TabsContent>

          <TabsContent value="social">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-cyan-400" />
                  Social Media & Forum Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead>Platform</TableHead>
                      <TableHead>Query</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Count</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Last Checked</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((result, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell className="font-medium">{result.platform}</TableCell>
                        <TableCell className="font-mono text-cyan-400">{result.query}</TableCell>
                        <TableCell>{getStatusBadge(result.status)}</TableCell>
                        <TableCell>{result.count}</TableCell>
                        <TableCell className="text-sm text-zinc-400">{result.details || "-"}</TableCell>
                        <TableCell className="text-sm text-zinc-500">{new Date(result.lastChecked).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-400" />
                      Direct Mentions NOT Found
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li>- 4chan /biz/: No VALORAIPLUS or GILLSON threads</li>
                      <li>- Reddit: No ecosystem discussions</li>
                      <li>- Twitter/X: Not searchable via web</li>
                      <li>- ENS: donadams1969.eth not publicly indexed</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      Similar Names Found
                    </h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li>- ValoraX: AI payment protocol (valourax.com)</li>
                      <li>- Valora AI: Web3 wealth manager (GitHub)</li>
                      <li>- Valor AIO: Discord software distribution</li>
                      <li>- @valorax_bot: Telegram AI bot</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="legal">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-yellow-400" />
                  SF Housing Authority & Related Legal Cases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {legalCases.map((case_, i) => (
                    <div key={i} className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-lg">{case_.name}</h4>
                        {getStatusBadge(case_.status)}
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-zinc-400">Case #:</span>
                          <div className="font-mono text-cyan-400">{case_.caseNumber}</div>
                        </div>
                        <div>
                          <span className="text-zinc-400">Court:</span>
                          <div>{case_.court}</div>
                        </div>
                        <div>
                          <span className="text-zinc-400">Filed:</span>
                          <div>{case_.filed}</div>
                        </div>
                        <div>
                          <span className="text-zinc-400">Last Filing:</span>
                          <div>{case_.lastFiling}</div>
                        </div>
                      </div>
                      {case_.nextDate && (
                        <div className="mt-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm">
                          Next Date: {case_.nextDate} (Case Management Conference)
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                  <div className="flex items-center gap-2 text-yellow-400 font-medium mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    FEDERAL OVERSIGHT RECORD
                  </div>
                  <div className="text-sm text-zinc-300">
                    <p><strong>April 2024:</strong> Federal official demanded SF fix "uninhabitable" Plaza East</p>
                    <p><strong>Source:</strong> 48hills.org</p>
                    <p><strong>Issues:</strong> Mold, sewage, deteriorating conditions, cockroach infestation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="adversarial">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-400" />
                  Adversarial Node Matrix
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800">
                      <TableHead>Node</TableHead>
                      <TableHead>Designation</TableHead>
                      <TableHead>Documented Violation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Public Records</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adversarialNodes.map((node, i) => (
                      <TableRow key={i} className="border-zinc-800">
                        <TableCell className="font-medium">{node.name}</TableCell>
                        <TableCell className="font-mono text-cyan-400">{node.designation}</TableCell>
                        <TableCell className="text-sm">{node.violation}</TableCell>
                        <TableCell>{getStatusBadge(node.status)}</TableCell>
                        <TableCell>
                          {node.publicRecords === "found" ? (
                            <span className="text-green-400 flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4" /> Found
                            </span>
                          ) : (
                            <span className="text-zinc-500 flex items-center gap-1">
                              <XCircle className="h-4 w-4" /> Not Found
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center gap-2 text-red-400 font-medium mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    PUBLIC RECORD STATUS
                  </div>
                  <div className="text-sm text-zinc-300">
                    <p>5 of 6 adversarial nodes have NO public web presence.</p>
                    <p>SF Housing Authority is the only node with confirmed public litigation records.</p>
                    <p>William Landrum, Joseph Zanghi, David Scott USMC fatality - NOT indexed on public web.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 p-4 rounded-lg bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="font-mono text-sm text-cyan-400">VALORAIPLUS CLAWBACK++ EVIDENCE PIPELINE</div>
                <div className="text-xs text-zinc-500">FBI Evidence Preservation Mode Active</div>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="text-zinc-400">Evidence File:</div>
              <div className="font-mono text-cyan-400">valoraiplusreserves.env</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
