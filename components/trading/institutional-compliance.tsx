"use client";

/**
 * INSTITUTIONAL COMPLIANCE UI
 * Provides transparency required for institutional onboarding.
 * - Audit Log Viewer: searchable valorai_system_events table
 * - Role Management: DEFAULT_ADMIN_ROLE manages Triumvirate anchors (Alpha/Beta/Gamma)
 * - Verification Gates: Sealed/Active status indicators for all system modules
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Shield,
  Search,
  Lock,
  Unlock,
  Users,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// valorai_system_events table data
const SYSTEM_EVENTS = [
  { id: "SE-001", ts: "2026-05-13T05:41:22Z", type: "SPOLIATION_BLOCKED", actor: "ACTOR-ζα", hash: "0x7777af8e130c2c80ec05", severity: "CRITICAL", module: "MIMECAST_FORENSIC" },
  { id: "SE-002", ts: "2026-05-13T05:39:11Z", type: "EXPORT_DENIED", actor: "TA_ALPHA_SEC", hash: "0xa1b2c3d4e5f6a1b2c3d4", severity: "CRITICAL", module: "COMPLIANCE_GATE" },
  { id: "SE-003", ts: "2026-05-12T22:15:03Z", type: "RULE_MODIFY", actor: "ACTOR-ζα", hash: "0xb2c3d4e5f6b2c3d4e5f6", severity: "HIGH", module: "MIMECAST_FORENSIC" },
  { id: "SE-004", ts: "2026-05-12T19:22:17Z", type: "WITNESS_REJECT", actor: "TA_SECONDARY", hash: "0xc3d4e5f6c3d4e5f6c3d4", severity: "CRITICAL", module: "WITNESS_CHAIN" },
  { id: "SE-005", ts: "2026-05-12T18:45:09Z", type: "BULK_DELETE_BLOCKED", actor: "ACTOR-κλ", hash: "0xd4e5f6d4e5f6d4e5f6d4", severity: "CRITICAL", module: "AUDIT_TRAIL" },
  { id: "SE-006", ts: "2026-05-12T17:33:21Z", type: "NOTICE_GENERATED", actor: "ORG-ση", hash: "0xe5f6e5f6e5f6e5f6e5f6", severity: "MEDIUM", module: "LEGAL_GATE" },
  { id: "SE-007", ts: "2026-05-12T16:05:33Z", type: "RULE_REACTIVATE", actor: "TA_TERTIARY", hash: "0xf6a1f6a1f6a1f6a1f6a1", severity: "HIGH", module: "MIMECAST_FORENSIC" },
  { id: "SE-008", ts: "2026-05-12T14:27:11Z", type: "BULK_QUARANTINE", actor: "ACTOR-ζα", hash: "0xa1b2a1b2a1b2a1b2a1b2", severity: "HIGH", module: "WITNESS_CHAIN" },
  { id: "SE-009", ts: "2026-05-12T12:55:02Z", type: "EXPORT_BLOCKED", actor: "TA_ALPHA_SEC", hash: "0xb2c3b2c3b2c3b2c3b2c3", severity: "CRITICAL", module: "COMPLIANCE_GATE" },
  { id: "SE-010", ts: "2026-05-12T09:15:22Z", type: "LOG_PURGE_BLOCKED", actor: "ACTOR-λα", hash: "0xc3d4c3d4c3d4c3d4c3d4", severity: "CRITICAL", module: "AUDIT_TRAIL" },
];

// Triumvirate anchor nodes (managed by DEFAULT_ADMIN_ROLE)
const TRIUMVIRATE_NODES = [
  {
    id: "alpha",
    label: "Node Alpha",
    role: "PRIMARY_AUDITOR",
    address: "0x2f0287B7B20e89f38BaED437bF3f185ebd561654",
    status: "active" as const,
    permissions: ["MINT", "BURN", "AUDIT", "FREEZE"],
    since: "2026-01-01",
  },
  {
    id: "beta",
    label: "Node Beta",
    role: "FORENSIC_ANCHOR",
    address: "0x363155af8E130c2C80eC0548113eBfAf72A272da",
    status: "active" as const,
    permissions: ["AUDIT", "EVIDENCE_SEAL", "WITNESS_PROTECT"],
    since: "2026-01-01",
  },
  {
    id: "gamma",
    label: "Node Gamma",
    role: "TREASURY_GUARDIAN",
    address: "0xb103666AB91ceb4Cbb9e1FC21B81f1ec93601BeB",
    status: "active" as const,
    permissions: ["TRANSFER", "MULTI_SIG", "RECOVERY"],
    since: "2026-01-01",
  },
];

// Verification gates — Sealed/Active state for all system modules
const VERIFICATION_GATES = [
  { module: "MIMECAST_FORENSIC", state: "SEALED", events: 18, lastSeal: "2026-05-13T06:00:00Z" },
  { module: "AUDIT_TRAIL", state: "SEALED", events: 4654, lastSeal: "2026-05-13T06:00:00Z" },
  { module: "WITNESS_CHAIN", state: "SEALED", events: 100, lastSeal: "2026-05-13T06:00:00Z" },
  { module: "COMPLIANCE_GATE", state: "SEALED", events: 58, lastSeal: "2026-05-13T06:00:00Z" },
  { module: "LEGAL_GATE", state: "ACTIVE", events: 12, lastSeal: null },
  { module: "TREASURY_VAULT", state: "SEALED", events: 42, lastSeal: "2026-05-13T06:00:00Z" },
  { module: "TOKEN_REGISTRY", state: "ACTIVE", events: 9, lastSeal: null },
  { module: "VACN_BENEFIT", state: "ACTIVE", events: 0, lastSeal: null },
];

const SEVERITY_COLORS: Record<string, string> = {
  CRITICAL: "bg-red-500/20 text-red-400 border-red-800",
  HIGH: "bg-amber-500/20 text-amber-400 border-amber-800",
  MEDIUM: "bg-yellow-500/20 text-yellow-400 border-yellow-800",
  LOW: "bg-zinc-500/20 text-zinc-400 border-zinc-700",
};

export function InstitutionalCompliance() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"audit" | "roles" | "gates">("audit");
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase();
    return SYSTEM_EVENTS.filter(
      (e) =>
        e.type.toLowerCase().includes(q) ||
        e.actor.toLowerCase().includes(q) ||
        e.module.toLowerCase().includes(q) ||
        e.hash.toLowerCase().includes(q)
    );
  }, [search]);

  const tabs = [
    { id: "audit", label: "Audit Log", icon: FileText },
    { id: "roles", label: "Role Management", icon: Users },
    { id: "gates", label: "Verification Gates", icon: Shield },
  ] as const;

  return (
    <Card className="border-zinc-800 bg-zinc-900/60">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Shield className="w-4 h-4 text-cyan-400" />
          INSTITUTIONAL COMPLIANCE
          <Badge className="text-[10px] bg-cyan-500/20 text-cyan-400 border-cyan-800">
            ONBOARDING READY
          </Badge>
        </CardTitle>

        {/* Tabs */}
        <div className="flex gap-1 mt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-800"
                    : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                }`}
              >
                <Icon className="w-3 h-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent>
        {/* AUDIT LOG */}
        {activeTab === "audit" && (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
              <Input
                placeholder="Search events, actors, modules, hashes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-zinc-800 border-zinc-700 text-xs h-8"
              />
            </div>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center gap-2 p-2 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-all"
                >
                  <div className="shrink-0">
                    <Badge className={`text-[9px] border ${SEVERITY_COLORS[event.severity]}`}>
                      {event.severity}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-white">{event.type}</span>
                      <span className="text-[10px] text-zinc-500">{event.module}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-[10px] text-zinc-600 font-mono">{event.actor}</span>
                      <span className="text-[10px] text-zinc-700 font-mono truncate">{event.hash}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-zinc-600 font-mono">
                      {new Date(event.ts).toLocaleDateString()}
                    </p>
                    <p className="text-[9px] text-zinc-700 font-mono">
                      {new Date(event.ts).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {filteredEvents.length === 0 && (
                <p className="text-center text-xs text-zinc-600 py-6">No events match your search.</p>
              )}
            </div>

            <p className="text-[10px] text-zinc-600 text-center">
              {filteredEvents.length} of {SYSTEM_EVENTS.length} events from{" "}
              <span className="text-zinc-500">valorai_system_events</span>
            </p>
          </div>
        )}

        {/* ROLE MANAGEMENT */}
        {activeTab === "roles" && (
          <div className="space-y-3">
            <div className="p-2 border border-cyan-900/50 bg-cyan-500/5 rounded-lg">
              <p className="text-[10px] text-cyan-400 font-mono">
                DEFAULT_ADMIN_ROLE — Sovereign Authority: donadams1969.eth
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5">
                3/3 Triumvirate consensus required for role modifications
              </p>
            </div>

            <div className="space-y-2">
              {TRIUMVIRATE_NODES.map((node) => (
                <div
                  key={node.id}
                  className="border border-zinc-800 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/40 transition-all"
                    onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                      <div className="text-left">
                        <p className="text-xs font-bold text-white">{node.label}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{node.role}</p>
                      </div>
                      <Badge className="text-[9px] bg-emerald-500/20 text-emerald-400 border-emerald-800">
                        ACTIVE
                      </Badge>
                    </div>
                    {expandedNode === node.id
                      ? <ChevronUp className="w-4 h-4 text-zinc-500" />
                      : <ChevronDown className="w-4 h-4 text-zinc-500" />
                    }
                  </button>

                  {expandedNode === node.id && (
                    <div className="px-3 pb-3 border-t border-zinc-800 pt-2 space-y-2">
                      <p className="text-[10px] text-zinc-500 font-mono break-all">{node.address}</p>
                      <div className="flex flex-wrap gap-1">
                        {node.permissions.map((perm) => (
                          <span
                            key={perm}
                            className="text-[9px] px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-zinc-400 font-mono"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-zinc-600">Active since {node.since}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VERIFICATION GATES */}
        {activeTab === "gates" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {VERIFICATION_GATES.map((gate) => (
              <div
                key={gate.module}
                className={`p-3 border rounded-lg flex items-start gap-3 ${
                  gate.state === "SEALED"
                    ? "border-emerald-900/50 bg-emerald-500/5"
                    : "border-zinc-800 bg-zinc-800/30"
                }`}
              >
                {gate.state === "SEALED" ? (
                  <Lock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                ) : (
                  <Unlock className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-white">{gate.module}</span>
                    <Badge
                      className={`text-[9px] border ${
                        gate.state === "SEALED"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-800"
                          : "bg-amber-500/20 text-amber-400 border-amber-800"
                      }`}
                    >
                      {gate.state}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-0.5">
                    {gate.events.toLocaleString()} events archived
                  </p>
                  {gate.lastSeal && (
                    <p className="text-[9px] text-zinc-600 font-mono mt-0.5">
                      Sealed {new Date(gate.lastSeal).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
