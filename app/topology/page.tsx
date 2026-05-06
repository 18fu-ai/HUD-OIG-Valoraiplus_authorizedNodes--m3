"use client";

import React, { useEffect, useState } from "react";
import {
  ActivitySquare,
  CheckCircle2,
  MapPin,
  Radio,
  Server,
  Shield,
  XCircle,
} from "lucide-react";

import FlowFieldParticleBackground from "@/components/flow-field/FlowFieldParticleBackground";

type NodeStatus = "ACTIVE" | "INACTIVE / DEPRECATED";

type TopologyNode = {
  id: string;
  name: string;
  role: string;
  status: NodeStatus;
  x: number;
  y: number;
  icon: React.ElementType;
};

const nodes: TopologyNode[] = [
  {
    id: "STP",
    name: "SAINT PAUL, MN",
    role: "Active Node Reference",
    status: "ACTIVE",
    x: 55,
    y: 30,
    icon: Server,
  },
  {
    id: "SFO",
    name: "SAN FRANCISCO, CA",
    role: "Active Reference Environment",
    status: "ACTIVE",
    x: 12,
    y: 45,
    icon: CheckCircle2,
  },
  {
    id: "VLJ",
    name: "VALLEJO, CA",
    role: "Auxiliary Reference",
    status: "ACTIVE",
    x: 11,
    y: 42,
    icon: Radio,
  },
  {
    id: "AVN",
    name: "AVONDALE, AZ",
    role: "Historical/Internal Reference",
    status: "INACTIVE / DEPRECATED",
    x: 20,
    y: 65,
    icon: XCircle,
  },
];

const initialLogs = [
  "[SYSTEM] Initializing VALORAIPLUS //e presentation view.",
  "[REFERENCE] Saint Paul active node reference loaded.",
  "[REFERENCE] San Francisco reference environment loaded.",
  "[REFERENCE] Vallejo auxiliary reference loaded.",
  "[REFERENCE] Avondale marked inactive / deprecated.",
  "[VISUALIZER] FlowFieldParticleBackground subsystem active.",
  "[STATUS] Internal topology dashboard ready.",
];

