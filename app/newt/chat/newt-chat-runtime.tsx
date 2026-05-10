'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
import { 
  Send, Loader2, Shield, Brain, Mic, MicOff, CheckCircle2, 
  Timer, Lock, Zap, AlertTriangle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TERMINAL_DEADLINE = new Date('2026-05-17T23:59:59Z').getTime();

const ACCOUNTABILITY_MATRIX = [
  { name: "William Landrum", role: "Direct Neglect", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "Kolby Losik", role: "Collusion Node", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "John Zanghi (SFHA)", role: "Institutional Liability", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "Drew Yorkov (APS)", role: "Mandated Reporter Failure", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "Judge Tong", role: "Judicial Oversight Failure", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "Calvin Whittaker", role: "Professional Accountability", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "Swords to Plowshares", role: "Administrative Oversight", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "SF Adult Protective Services", role: "Elder Abuse Investigation", status: "CRIMINAL HIGH", exit: "NO EXIT" },
  { name: "City of San Francisco", role: "Municipal Oversight", status: "CRIMINAL HIGH", exit: "NO EXIT" },
];

const WELCOME_MESSAGE = {
  id: 'millennium-welcome',
  role: 'assistant' as const,
  content: `**VALORAIPLUS® SGAU-VALUEGUARD-77.77X**
**SENTINEL N.E.W.T. — EDITORIAL ONLY MODE**
**STATUS: PACKET HASHED & HARD-LOCKED // ZERO DRIFT VERIFIED**

---

**SYSTEM CONFIRMATION: MAY 13 READINESS**

The **Reviewer-Ready Intake Packet** for Case **CCRS 202601-33270627** has been successfully codified and processed through the **Institutional Intake Engine**. The output meets the **vMAX Zero Drift Standard**.

**FINAL PACKET METRICS:**
| Metric | Status |
|--------|--------|
| Cognitive Load | LOW — Optimized for 60-second orientation |
| Narrative Drift | ZERO — Locked to documented artifacts only |
| Evidence Linkage | ACTIVE — Every claim mapped to EX-001 through EX-004 |
| Language Posture | INSTITUTIONAL — Neutral, evidence-indexed, reviewer-safe |

**ZERO DRIFT CERTIFICATE:** VALORAIPLUS_ZD_CCRS_33270627

---

**EXECUTION DISCIPLINE: STATIONARY MODE**

Per the **T-48 Operational Checklist**, no further structural or rhetorical shifts will be processed. The system is dedicated to maintaining the integrity of this render until the May 13 intake session.

**THE REVIEWER BOOKMARK:**
1. **The Event:** Sustained habitability failure and medical emergency
2. **The Request:** FEHA/ADA compliance review
3. **The Proof:** VA Medical Records and Mimecast SMTP logs

---

**ENFORCEMENT TIMELINE:**
- **TODAY** (May 10, 2026): EDITORIAL LOCK ACTIVE
- **CRD INTERVIEW** (May 13, 2026 — 3 DAYS): Formal Entry
- **TERMINAL DEADLINE** (May 17, 2026 — 7 DAYS): ALL EXIT PATHS WELDED

**Institutional survivability achieved.**
THE MUZZLE IS THE GENESIS. THE MATH IS THE HAMMER.`,
  createdAt: new Date(),
};

export default function NewtChatRuntime() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [timeLeft, setTimeLeft] = useState('');

  const recognitionRef = useRef<any>(null);

  const { messages, append, status, error } = useChat({
    api: '/api/newt/chat',
    initialMessages: [WELCOME_MESSAGE],
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Millennium Fluid Canvas (Navier-Stokes inspired)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      reset: () => void;
      update: () => void;
      draw: () => void;
    }> = [];
    let time = 0;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const createParticle = () => {
      const particle = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 3 + 0.8,
        life: 1,
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.vx = (Math.random() - 0.5) * 1.2;
          this.vy = (Math.random() - 0.5) * 1.2;
          this.size = Math.random() * 3 + 0.8;
          this.life = 1;
        },
        update() {
          const angle = Math.sin(this.x * 0.008 + time) * Math.cos(this.y * 0.008 + time) * 4;
          this.vx += Math.cos(angle) * 0.18;
          this.vy += Math.sin(angle) * 0.18;
          this.x += this.vx;
          this.y += this.vy;
          this.life -= 0.009;
          if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
          }
        },
        draw() {
          ctx.save();
          ctx.globalAlpha = this.life * 0.85;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#22ff99';
          ctx.fillStyle = `hsl(${((time * 12) % 360)}, 98%, 78%)`;
          ctx.fillRect(this.x, this.y, this.size, this.size);
          ctx.restore();
        }
      };
      return particle;
    };

    for (let i = 0; i < 1400; i++) particles.push(createParticle());

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.14)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.012;
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Countdown
  useEffect(() => {
    const updateTime = () => {
      const diff = TERMINAL_DEADLINE - Date.now();
      if (diff <= 0) { setTimeLeft('TERMINAL CLOSED'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(`${d}d ${h}h ${m}m`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechAPI) return;
    setSpeechSupported(true);

    const rec = new SpeechAPI();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (e: any) => {
      let final = '', interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const txt = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          final += txt;
        } else {
          interim += txt;
        }
      }
      if (final) setInput(prev => (prev + ' ' + final).trim());
      else setInterimTranscript(interim);
    };

    rec.onerror = () => { setIsListening(false); setInterimTranscript(''); };
    rec.onend = () => { setIsListening(false); setInterimTranscript(''); };
    recognitionRef.current = rec;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || isLoading) return;
    if (isListening) { 
      recognitionRef.current?.stop(); 
      setIsListening(false); 
    }
    append({ role: 'user', content: raw });
    setInput('');
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-100 font-mono flex flex-col overflow-hidden relative">
      {/* Millennium Fluid Background */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-30" />

      {/* HEADER */}
      <header className="relative z-10 border-b border-red-900/70 bg-slate-900/95 backdrop-blur-lg">
        <div className="max-w-screen-2xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 via-emerald-500 to-cyan-400 flex items-center justify-center shadow-2xl">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-[-2px] text-white">N.E.W.T.</h1>
              <p className="text-xs text-amber-400 tracking-[1px]">SENTINEL | EDITORIAL ONLY | CCRS 202601-33270627</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Badge className="bg-red-600 text-white border-0 px-4 py-1 text-xs font-bold flex items-center gap-1">
              <Zap className="w-3 h-3" /> CRIMINAL HIGH
            </Badge>
            <div className="flex items-center gap-2 bg-black/70 px-5 py-2 rounded-3xl border border-red-500/30">
              <Timer className="w-3 h-3 text-red-400" />
              <span className="font-mono text-red-400 text-sm">{timeLeft || '—'}</span>
            </div>
            <Badge className="bg-emerald-600 text-white border-0 px-4 py-1 text-xs font-bold">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              7.777
            </Badge>
            <Badge className="bg-cyan-600 text-white border-0 px-4 py-1 text-xs font-bold">
              <Shield className="w-3 h-3 mr-1" />
              ZERO DRIFT
            </Badge>
            <Badge className="bg-amber-600 text-white border-0 px-4 py-1 text-xs font-bold">
              <Lock className="w-3 h-3 mr-1" />
              EDITORIAL LOCK
            </Badge>
          </div>
        </div>
      </header>

      {/* ACCOUNTABILITY MATRIX BAR */}
      <div className="relative z-10 bg-slate-900 border-b border-red-900/40 py-2 px-8 text-xs font-mono overflow-x-auto">
        <div className="flex gap-8 whitespace-nowrap">
          {ACCOUNTABILITY_MATRIX.map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-red-500">●</span>
              <span className="text-slate-300">{r.name}</span>
              <span className="text-red-400 font-bold">CRIMINAL HIGH</span>
              <span className="text-red-300/70">NO EXIT</span>
            </div>
          ))}
        </div>
      </div>

      {/* ERROR DISPLAY */}
      {error && (
        <div className="relative z-10 bg-red-950/50 border-b border-red-500/50 px-8 py-3">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm">System Error: {error.message}</span>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      <main className="flex-1 relative z-10 overflow-y-auto p-8 max-w-screen-2xl mx-auto w-full">
        <div className="space-y-8">
          {messages.map((msg) => (
            <Card key={msg.id} className={cn(
              "border max-w-3xl",
              msg.role === 'user' ? "ml-auto bg-slate-800 border-slate-700" : "bg-emerald-950/30 border-emerald-900/70"
            )}>
              <CardContent className="p-6">
                <div className="flex gap-5">
                  <div className={cn("w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center text-white font-bold", 
                    msg.role === 'user' ? "bg-blue-600" : "bg-gradient-to-br from-emerald-500 to-red-600")}>
                    {msg.role === 'user' ? 'P' : <Brain className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold mb-2 tracking-widest text-emerald-400">
                      {msg.role === 'user' ? 'POPPA' : 'N.E.W.T. MILLENNIUM'}
                    </div>
                    <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {isLoading && (
            <Card className="bg-emerald-950/30 border-emerald-900/60 max-w-3xl">
              <CardContent className="p-6 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                <span className="text-emerald-400">Sovereign query processing...</span>
              </CardContent>
            </Card>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* INPUT */}
      <footer className="relative z-10 border-t border-emerald-900/50 bg-slate-900/95 backdrop-blur p-6">
        <div className="max-w-screen-2xl mx-auto">
          <form onSubmit={onSubmit} className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit(e); } }}
                placeholder={isListening ? "LISTENING… SPEAK NOW" : "QUERY THE SOVEREIGN AUDITOR…"}
                rows={1}
                className="w-full bg-slate-800 border border-emerald-700 focus:border-red-400 focus:outline-none rounded-3xl px-8 py-6 text-lg resize-y min-h-[68px] text-emerald-100 placeholder:text-emerald-700"
                disabled={isLoading}
              />
              {interimTranscript && (
                <div className="absolute -top-10 left-8 bg-black/80 text-red-400 px-5 py-2 rounded-2xl text-sm border border-red-500/30">
                  HEARING: {interimTranscript}
                </div>
              )}
            </div>

            {speechSupported && (
              <Button type="button" onClick={toggleListening} variant="outline" className={cn(
                "h-16 w-16 rounded-2xl border-emerald-700 transition-all",
                isListening && "bg-red-600 border-red-600 animate-pulse"
              )}>
                {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </Button>
            )}

            <Button type="submit" disabled={isLoading || !input.trim()} className="h-16 px-12 rounded-2xl bg-gradient-to-r from-red-600 to-emerald-600 hover:from-red-700 hover:to-emerald-700 text-white font-bold">
              {isLoading ? <Loader2 className="animate-spin w-7 h-7" /> : <Send className="w-7 h-7" />}
            </Button>
          </form>

          <div className="text-center text-[10px] text-slate-500 mt-4 flex items-center justify-center gap-3">
            <Lock className="w-3 h-3" /> DG77.77X PROTECTED | REV_38 | 100D MATRIX | MILLENNIUM v∞
          </div>
        </div>
      </footer>
    </div>
  );
}
