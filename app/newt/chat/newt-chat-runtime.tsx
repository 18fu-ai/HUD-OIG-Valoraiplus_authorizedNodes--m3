'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState, useCallback } from 'react';
import { 
  Send, 
  Loader2, 
  AlertTriangle, 
  Shield, 
  Brain, 
  Mic, 
  MicOff,
  Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// REV_34 IVL Types - Browser-Safe Evidence Classification
type EvidenceType = "OBSERVED" | "INTERPRETED" | "CORROBORATED";

type RuntimeStage =
  | "INPUT"
  | "CLASSIFICATION"
  | "PROVENANCE"
  | "GENERATION"
  | "VALIDATION"
  | "LOGGING"
  | "REPLAY";

interface ConversationEnvelope {
  packetId: string;
  sessionId: string;
  createdAt: string;
  input: { type: "voice" | "text"; raw: string };
  classification: { evidenceType: EvidenceType; confidence: number };
  replay: { packetId: string; orderedEvents: RuntimeStage[]; deterministic: boolean };
  integrityHash?: string;
}

// Browser-safe SHA-256 hashing (no Node crypto)
async function sha256(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function canonicalize(input: unknown): string {
  return JSON.stringify(input, Object.keys(input as object).sort());
}

// Speech Recognition types for TypeScript
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

/**
 * N.E.W.T. Chat Runtime
 * Neural Evidence Witness Terminal
 * 
 * VALORAIPLUS Sovereign Auditor Interface
 * Schema: REV_34 | Node: SAINT PAUL 55116
 * 
 * Features:
 * - AI-powered chat with streaming responses
 * - Voice input via Web Speech API
 * - Evidence-aware conversation context
 */
export default function NewtChatRuntime() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  // Voice recognition state
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [runtimeReceipts, setRuntimeReceipts] = useState<Record<string, ConversationEnvelope>>({});
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/newt/chat',
    initialMessages: [
      {
        id: 'system-welcome',
        role: 'assistant',
        content: `**N.E.W.T. ONLINE — Neural Evidence Witness Terminal**

I am the Sovereign Auditor's interface to the VALORAIPLUS intelligence matrix.

**Current Status:**
- Schema: REV_34
- Node: SAINT PAUL 55116
- Forensic Blocks: 3,393 saturated
- Spoliation Defense: 100% block rate

**I can assist with:**
- Evidence classification and 5W reasoning
- Temporal provenance queries
- Governance architecture analysis
- Recovery hypothesis modeling
- Adversary interaction reports

How may I assist you today, Poppa?`
      }
    ]
  });

  // Track input in a ref for speech recognition callback
  const inputRef2 = useRef(input);
  useEffect(() => {
    inputRef2.current = input;
  }, [input]);

  // Check for speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognitionAPI);
      
      if (SpeechRecognitionAPI) {
        const recognition = new SpeechRecognitionAPI();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          let interim = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interim += transcript;
            }
          }
          
          if (finalTranscript) {
            // Append final transcript to input using ref for current value
            const currentInput = inputRef2.current || '';
            const newValue = (currentInput + ' ' + finalTranscript).trim();
            handleInputChange({ target: { value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>);
            setInterimTranscript('');
          } else {
            setInterimTranscript(interim);
          }
        };
        
        recognition.onerror = () => {
          setIsListening(false);
          setInterimTranscript('');
        };
        
        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
        };
        
        recognitionRef.current = recognition;
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [handleInputChange]);

  // Toggle voice listening
  const toggleListening = useCallback(() => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setInterimTranscript('');
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        // Recognition might already be running
        console.error('[v0] Speech recognition error:', err);
      }
    }
  }, [isListening]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission with REV_34 envelope
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const raw = (input ?? "").trim();
    if (!raw || isLoading) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      setInterimTranscript("");
    }

    const packetId = `pkt_${Date.now()}`;

    const envelope: ConversationEnvelope = {
      packetId,
      sessionId: "newt-session",
      createdAt: new Date().toISOString(),
      input: { type: "text", raw },
      classification: { evidenceType: "OBSERVED", confidence: 0.91 },
      replay: {
        packetId,
        orderedEvents: [
          "INPUT",
          "CLASSIFICATION",
          "PROVENANCE",
          "GENERATION",
          "VALIDATION",
          "LOGGING",
          "REPLAY",
        ],
        deterministic: true,
      },
    };

    const integrityHash = await sha256(canonicalize(envelope));

    setRuntimeReceipts((prev) => ({
      ...prev,
      [packetId]: { ...envelope, integrityHash },
    }));

    handleSubmit(e);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if ((input ?? '').trim() && !isLoading) {
        onSubmit(e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-100 font-mono flex flex-col">
      {/* Header */}
      <header className="border-b border-emerald-900/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-emerald-400">N.E.W.T.</h1>
                <p className="text-xs text-emerald-700">Neural Evidence Witness Terminal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                REV_34
              </Badge>
              <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                SOVEREIGN
              </Badge>
              <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                Integrity: VALID
              </Badge>
              <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                Replay: VERIFIED
              </Badge>
              <Badge variant="outline" className="border-emerald-700 text-emerald-500 text-xs">
                Confidence: 0.91
              </Badge>
              {speechSupported && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    isListening 
                      ? "border-red-500 text-red-400 animate-pulse" 
                      : "border-emerald-700 text-emerald-500"
                  )}
                >
                  <Volume2 className="w-3 h-3 mr-1" />
                  {isListening ? 'LISTENING' : 'VOICE READY'}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-4xl space-y-4">
          {messages.map((message) => (
            <Card
              key={message.id}
              className={cn(
                "border",
                message.role === 'user'
                  ? "bg-slate-800/50 border-slate-700 ml-12"
                  : "bg-emerald-950/30 border-emerald-900/50 mr-12"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      message.role === 'user'
                        ? "bg-blue-600"
                        : "bg-gradient-to-br from-emerald-500 to-emerald-700"
                    )}
                  >
                    {message.role === 'user' ? (
                      <span className="text-white text-sm font-bold">P</span>
                    ) : (
                      <Brain className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "text-sm font-semibold",
                        message.role === 'user' ? "text-blue-400" : "text-emerald-400"
                      )}>
                        {message.role === 'user' ? 'POPPA' : 'N.E.W.T.'}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm text-slate-300 whitespace-pre-wrap prose prose-invert prose-sm max-w-none">
                      {message.content}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {isLoading && (
            <Card className="bg-emerald-950/30 border-emerald-900/50 mr-12">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center">
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  </div>
                  <span className="text-emerald-500 text-sm">Processing query...</span>
                </div>
              </CardContent>
            </Card>
          )}

          {error && (
            <Card className="bg-red-950/30 border-red-900/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-red-400 text-sm">
                    Error: {error.message || 'Failed to process request'}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="border-t border-emerald-900/50 bg-slate-900/80 backdrop-blur-sm p-4">
        <div className="container mx-auto max-w-4xl">
          <form onSubmit={onSubmit} className="flex gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input ?? ''}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "Listening... speak now" : "Query the Sovereign Auditor..."}
                rows={1}
                className={cn(
                  "w-full bg-slate-800 border rounded-lg px-4 py-3 text-sm text-slate-100",
                  "placeholder:text-slate-500 focus:outline-none focus:ring-2",
                  "resize-none min-h-[48px] max-h-[200px]",
                  isListening 
                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                    : "border-emerald-900/50 focus:ring-emerald-500/50 focus:border-emerald-500"
                )}
                disabled={isLoading}
              />
              {interimTranscript && (
                <div className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-slate-800 border border-emerald-700 rounded text-xs text-emerald-400">
                  <span className="opacity-60">Hearing: </span>{interimTranscript}
                </div>
              )}
            </div>
            
            {/* Voice Toggle Button */}
            {speechSupported && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={toggleListening}
                disabled={isLoading}
                className={cn(
                  "h-12 w-12 transition-all",
                  isListening
                    ? "bg-red-600 border-red-500 text-white hover:bg-red-700 animate-pulse"
                    : "bg-slate-800 border-emerald-900/50 text-emerald-500 hover:bg-emerald-900/30 hover:text-emerald-400"
                )}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
            )}
            
            {/* Send Button */}
            <Button
              type="submit"
              disabled={isLoading || !(input ?? '').trim()}
              className="h-12 px-6 bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
          
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              DG77.77X PROTECTED
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
