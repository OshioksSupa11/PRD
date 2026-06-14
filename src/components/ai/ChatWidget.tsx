'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { generateResponse, quickQuestions } from '@/lib/chat-responses';
import type { ChatMessage } from '@/lib/chat-responses';
import { cn } from '@/lib/utils';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Godsgrace's portfolio assistant. Ask me about certifications, projects, experience, or how to get in touch.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    trackEvent(AnalyticsEvents.AI_QUESTION_ASKED, { question: text.substring(0, 100) });

    setTimeout(() => {
      const response = generateResponse(text);
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggleOpen = useCallback(() => {
    if (!isOpen) {
      trackEvent(AnalyticsEvents.AI_CHAT_OPEN);
    }
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleOpen}
        className={cn(
          'fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300',
          isOpen
            ? 'bg-bg border border-border text-text-muted'
            : 'bg-accent text-white hover:bg-accent-light'
        )}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl border border-border bg-bg shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: '520px' }}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <Sparkles className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">
                  Portfolio Assistant
                </h3>
                <p className="text-xs text-text-muted">Ask me anything</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex',
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap',
                      msg.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-bg-alt text-text'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-xl bg-bg-alt px-4 py-3">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="inline-flex rounded-full border border-border bg-bg px-3 py-1.5 text-xs text-text-muted hover:text-text hover:border-accent/30 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-border px-4 py-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-lg border border-border bg-bg-alt px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Send"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
