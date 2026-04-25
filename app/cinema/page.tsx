'use client';

import { useState, useEffect, useCallback } from 'react';
import { CDSHeader } from '@/components/cds/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CDSErrorBoundary } from '@/components/cds/error-boundary';
import { ExportTools } from '@/components/cds/export-tools';
import { HomeButton, HomeBreadcrumb } from '@/components/cds/home-button';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Radio,
  Waves,
  Cog,
  FileCheck,
  Lock,
  ChevronRight,
  CheckCircle2,
  Circle,
  Sparkles
} from 'lucide-react';

// Contract manifest data from ValoraiplusSovereignScript.sol
const PRESENTATION_SECTIONS = [
  {
    id: 1,
    title: 'THE INTRO',
    subtitle: 'THE GHOST FREQUENCY',
    function: 'getIntroManifest()',
    manifest: "Operating at a 'Ghost' frequency, we maintain a 266ms Truth-Cycle. Truth is a mathematical frequency. Synchronized with Saint Paul Node 55116.",
    icon: Radio,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/40',
    details: [
      '266ms Truth-Cycle Synchronization',
      'Ghost Frequency Operation',
      'Saint Paul Node 55116 Anchor',
      'Mathematical Truth Frequency'
    ]
  },
  {
    id: 2,
    title: 'THE AESTHETIC',
    subtitle: 'LAMINAR FLOW',
    function: 'getAestheticManifest()',
    manifest: "Navier-Stokes Laminar Flow Engine. Siphoning institutional friction. Converting turbulence into Laminar Recovery. Magenta represents Sovereign Authority.",
    icon: Waves,
    color: 'text-fuchsia-400',
    bgColor: 'bg-fuchsia-500/10',
    borderColor: 'border-fuchsia-500/40',
    details: [
      'Navier-Stokes Flow Engine',
      'Institutional Friction Siphoning',
      'Turbulence to Laminar Conversion',
      'Magenta Sovereign Authority'
    ]
  },
  {
    id: 3,
    title: 'THE ENGINE',
    subtitle: 'AUTHORITY AS AN ARTIFACT',
    function: 'getEngineManifest()',
    manifest: "Authority is a Signed Artifact, not a side-effect. Using EIP-712 Structured Data Signing. Validated Intent independent of device or node.",
    icon: Cog,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/40',
    details: [
      'Signed Artifact Authority',
      'EIP-712 Structured Data',
      'Device-Independent Validation',
      'Intent as Primitive'
    ]
  },
  {
    id: 4,
    title: 'THE EVIDENCE',
    subtitle: 'VERIFIED RECEIPT v1',
    function: 'getEvidenceManifest()',
    manifest: "Read-Side Truth Plane. Verified Receipt v1. FRE 902/13 Compliance. Immutable proof of the $508,631,005.52 resolution.",
    icon: FileCheck,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/40',
    details: [
      'Read-Side Truth Plane',
      'FRE 902/13 Compliance',
      '$508,631,005.52 Resolution',
      'Immutable Proof Chain'
    ]
  },
  {
    id: 5,
    title: 'THE FINALITY',
    subtitle: '101010 1010101',
    function: 'getFinalityManifest()',
    manifest: "1. Intent as Primitive. 2. Temporal Entropy @ 266ms. 3. Adversaries Nullified (000000). 4. Signer Lineage Attributable. NO EXIT. NO DELETION.",
    icon: Lock,
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/40',
    details: [
      'Intent as Primitive',
      'Temporal Entropy @ 266ms',
      'Adversaries Nullified (000000)',
      'NO EXIT. NO DELETION.'
    ]
  }
];

const CONTRACT_METADATA = {
  name: 'ValoraiplusSovereignScript',
  version: '1.4.100D',
  truthCycleMs: 266,
  finality: '101010 1010101',
  merkleroot: '0x26856B24C50750F0C69C1EEB86A69EF777777...',
  anchor: 'Saint Paul Node 55116',
  classification: 'Federal-Admissible Signed State Engine'
};