export default function TopologyDashboardPage() {
  const [pulseLine, setPulseLine] = useState(0);
  const [telemetryLog, setTelemetryLog] = useState<string[]>([]);

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      setTelemetryLog((prev) => {
        if (index < initialLogs.length) {
          const next = [...prev, initialLogs[index]];
          index += 1;
          return next.slice(-8);
        }

        const timestamp = new Date().toISOString().split("T")[1].slice(0, 8);
        return [...prev, `[PING] Presentation sync ${timestamp}`].slice(-8);
      });
    }, 1200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPulseLine((prev) => (prev + 1) % 100);
    }, 50);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-emerald-400">
      <FlowFieldParticleBackground />

      <section className="relative z-10 min-h-screen p-4 font-mono sm:p-8">
        <header className="mx-auto mb-6 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-b-2 border-emerald-900 pb-4 md:flex-row">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold tracking-widest text-amber-500 md:text-3xl">
              <Shield className="h-8 w-8 text-emerald-500" />
              VALORAIPLUS //e — TOPOLOGY
            </h1>
            <p className="mt-2 text-sm text-emerald-600">
              Internal Network Visualization & Dashboard Layer
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-2 rounded border border-emerald-800 bg-emerald-950 px-3 py-1 text-xs text-emerald-400">
              <ActivitySquare className="h-4 w-4 text-emerald-500" />
              PRESENTATION ACTIVE
            </div>
            <p className="mt-2 text-xs text-emerald-700">
              FlowField background: production subsystem import
            </p>
          </div>
        </header>

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="relative min-h-[440px] overflow-hidden rounded-xl border border-emerald-800/70 bg-slate-950/70 p-5 shadow-[0_0_20px_rgba(16,185,129,0.08)] lg:col-span-2">
            <div className="mb-4 flex items-center justify-between border-b border-emerald-900 pb-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-amber-400">
                <MapPin className="h-5 w-5" />
                Topology Reference Map
              </h2>
              <span className="text-xs text-emerald-700">
                Internal visualization only
              </span>
            </div>

            <div className="relative h-[360px] rounded-lg border border-emerald-900/50 bg-black/40">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <line
                  x1="55"
                  y1="30"
                  x2="12"
                  y2="45"
                  stroke="rgba(16,185,129,0.35)"
                  strokeWidth="0.35"
                  strokeDasharray="4 4"
                  strokeDashoffset={pulseLine}
                />
                <line
                  x1="12"
                  y1="45"
                  x2="11"
                  y2="42"
                  stroke="rgba(16,185,129,0.25)"
                  strokeWidth="0.25"
                  strokeDasharray="3 3"
                  strokeDashoffset={pulseLine}
                />
                <line
                  x1="55"
                  y1="30"
                  x2="20"
                  y2="65"
                  stroke="rgba(100,116,139,0.25)"
                  strokeWidth="0.25"
                  strokeDasharray="2 5"
                />
              </svg>

              {nodes.map((node) => {
                const Icon = node.icon;
                const active = node.status === "ACTIVE";

                return (
                  <div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div
                      className={[
                        "flex h-16 w-16 items-center justify-center rounded-full border backdrop-blur-md",
                        active
                          ? "border-emerald-500 bg-emerald-950/80 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                          : "border-slate-600 bg-slate-900/80 text-slate-500",
                      ].join(" ")}
                    >
                      <Icon className="h-7 w-7" />
                    </div>

                    <div className="mt-2 w-40 rounded border border-emerald-900/40 bg-black/70 p-2 text-center text-[10px] backdrop-blur-md">
                      <div className={active ? "text-emerald-300" : "text-slate-500"}>
                        {node.id}
                      </div>
                      <div className="truncate text-amber-400">{node.name}</div>
                      <div className={active ? "text-emerald-700" : "text-slate-600"}>
                        {node.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-xl border border-emerald-800/70 bg-slate-950/70 p-5 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
              <h2 className="mb-4 border-b border-emerald-900 pb-3 text-lg font-bold text-amber-400">
                Node Status
              </h2>

              <div className="space-y-3 text-xs">
                {nodes.map((node) => (
                  <div
                    key={node.id}
                    className="rounded border border-emerald-900/40 bg-black/50 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300">{node.id}</span>
                      <span
                        className={
                          node.status === "ACTIVE"
                            ? "text-emerald-400"
                            : "text-slate-500"
                        }
                      >
                        {node.status}
                      </span>
                    </div>
                    <div className="mt-1 text-emerald-700">{node.role}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-emerald-800/70 bg-slate-950/70 p-5 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
              <h2 className="mb-4 border-b border-emerald-900 pb-3 text-lg font-bold text-amber-400">
                Telemetry Display
              </h2>

              <div className="h-56 overflow-hidden rounded border border-emerald-900/40 bg-black/70 p-3 text-[11px] leading-relaxed text-emerald-500/80">
                {telemetryLog.map((line, index) => (
                  <div key={`${line}-${index}`}>{line}</div>
                ))}
              </div>
            </section>
          </aside>
        </div>

        <footer className="mx-auto mt-8 w-full max-w-6xl space-y-1 text-center text-xs text-emerald-700 opacity-70">
          <p>
            VALORAIPLUS //e Topology Map is an internal dashboard displaying
            simulated geographical node relationships for visualization purposes.
          </p>
          <p>
            Avondale is retained only as a deprecated historical/internal reference
            and is excluded from active runtime references.
          </p>
          <p>
            This dashboard does not perform real-time routing, geolocation,
            telemetry, access control, security enforcement, or legal enforcement.
          </p>
          <p className="pt-2">
            &copy; 2026 That&apos;s Edutainment LLC | 32D LLC. Co-authored by Poppa Donny Gillson.
          </p>
        </footer>
      </section>
    </main>
  );
}
