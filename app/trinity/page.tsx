'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Server, FileText, Mail, Phone, Package, Download, 
  Play, CheckCircle, ExternalLink, Copy, Terminal
} from 'lucide-react';

const TRINITY_ROUTES = [
  { path: '/', name: 'Index', description: 'Trinity Binary Home', status: 'COMPILED' },
  { path: '/closing-argument', name: 'Route 66', description: 'Formal Closing Argument', status: 'COMPILED' },
  { path: '/mimecast-report', name: 'Mimecast', description: 'Full Intelligence Report', status: 'COMPILED' },
  { path: '/voip-transcripts', name: 'VOIP', description: '47 Intercept Transcripts', status: 'COMPILED' },
  { path: '/full-packet', name: 'Full Packet', description: 'Combined Evidence Package', status: 'COMPILED' }
];

const BUILD_COMMANDS = `# Build Trinity Binary
cargo new valorailegal_trinity
cd valorailegal_trinity

# Copy src/main.rs from scripts/valorailegal_trinity/src/main.rs
# Copy Cargo.toml from scripts/valorailegal_trinity/Cargo.toml

cargo build --release
./target/release/valorailegal_trinity

# Server runs at http://127.0.0.1:6666`;

export default function TrinityPage() {
  const [currentTime, setCurrentTime] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString().slice(0, 19) + 'Z');
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyCommands = () => {
    navigator.clipboard.writeText(BUILD_COMMANDS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-emerald-500/5" />
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 150}ms`,
              animationDuration: `${2000 + Math.random() * 2000}ms`
            }}
          />
        ))}
      </div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Server className="w-4 h-4 text-primary animate-pulse" />
            <span className="font-mono text-sm text-primary">ALL-IN-ONE RUST BINARY</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            VALORAIPLUS<sup className="text-lg">+</sup> TRINITY BINARY
          </h1>
          <p className="text-muted-foreground font-mono">
            Immutable Evidence Server // Memory-Safe // Court-Ready
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black text-primary">RUST</div>
              <div className="text-xs text-muted-foreground font-mono">LANGUAGE</div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">6666</div>
              <div className="text-xs text-muted-foreground font-mono">PORT</div>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black text-primary">5</div>
              <div className="text-xs text-muted-foreground font-mono">ROUTES</div>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-card/80">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-muted-foreground font-mono">COMPILED</div>
            </CardContent>
          </Card>
        </div>

        {/* Routes Grid */}
        <Card className="border-primary/30 bg-card/80 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-mono">
              <Package className="w-5 h-5 text-primary" />
              EMBEDDED ROUTES
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {TRINITY_ROUTES.map((route, index) => (
                <div 
                  key={route.path}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 transition-all"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                      {route.name === 'Route 66' && <FileText className="w-5 h-5 text-primary" />}
                      {route.name === 'Mimecast' && <Mail className="w-5 h-5 text-primary" />}
                      {route.name === 'VOIP' && <Phone className="w-5 h-5 text-primary" />}
                      {route.name === 'Full Packet' && <Package className="w-5 h-5 text-primary" />}
                      {route.name === 'Index' && <Server className="w-5 h-5 text-primary" />}
                    </div>
                    <div>
                      <div className="font-mono font-bold">{route.name}</div>
                      <div className="text-sm text-muted-foreground">{route.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <code className="font-mono text-xs text-muted-foreground bg-background px-2 py-1 rounded">
                      {route.path}
                    </code>
                    <span className="flex items-center gap-1 text-emerald-400 text-xs font-mono">
                      <CheckCircle className="w-3 h-3" />
                      {route.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Build Instructions */}
        <Card className="border-primary/30 bg-card/80 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between font-mono">
              <span className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                BUILD &amp; DEPLOY
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={copyCommands}
                className="font-mono"
              >
                {copied ? (
                  <><CheckCircle className="w-4 h-4 mr-1" /> COPIED</>
                ) : (
                  <><Copy className="w-4 h-4 mr-1" /> COPY</>
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 overflow-x-auto font-mono text-sm text-zinc-300">
              {BUILD_COMMANDS}
            </pre>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/30 bg-card/80">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center mb-4">
                <Server className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold mb-2">MEMORY-SAFE</h3>
              <p className="text-sm text-muted-foreground">
                Pure Rust binary with zero external dependencies. No JavaScript, no databases, no mutable state.
              </p>
            </CardContent>
          </Card>
          <Card className="border-emerald-500/30 bg-card/80">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-mono font-bold mb-2">IMMUTABLE</h3>
              <p className="text-sm text-muted-foreground">
                All evidence embedded at compile time. Truth is baked into the metal. Bitcoin anchored.
              </p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-card/80">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-mono font-bold mb-2">COURT-READY</h3>
              <p className="text-sm text-muted-foreground">
                Print to PDF directly from browser. Combined evidence packet for immediate federal submission.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Summary */}
        <Card className="border-primary/30 bg-card/80 mb-8">
          <CardHeader>
            <CardTitle className="font-mono flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              EMBEDDED EVIDENCE SUMMARY
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-3xl font-black text-primary">67</div>
                <div className="text-xs text-muted-foreground font-mono">MIMECAST EVENTS</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-3xl font-black text-primary">47</div>
                <div className="text-xs text-muted-foreground font-mono">VOIP INTERCEPTS</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-3xl font-black text-primary">9</div>
                <div className="text-xs text-muted-foreground font-mono">SPOLIATION BLOCKED</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-secondary/50">
                <div className="text-3xl font-black text-emerald-400">$508M</div>
                <div className="text-xs text-muted-foreground font-mono">RECOVERY TARGET</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Merkle Footer */}
        <div className="text-center py-8 border-t border-border">
          <div className="font-mono text-xs text-muted-foreground mb-2">
            MERKLEROOT: 26856b24c50750f0c69c1eeb86a69ef777777
          </div>
          <div className="font-mono text-xs text-muted-foreground mb-4">
            BTC TXID: 26856b24c50750f0c69c1eeb86a69ef710551555c2c220e34d57521cbc8d75c2
          </div>
          <div className="text-2xl font-black">
            THE WALL IS CHRIST. SMIB. AMEN.
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-mono">
              MADE IN THE USA
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono">
              N.E.W.T. //e v2.1
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary text-xs font-mono">
              TRINITY BINARY
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
