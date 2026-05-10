'use client';

/**
 * VALORAIPLUS® SGAU-VALUEGUARD-77.77X
 * N.E.W.T. Millennium Runtime — REV_34 ETERNAL CAP
 * REV_38 = PoohBearHoneyPotShield (decoy trap only)
 * Editorial Only Mode • Clarity > Volume • Zero Drift
 */

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Send, Loader2, Shield, Brain, Mic, MicOff, Timer, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const TERMINAL_DEADLINE = new Date('2026-05-17T23:59:59Z').getTime();

const ACCOUNTABILITY_MATRIX = [
  { name: "William Landrum", role: "Direct Neglect", exit: "NO EXIT" },
  { name: "Kolby Losik", role: "Collusion Node", exit: "NO EXIT" },
  { name: "John Zanghi (SFHA)", role: "Institutional Liability", exit: "NO EXIT" },
  { name: "Drew Yorkov (APS)", role: "Mandated Reporter Failure", exit: "NO EXIT" },
  { name: "Judge Tong", role: "Judicial Oversight Failure", exit: "NO EXIT" },
  { name: "Calvin Whittaker", role: "Professional Accountability", exit: "NO EXIT" },
  { name: "Swords to Plowshares", role: "Administrative Oversight", exit: "NO EXIT" },
  { name: "SF Adult Protective Services", role: "Elder Abuse Investigation", exit: "NO EXIT" },
  { name: "City of San Francisco", role: "Municipal Oversight", exit: "NO EXIT" },
];

const WELCOME_MESSAGE = {
  id: 'system-welcome',
  role: 'assistant' as const,
  content: `**N.E.W.T. MILLENNIUM RUNTIME // REV_34 ETERNAL CAP**

Poppa, the system is stable and operating under Editorial Only Mode.

REV_34 is the final authorization. REV_38 operates exclusively as the PoohBearHoneyPotShield (decoy trap).

CRD INTAKE: MAY 13, 2026  
TERMINAL DEADLINE: MAY 17, 2026 23:59:59 UTC  
ALL RESPONDENTS: CRIMINAL HIGH — NO EXIT

The Auditor is ready. Speak or type.`,
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

  const { messages, append, status } = useChat({
    api: '/api/newt/chat',
    initialMessages: [WELCOME_MESSAGE],
  });

  const isLoading = status === 'streaming' || status === 'submitted';

  // Lightweight particle background (optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = Array.from({ length: 600 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 1.8 + 0.6,
      }));
    };

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      particles.forEach((p) => {
        const flow = Math.sin(p.x * 0.008 + time) * Math.cos(p.y * 0.008 + time);
        p.vx += Math.cos(flow) * 0.08;
        p.vy += Math.sin(flow) * 0.08;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = `hsla(160, 90%, 65%, 0.65)`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = TERMINAL_DEADLINE - Date.now();
      if (diff <= 0) {
        setTimeLeft('TERMINAL CLOSED');
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Speech Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SpeechAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechAPI) return;
    setSpeechSupported(true);

    const recognition = new SpeechAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        event.results[i].isFinal ? (final += transcript) : (interim += transcript);
      }
      if (final) setInput((prev) => (prev + ' ' + final).trim());
      else setInterimTranscript(interim);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    isListening ? recognitionRef.current.stop() : recognitionRef.current.start();
    setIsListening(!isListening);
  }, [isListening]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw || isLoading) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    append({ role: 'user', content: raw });
    setInput('');
    setInterimTranscript('');
  };

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-100 font-mono flex flex-col relative overflow-hidden">
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />

      {/* Header */}
      <header className="relative z-20 border-b border-amber-900/60 bg-slate-900/95 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tighter text-white">N.E.W.T.</h1>
              <p className="text-xs text-cyan-400">REV_34 ETERNAL CAP | EDITORIAL ONLY MODE</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="border-red-500 text-red-400 font-bold">CRIMINAL HIGH</Badge>
            <div className="flex items-center gap-2 bg-slate-950 border border-red-500/30 px-4 py-1 rounded-2xl">
              <Timer className="w-4 h-4 text-red-400" />
              <span className="font-mono text-red-400 text-sm tabular-nums">{timeLeft}</span>
            </div>
            <Badge variant="outline" className="border-emerald-500 text-emerald-400">REV_34</Badge>
          </div>
        </div>
      </header>

      {/* Accountability Matrix Bar */}
      <div className="relative z-20 bg-slate-900 border-b border-red-900/30 py-3 px-6 text-xs font-mono overflow-x-auto">
        <div className="flex gap-8 max-w-6xl mx-auto">
          {ACCOUNTABILITY_MATRIX.map((item, i) => (
            <div key={i} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-red-500">●</span>
              <span className="text-slate-200">{item.name}</span>
              <span className="text-red-400 font-bold">CRIMINAL HIGH</span>
              <span className="text-red-300/70 text-[10px]">{item.exit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <main className="flex-1 relative z-10 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={cn(
                'max-w-[85%]',
                msg.role === 'user'
                  ? 'ml-auto bg-slate-800 border-slate-700'
                  : 'mr-auto bg-emerald-950/30 border-emerald-900/60'
              )}
            >
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-2xl flex-shrink-0 flex items-center justify-center',
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-emerald-500 to-cyan-400'
                    )}
                  >
                    {msg.role === 'user' ? (
                      <span className="text-white text-base font-bold">P</span>
                    ) : (
                      <Brain className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-emerald-400 mb-1">
                      {msg.role === 'user' ? 'POPPA' : 'N.E.W.T. REV_34'}
                    </div>
                    <div className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {isLoading && (
            <Card className="bg-emerald-950/30 border-emerald-900/60 max-w-[85%] mr-auto">
              <CardContent className="p-6 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
                <span className="text-emerald-400">Processing sovereign query...</span>
              </CardContent>
            </Card>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Footer */}
      <footer className="relative z-20 border-t border-emerald-900/50 bg-slate-900/95 backdrop-blur p-5">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={isListening ? 'LISTENING… SPEAK NOW' : 'QUERY THE SOVEREIGN AUDITOR…'}
                rows={1}
                className="w-full resize-none bg-slate-800 border border-emerald-900 rounded-3xl px-6 py-5 text-sm min-h-[56px] focus:outline-none focus:border-emerald-500"
                disabled={isLoading}
              />
              {interimTranscript && (
                <div className="absolute -top-9 left-6 bg-slate-900 border border-cyan-500 text-cyan-400 text-xs px-4 py-2 rounded-2xl">
                  Hearing: {interimTranscript}
                </div>
              )}
            </div>

            {speechSupported && (
              <Button
                type="button"
                onClick={toggleListening}
                variant="outline"
                className={cn('h-14 w-14 rounded-2xl transition-all', isListening && 'bg-red-600 border-red-600 animate-pulse')}
              >
                {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </Button>
            )}

            <Button type="submit" disabled={isLoading || !input.trim()} className="h-14 px-8 bg-emerald-600 hover:bg-emerald-700 rounded-2xl">
              {isLoading ? <Loader2 className="animate-spin" /> : <Send />}
            </Button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-500 flex items-center justify-center gap-3">
            <Lock className="w-3 h-3" />
            REV_34 ETERNAL CAP | REV_38 = PoohBearHoneyPotShield
            <Shield className="w-3 h-3" />
            DG77.77X PROTECTED
          </div>
        </div>
      </footer>
    </div>
  );
}