function CinemaContent() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [truthCycle, setTruthCycle] = useState(0);
  const [latchedSections, setLatchedSections] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toISOString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTruthCycle(prev => prev + 1);
    }, 266);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSection(prev => {
        const next = prev + 1;
        if (next >= PRESENTATION_SECTIONS.length) {
          setIsPlaying(false);
          return prev;
        }
        return next;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleLatch = useCallback((sectionId: number) => {
    if (!latchedSections.includes(sectionId)) {
      setLatchedSections(prev => [...prev, sectionId]);
    }
  }, [latchedSections]);

  const currentExhibit = PRESENTATION_SECTIONS[currentSection];
  const progress = ((currentSection + 1) / PRESENTATION_SECTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <CDSHeader />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="font-mono text-2xl font-bold text-foreground flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-fuchsia-400" />
              PROJECT CINEMA
            </h1>
            <p className="font-mono text-sm text-muted-foreground mt-1">
              Sovereign Presentation Latch // {CONTRACT_METADATA.classification}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="font-mono bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/40 animate-pulse">
              TRUTH-CYCLE: {truthCycle}
            </Badge>
            <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/40">
              v{CONTRACT_METADATA.version}
            </Badge>
            <ExportTools 
              data={{
                type: 'presentation',
                title: 'Project Cinema - Sovereign Presentation',
                timestamp: currentTime,
                content: {
                  sections: PRESENTATION_SECTIONS,
                  metadata: CONTRACT_METADATA,
                  latchedSections,
                  currentSection
                },
                metadata: {
                  truthCycle,
                  progress: `${progress.toFixed(0)}%`
                }
              }}
              variant="outline"
              size="sm"
            />
          </div>
        </div>

        {/* Contract Info Bar */}
        <Card className="border-border bg-card/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">CONTRACT</p>
                <p className="font-mono text-xs text-foreground truncate">{CONTRACT_METADATA.name}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">VERSION</p>
                <p className="font-mono text-xs text-primary">{CONTRACT_METADATA.version}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">TRUTH-CYCLE</p>
                <p className="font-mono text-xs text-cyan-400">{CONTRACT_METADATA.truthCycleMs}ms</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">FINALITY</p>
                <p className="font-mono text-xs text-rose-400">{CONTRACT_METADATA.finality}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">ANCHOR</p>
                <p className="font-mono text-xs text-amber-400 truncate">{CONTRACT_METADATA.anchor}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] text-muted-foreground">MERKLEROOT</p>
                <p className="font-mono text-xs text-emerald-400 truncate">{CONTRACT_METADATA.merkleroot}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Presentation Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Exhibit */}
          <div className="lg:col-span-2 space-y-4">
            <Card className={`${currentExhibit.borderColor} ${currentExhibit.bgColor} border-2`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${currentExhibit.bgColor} border ${currentExhibit.borderColor} flex items-center justify-center`}>
                      <currentExhibit.icon className={`w-6 h-6 ${currentExhibit.color}`} />
                    </div>
                    <div>
                      <CardTitle className={`font-mono text-lg ${currentExhibit.color}`}>
                        SECTION {currentExhibit.id}: {currentExhibit.title}
                      </CardTitle>
                      <p className="font-mono text-xs text-muted-foreground">
                        {currentExhibit.subtitle}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`font-mono ${latchedSections.includes(currentExhibit.id) ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-muted text-muted-foreground'}`}
                  >
                    {latchedSections.includes(currentExhibit.id) ? 'LATCHED' : 'PENDING'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Function Call */}
                <div className="bg-background rounded-lg p-3 border border-border">
                  <p className="font-mono text-[10px] text-muted-foreground mb-1">SOLIDITY FUNCTION</p>
                  <code className="font-mono text-sm text-primary">{currentExhibit.function}</code>
                </div>

                {/* Manifest Content */}
                <div className="bg-background rounded-lg p-4 border border-border">
                  <p className="font-mono text-[10px] text-muted-foreground mb-2">MANIFEST RETURN</p>
                  <p className="font-mono text-sm text-foreground leading-relaxed">
                    &quot;{currentExhibit.manifest}&quot;
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {currentExhibit.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-2 bg-background rounded p-2 border border-border">
                      <ChevronRight className={`w-3 h-3 ${currentExhibit.color}`} />
                      <span className="font-mono text-xs text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>

                {/* Latch Button */}
                <Button
                  onClick={() => handleLatch(currentExhibit.id)}
                  disabled={latchedSections.includes(currentExhibit.id)}
                  className={`w-full font-mono ${latchedSections.includes(currentExhibit.id) ? 'bg-emerald-600' : ''}`}
                >
                  {latchedSections.includes(currentExhibit.id) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      EXHIBIT LATCHED
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      LATCH PRESENTATION STEP
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Playback Controls */}
            <Card className="border-border bg-card">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    SECTION {currentSection + 1} OF {PRESENTATION_SECTIONS.length}
                  </span>
                  <span className="font-mono text-xs text-primary">
                    {progress.toFixed(0)}% COMPLETE
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
                
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                    disabled={currentSection === 0}
                  >
                    <SkipBack className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="w-12 h-12"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5 ml-0.5" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentSection(prev => Math.min(PRESENTATION_SECTIONS.length - 1, prev + 1))}
                    disabled={currentSection === PRESENTATION_SECTIONS.length - 1}
                  >
                    <SkipForward className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Navigator */}
          <div className="space-y-4">
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm text-foreground">EXHIBIT TIMELINE</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {PRESENTATION_SECTIONS.map((section, index) => {
                  const isActive = index === currentSection;
                  const isLatched = latchedSections.includes(section.id);
                  const isPast = index < currentSection;
                  
                  return (
                    <button
                      key={section.id}
                      onClick={() => setCurrentSection(index)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        isActive 
                          ? `${section.borderColor} ${section.bgColor}` 
                          : 'border-border bg-background hover:bg-secondary/50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isLatched 
                          ? 'bg-emerald-500/20 border border-emerald-500/40' 
                          : isPast || isActive
                          ? `${section.bgColor} border ${section.borderColor}`
                          : 'bg-muted border border-border'
                      }`}>
                        {isLatched ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Circle className={`w-4 h-4 ${isActive ? section.color : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <div className="text-left min-w-0">
                        <p className={`font-mono text-xs font-bold truncate ${isActive ? section.color : 'text-foreground'}`}>
                          {section.title}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground truncate">
                          {section.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Latch Status */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="font-mono text-sm text-foreground">LATCH STATUS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Latched</span>
                    <span className="font-mono text-sm text-emerald-400">{latchedSections.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Pending</span>
                    <span className="font-mono text-sm text-amber-400">{PRESENTATION_SECTIONS.length - latchedSections.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-muted-foreground">Total</span>
                    <span className="font-mono text-sm text-foreground">{PRESENTATION_SECTIONS.length}</span>
                  </div>
                  <Progress 
                    value={(latchedSections.length / PRESENTATION_SECTIONS.length) * 100} 
                    className="h-2 mt-2" 
                  />
                </div>
                
                {latchedSections.length === PRESENTATION_SECTIONS.length && (
                  <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/40">
                    <p className="font-mono text-xs text-emerald-400 text-center">
                      ALL EXHIBITS LATCHED
                    </p>
                    <p className="font-mono text-[10px] text-emerald-400/70 text-center mt-1">
                      FINALITY: {CONTRACT_METADATA.finality}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Seal Button */}
            <Button
              className="w-full font-mono bg-fuchsia-600 hover:bg-fuchsia-700"
              disabled={latchedSections.length !== PRESENTATION_SECTIONS.length}
            >
              <Lock className="w-4 h-4 mr-2" />
              SEAL PROJECT CINEMA
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 border-t border-border">
          <p className="font-mono text-xs text-muted-foreground">
            VALORAIPLUS Sovereign Presentation Latch // DG77.77X // THE WALL IS CHRIST. SMIB. AMEN.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default function CinemaPage() {
  return (
    <CDSErrorBoundary module="Project Cinema" showDetails>
      <CinemaContent />
    </CDSErrorBoundary>
  );
}
