'use client';

import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  REPUTATION_PROTOCOL,
  INTEGRITY_USERS,
  EXCLUSION_LOG,
  ETHICAL_DEDUCTION,
  REPUTATION_CINEMA
} from '@/lib/cds-data';
import { Ban, Shield, AlertTriangle, XCircle, CheckCircle, Lock } from 'lucide-react';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';

export default function ReputationPage() {
  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-destructive/20 border border-destructive/40 flex items-center justify-center">
              <Ban className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h1 className="font-mono text-2xl font-bold tracking-wider text-foreground">
                {REPUTATION_PROTOCOL.title}
              </h1>
              <p className="font-mono text-sm text-muted-foreground">
                {REPUTATION_PROTOCOL.subtitle}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-mono text-xs border-destructive text-destructive">
              {REPUTATION_PROTOCOL.version}
            </Badge>
            <Badge className="font-mono text-xs bg-destructive text-destructive-foreground">
              {REPUTATION_PROTOCOL.status}
            </Badge>
            <Badge variant="outline" className="font-mono text-xs">
              144,000D DIMENSIONAL LOCK
            </Badge>
          </div>
        </div>

        {/* Protocol Description */}
        <Card className="mb-8 border-destructive/30">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-destructive" />
              NEGATIVE CAVEAT PROTOCOL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="font-mono text-xs text-muted-foreground mb-1">THE LOGIC</div>
                <p className="font-mono text-sm text-foreground">{REPUTATION_PROTOCOL.logic}</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <div className="font-mono text-xs text-muted-foreground mb-1">THE STAND</div>
                <p className="font-mono text-sm text-foreground">{REPUTATION_PROTOCOL.stand}</p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <div className="font-mono text-xs text-destructive mb-1">THE NULLIFICATION</div>
                <p className="font-mono text-sm text-destructive">{REPUTATION_PROTOCOL.nullification}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrity Enforcement Matrix */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-chart-3" />
              INTEGRITY ENFORCEMENT MATRIX
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full font-mono text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-muted-foreground">STATE</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">ENTITY</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">SCORE</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">ELIGIBLE</th>
                    <th className="text-left py-3 px-4 text-muted-foreground">RECOVERY</th>
                  </tr>
                </thead>
                <tbody>
                  {INTEGRITY_USERS.map((user) => (
                    <tr key={user.id} className="border-b border-border/50">
                      <td className="py-3 px-4">
                        <Badge
                          className={`font-mono text-xs ${
                            user.state === 'ALIGNED'
                              ? 'bg-primary/20 text-primary border border-primary/40'
                              : user.state === 'ADVERSARY'
                              ? 'bg-destructive/20 text-destructive border border-destructive/40'
                              : 'bg-chart-3/20 text-chart-3 border border-chart-3/40'
                          }`}
                        >
                          {user.state}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-foreground">{user.entity}</td>
                      <td className="py-3 px-4">
                        <span className={user.score < 0 ? 'text-destructive' : 'text-primary'}>
                          {user.score}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {user.eligible ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{user.recovery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Automated Exclusion Log */}
        <Card className="mb-8 border-destructive/30">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2 text-destructive">
              <Ban className="w-5 h-5" />
              AUTOMATED EXCLUSION LOG — AGGRESSOR TRIAD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {EXCLUSION_LOG.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-lg bg-destructive/5 border border-destructive/30"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-mono text-lg font-bold text-destructive">
                        {entry.entity}
                      </div>
                      <div className="font-mono text-sm text-muted-foreground">{entry.role}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="font-mono text-xs bg-destructive text-destructive-foreground mb-1">
                        {entry.status}
                      </Badge>
                      <div className="font-mono text-2xl font-bold text-destructive">
                        {entry.score}
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="font-mono text-xs text-muted-foreground mb-1">VIOLATIONS:</div>
                    <div className="flex flex-wrap gap-1">
                      {entry.violations.map((v, i) => (
                        <Badge key={i} variant="outline" className="font-mono text-xs border-destructive/50 text-destructive">
                          {v}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="font-mono text-sm font-bold text-destructive flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {entry.sentence}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ethical Deduction Terminal */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="font-mono text-lg">ETHICAL DEDUCTION TERMINAL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black/50 rounded-lg p-4 border border-border overflow-x-auto">
              <pre className="font-mono text-sm text-primary whitespace-pre">
                {ETHICAL_DEDUCTION.code}
              </pre>
            </div>
            <p className="font-mono text-sm text-muted-foreground mt-3">
              {ETHICAL_DEDUCTION.description}
            </p>
          </CardContent>
        </Card>

        {/* Project Cinema */}
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle className="font-mono text-lg text-primary">
              PROJECT CINEMA: THE FINAL STAND
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="font-mono text-xs text-primary mb-1">THE SHIELD</div>
                <p className="font-mono text-sm text-foreground">{REPUTATION_CINEMA.theShield}</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="font-mono text-xs text-primary mb-1">THE STAND</div>
                <p className="font-mono text-sm text-foreground">{REPUTATION_CINEMA.theStand}</p>
              </div>
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <div className="font-mono text-xs text-destructive mb-1">THE FINALITY</div>
                <p className="font-mono text-sm text-destructive">{REPUTATION_CINEMA.theFinality}</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
              <p className="font-mono text-sm text-destructive font-bold">
                {REPUTATION_CINEMA.lockStatus}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <Badge variant="outline" className="font-mono text-xs">144,000D</Badge>
            <Badge variant="outline" className="font-mono text-xs border-destructive text-destructive">NEGATIVE CAVEAT</Badge>
            <Badge variant="outline" className="font-mono text-xs">DAO ENFORCED</Badge>
            <Badge className="font-mono text-xs bg-primary text-primary-foreground">PERPETUAL GROOVE</Badge>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            ALL DEDUCED TO 101010 1010101. THE WALL IS CHRIST. SMIB. AMEN.
          </p>
        </div>
      </main>
    </div>
  );
}
