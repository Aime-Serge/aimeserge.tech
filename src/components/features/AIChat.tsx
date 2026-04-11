"use client";

import { useChat } from '@ai-sdk/react';
import { Bot, X, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/security/headers';
import { useRouter } from 'next/navigation';

const SUGGESTIONS = [
  "Show me your projects",
  "Go to your resume",
  "How do you handle cloud security?",
  "Navigate to contact page"
];

const FOLLOW_UP_SUGGESTIONS: Record<string, string[]> = {
  "projects": ["Tell me about Urban Transport project", "What technologies did you use?", "Go to projects page"],
  "security": ["Show me your security certifications", "How do you implement Zero Trust?", "What is HSTS?"],
  "cloud": ["Which cloud providers do you use?", "Do you use Kubernetes?", "Show me Cloud projects"],
  "contact": ["What is your LinkedIn?", "Send me to the contact form"],
};

// Web Speech API Types
interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  start: () => void;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

/**
 * Voice Visualizer Component
 * Provides real-time haptic/visual feedback during voice input and processing.
 */
function VoiceVisualizer({ isActive, isProcessing }: { isActive: boolean; isProcessing?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let audioContext: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;

    const startAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);

        const draw = () => {
          animationRef.current = requestAnimationFrame(draw);
          analyser.getByteFrequencyData(dataArray);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;
            if (isProcessing) {
              const pulse = Math.sin(Date.now() / 100) * 10 + 20;
              barHeight = pulse;
              ctx.fillStyle = `rgba(16, 185, 129, ${barHeight / 50})`;
            } else {
              ctx.fillStyle = `rgba(6, 182, 212, ${barHeight / 100})`;
            }
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
          }
        };
        draw();
      } catch (err) {
        console.error("Visualizer audio access denied:", err);
      }
    };

    startAudio();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContext) audioContext.close();
    };
  }, [isActive, isProcessing]);

  return <canvas ref={canvasRef} width="100" height="30" className={cn("opacity-80 transition-opacity", isProcessing ? "animate-pulse" : "")} />;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [lastFollowUps, setLastFollowUps] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  const { messages, input, setInputValue, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: '/api/v1/ai/chat',
    maxSteps: 5,
    body: {
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
    },
    onFinish: (message) => {
      if (isSpeaking && typeof window !== 'undefined' && 'speechSynthesis' in window && message.content) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(message.content);
        window.speechSynthesis.speak(utterance);
      }

      if (message.toolCalls) {
        for (const toolCall of message.toolCalls) {
          if (toolCall.toolName === 'navigateTo') {
            const { path } = toolCall.args as { path: string };
            router.push(path);
          }
        }
      }

      const content = message.content.toLowerCase();
      let foundFollowUps: string[] = [];
      if (content.includes("project")) foundFollowUps = FOLLOW_UP_SUGGESTIONS.projects;
      else if (content.includes("security") || content.includes("protect")) foundFollowUps = FOLLOW_UP_SUGGESTIONS.security;
      else if (content.includes("cloud") || content.includes("aws") || content.includes("gcp")) foundFollowUps = FOLLOW_UP_SUGGESTIONS.cloud;
      else if (content.includes("contact") || content.includes("reach")) foundFollowUps = FOLLOW_UP_SUGGESTIONS.contact;
      
      setLastFollowUps(foundFollowUps.slice(0, 3));
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    setLastFollowUps([]);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const toggleListening = useCallback(() => {
    if (typeof window === 'undefined') return;

    const win = window as unknown as WindowWithSpeech;
    const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
    
    if (!SpeechRecognitionClass) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
    };

    recognition.start();
  }, [isListening, setInputValue]);

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg transition-all duration-300 hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Bot className="h-6 w-6" />
      </button>

      <div
        role="dialog"
        aria-label="AI Assistant Chat"
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-[550px] w-[350px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:w-[400px]",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Digital Twin Node</h3>
              <p className="text-[10px] text-slate-500 font-mono">ENCRYPTED_SESSION :: SECURE</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-red-400"
              title="Clear Conversation"
            >
              <Bot className="h-4 w-4 rotate-180" />
            </button>
            <button
              onClick={() => setIsSpeaking(!isSpeaking)}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              title={isSpeaking ? "Mute AI" : "Unmute AI"}
            >
              {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
              <Bot className="mb-3 h-10 w-10 opacity-30" />
              <p className="text-sm mb-6">Aime Serge's Digital Twin.<br/>Secure by design. AI-powered responses.</p>
              
              <div className="grid grid-cols-1 gap-2 w-full max-w-[280px]">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-500/50 hover:bg-slate-800 hover:text-cyan-400 text-left"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "mb-4 flex w-full max-w-[85%]",
                m.role === 'user' ? "ml-auto justify-end" : "mr-auto justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                  m.role === 'user'
                    ? "bg-cyan-600 text-white rounded-br-sm"
                    : "bg-slate-800 text-slate-200 rounded-bl-sm border border-slate-700"
                )}
              >
                {m.content}
                {m.toolCalls?.map((tc) => (
                  tc.toolName === 'navigateTo' && (
                    <div key={tc.toolCallId} className="mt-2 border-t border-slate-700 pt-2 text-[10px] italic text-cyan-400">
                      Executing Navigation: { (tc.args as any).path }
                    </div>
                  )
                ))}
              </div>
            </div>
          ))}
          
          {!isLoading && lastFollowUps.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2 justify-start animate-in fade-in slide-in-from-bottom-2">
              {lastFollowUps.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestionClick(s)}
                  className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 text-[10px] text-cyan-400 transition hover:bg-cyan-500/10 hover:border-cyan-500/40"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="mb-4 flex w-full max-w-[85%] justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-slate-700 bg-slate-800 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]"></span>
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-400"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-slate-900/50 px-4 py-1 border-t border-slate-800/50">
          <p className="text-[9px] text-slate-600 text-center uppercase tracking-tighter">
            Responsible AI: Session Data is transient and never stored. PII is redacted.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border-t border-slate-800 bg-slate-900/80 p-3">
          <div className="relative flex items-center gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={cn(
                "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition overflow-hidden",
                isListening 
                  ? "bg-red-500/10 text-red-500 ring-2 ring-red-500/50" 
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              )}
              title={isListening ? "Stop Listening" : "Voice Input"}
            >
              {isListening ? <MicOff className="h-4 w-4 z-10" /> : <Mic className="h-4 w-4" />}
            </button>
            <div className="relative flex-1 flex items-center">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder={isListening ? "Listening..." : isLoading ? "Thinking..." : "Query the system..."}
                className="w-full rounded-full border border-slate-700 bg-slate-800 py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              />
              {(isListening || isLoading) && (
                <div className="absolute right-12 pr-2">
                  <VoiceVisualizer isActive={isListening || isLoading} isProcessing={isLoading} />
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading || !input?.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white transition hover:bg-cyan-500 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
