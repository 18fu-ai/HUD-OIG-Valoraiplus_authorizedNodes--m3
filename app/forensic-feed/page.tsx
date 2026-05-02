"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CDSHeader } from '@/components/cds/header';
import { 
  Shield, 
  Radio, 
  Lock, 
  AlertTriangle, 
  CheckCircle2, 
  Eye,
  FileText,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface ForensicEvent {
  id: string;
  timestamp: string;
  type: string;
  severity: 'INFO' | 'ELEVATED' | 'CRITICAL' | 'TERMINAL';
  actorId: string | null;
  description: string;
  evidenceHash: string;
  blockAnchor: string;
  scope: string;
}

interface FeedSnapshot {
  snapshotId: string;
  generatedAt: string;
  events: ForensicEvent[];
  eventCount: number;
  timelineHash: string;
  blockAnchor: string;
}

interface SignedSnapshot {
  snapshot: FeedSnapshot;
  signature: string;
  algorithm: string;
  signedAt: string;
  signerNode: string;
}

interface FeedResponse {
  snapshot: SignedSnapshot | null;
  accessGranted: boolean;
  scope: string;
  auditTraceId: string;
  generatedAt: string;
  nodeStatus: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  INFO: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  ELEVATED: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  CRITICAL: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  TERMINAL: 'bg-red-500/20 text-red-400 border-red-500/40',
};

const EVENT_TYPE_ICONS: Record<string, typeof Shield> = {
  WIRE_TRANSFER_DETECTED: Zap,
  SPOLIATION_BLOCKED: Shield,
  VOIP_INTERCEPT: Radio,
  EMAIL_FLAGGED: FileText,
  COOPERATION_INITIATED: CheckCircle2,
  ASSET_FROZEN: Lock,
  GRAND_JURY_SUBPOENA: AlertTriangle,
};

export default function ForensicFeedPage() {
  const [feed, setFeed] = useState<FeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actorId, setActorId] = useState('SOVEREIGN_AUDITOR');

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await fetch('/api/forensics/feed', {
          headers: {
            'x-actor-id': actorId,
          },
        });
        const data = await res.json();
        setFeed(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch forensic feed');
      } finally {
        setLoading(false);
      }
    }

    fetchFeed();
    const interval = setInterval(fetchFeed, 5000);
    return () => clearInterval(interval);
  }, [actorId]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Radio className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-mono font-bold text-foreground">
              FORENSIC FEED LAYER
            </h1>
          </div>
          <p className="text-muted-foreground font-mono">
            SGAU 7226.3461 // NODE: SAINT PAUL 55116 // VERIFIED FORENSIC LINEAGE
          </p>
        </div>

        {/* Status Bar */}
        <Card className="mb-6 bg-card/50 border-emerald-500/30">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                <Radio className="w-3 h-3 mr-1 animate-pulse" />
                {feed?.nodeStatus || 'INITIALIZING'}
              </Badge>
              <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/40">
                <Shield className="w-3 h-3 mr-1" />
                DILITHIUM-5 SIGNED
              </Badge>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                <Eye className="w-3 h-3 mr-1" />
                SCOPE: {feed?.scope || 'PENDING'}
              </Badge>
              <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/40">
                <Lock className="w-3 h-3 mr-1" />
                AUDIT: {feed?.auditTraceId?.slice(0, 12) || '...'} 
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Actor Selector */}
        <Card className="mb-6 bg-card/50 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-mono text-muted-foreground">
              ACCESS CONTROL - SELECT ACTOR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {['SOVEREIGN_AUDITOR', 'FBI_FC', 'HHS_OCR', 'INVESTIGATOR_AMY', 'ANONYMOUS'].map((actor) => (
                <button
                  key={actor}
                  onClick={() => setActorId(actor)}
                  className={cn(
                    'px-3 py-1.5 rounded font-mono text-xs border transition-all',
                    actorId === actor
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                      : 'bg-secondary/50 text-muted-foreground border-border hover:border-emerald-500/50'
                  )}
                >
                  {actor}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Feed Content */}
        {loading ? (
          <Card className="bg-card/50 border-border">
            <CardContent className="py-12 text-center">
              <Radio className="w-8 h-8 mx-auto mb-4 text-muted-foreground animate-pulse" />
              <p className="text-muted-foreground font-mono">Loading forensic feed...</p>
            </CardContent>
          </Card>
        ) : error || !feed?.accessGranted ? (
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="py-12 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-red-400" />
              <h2 className="text-xl font-mono font-bold text-red-400 mb-2">ACCESS DENIED</h2>
              <p className="text-red-400/70 font-mono text-sm">
                NO_ACCESS_SCOPE INVARIANT TRIGGERED
              </p>
              <p className="text-muted-foreground font-mono text-xs mt-4">
                Unauthorized actors cannot view the forensic feed.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Signature Info */}
            <Card className="mb-6 bg-purple-500/5 border-purple-500/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-mono flex items-center gap-2 text-purple-400">
                  <Shield className="w-4 h-4" />
                  SIGNED SNAPSHOT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  <div>
                    <span className="text-muted-foreground">Snapshot ID:</span>
                    <p className="text-foreground truncate">{feed.snapshot?.snapshot.snapshotId}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Timeline Hash:</span>
                    <p className="text-foreground truncate">{feed.snapshot?.snapshot.timelineHash}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Signature:</span>
                    <p className="text-emerald-400 truncate">{feed.snapshot?.signature.slice(0, 24)}...</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Feed */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="font-mono flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" />
                    FORENSIC EVENTS ({feed.snapshot?.snapshot.eventCount || 0})
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Block Anchor: {feed.snapshot?.snapshot.blockAnchor}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {feed.snapshot?.snapshot.events.map((event) => {
                    const IconComponent = EVENT_TYPE_ICONS[event.type] || FileText;
                    return (
                      <div
                        key={event.id}
                        className={cn(
                          'p-4 rounded-lg border bg-secondary/30',
                          event.severity === 'TERMINAL' && 'border-red-500/50 bg-red-500/5',
                          event.severity === 'CRITICAL' && 'border-orange-500/50 bg-orange-500/5',
                          event.severity === 'ELEVATED' && 'border-yellow-500/50 bg-yellow-500/5'
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'p-2 rounded-lg',
                            event.severity === 'TERMINAL' && 'bg-red-500/20',
                            event.severity === 'CRITICAL' && 'bg-orange-500/20',
                            event.severity === 'ELEVATED' && 'bg-yellow-500/20',
                            event.severity === 'INFO' && 'bg-blue-500/20'
                          )}>
                            <IconComponent className={cn(
                              'w-4 h-4',
                              event.severity === 'TERMINAL' && 'text-red-400',
                              event.severity === 'CRITICAL' && 'text-orange-400',
                              event.severity === 'ELEVATED' && 'text-yellow-400',
                              event.severity === 'INFO' && 'text-blue-400'
                            )} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className={SEVERITY_COLORS[event.severity]}>
                                {event.severity}
                              </Badge>
                              <Badge variant="outline" className="bg-secondary text-foreground border-border">
                                {event.type.replace(/_/g, ' ')}
                              </Badge>
                              {event.actorId && (
                                <Badge variant="outline" className="bg-purple-500/20 text-purple-400 border-purple-500/40">
                                  {event.actorId}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-foreground mb-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(event.timestamp).toLocaleString()}
                              </span>
                              <span className="truncate">Hash: {event.evidenceHash.slice(0, 12)}...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground font-mono">
          <p>VALORAIPLUS®️ // FORENSIC FEED LAYER // OMEGA-ZERO</p>
          <p className="mt-1">NO_SIGNED_FEED → NO_EXTERNAL_PROJECTION</p>
        </div>
      </main>
    </div>
  );
}
