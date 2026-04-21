"use client";

import { useChat } from '@ai-sdk/react';
import { Bot, X, Send } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/security/headers';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/v1/ai/chat',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg transition-all duration-300 hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(8,145,178,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <Bot className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:w-[400px]",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-8 opacity-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">AI Assistant Node</h3>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                </span>
                Online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-slate-900 scrollbar-thumb-slate-700">
          {messages.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-500">
              <Bot className="mb-3 h-10 w-10 opacity-30" />
              <p className="text-sm">Connection Established.<br/>Ask me about Aime&apos;s experience, architecture, or skills.</p>
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
              </div>
            </div>
          ))}
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

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="border-t border-slate-800 bg-slate-900/80 p-3">
          <div className="relative flex items-center">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Query the system..."
              className="w-full rounded-full border border-slate-700 bg-slate-800 py-2.5 pl-4 pr-12 text-sm text-white placeholder-slate-400 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input?.trim()}
              className="absolute right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600 text-white transition hover:bg-cyan-500 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
