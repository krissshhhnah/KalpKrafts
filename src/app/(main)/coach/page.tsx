'use client';

import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello there! I'm your KalpKrafts AI Mentor. I won't write the code for you, but I'll guide you step-by-step so you can learn and solve complex problems like a Senior Engineer. What are we working on today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real app, this calls /api/chat. Here we mock realistic AI responses.
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "That's a classic problem! Before we jump into the exact code, let's think about the approach. What data structure allows us to look up previously seen numbers in O(1) time? \n\n*Hint: It uses key-value pairs.*",
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex mt-[-10px] pb-4">
      <div className="flex-1 glass-panel rounded-lg flex flex-col shadow-lg overflow-hidden relative">
        {/* Subtle glow */}
        <div className="absolute top-0 right-0 w-96 h-96 glow-ray pointer-events-none opacity-20"></div>

        <div className="p-4 border-b border-surface-border bg-canvas/30 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded border border-primary/30 flex items-center justify-center bg-surface-hover shadow-inner">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">AI Engineer Coach</h2>
              <p className="text-[11px] text-primary flex items-center gap-1 font-medium tracking-wide uppercase">
                <Sparkles className="w-3 h-3" /> Senior Developer Mode
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6 relative z-10 scrollbar-thin">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded bg-surface border border-surface-border flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-gray-400" />
                </div>
              )}
              
              <div className={`max-w-[75%] p-4 text-[13px] leading-relaxed shadow-sm border ${
                msg.role === 'user' 
                  ? 'bg-primary/10 border-primary/20 text-blue-50 rounded-lg rounded-tr-sm' 
                  : 'bg-surface-hover/80 border-surface-border text-gray-300 rounded-lg rounded-tl-sm whitespace-pre-wrap'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded bg-surface border border-surface-border flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded bg-surface border border-surface-border flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-surface-hover/80 border border-surface-border p-4 rounded-lg rounded-tl-sm flex gap-1 items-center h-10">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-canvas border-t border-surface-border relative z-10">
          <form onSubmit={handleSend} className="relative w-full mx-auto">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for reasoning, time complexity analysis, or systems design tips..."
              className="w-full bg-surface-hover border border-surface-border rounded-md pl-4 pr-16 py-3.5 min-h-[50px] max-h-32 text-[13px] text-gray-200 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-all resize-none font-mono placeholder:font-sans"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-3 bottom-3 p-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex justify-between items-center mt-2 px-2">
            <span className="text-[11px] text-gray-500 font-mono">Shift + Enter for new line</span>
            <span className="text-[11px] text-gray-500">Mentorship mode active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
