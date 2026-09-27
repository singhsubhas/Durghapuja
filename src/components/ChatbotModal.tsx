import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types/festival';
import { pujaAudio } from '../utils/audioSynth';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "🌺 **শুভ শারদীয়া • Subho Sharadiya!**\n\nI am **Durga Sahayak** (দুর্গা সহায়ক), your personal AI festival guide for Kolkata & Global Durga Puja.\n\nI can help you with:\n- **Live Queue Radar** & shortest wait-time pandals\n- **VIP Fast-Track Pass Booking**\n- **Sacred Ritual Timings** (Pushpanjali, Sandhi Puja, Sindoor Khela)\n- **Overnight Metro routes & Pandal Hopper Trails**\n- **Ananda Mela & Bhog Ordering**\n\nWhat can I assist your festival journey with today?",
      timestamp: 'Just now',
      suggestions: [
        'Which pandals have under 20m queue?',
        'Pushpanjali & Sandhi Puja timing?',
        'How to get a VIP Darshan Pass?',
        'Best metro route for South Kolkata?',
        'Where is live Dhunuchi Naach tonight?',
      ],
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      pujaAudio.playKanshi();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: data.reply || "Subho Sharadiya! May Maa Durga's divine presence bring peace to you.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      // Client-side fallback response
      let fallbackText = "🌺 **Subho Sharadiya!**\n\n";
      const lower = text.toLowerCase();
      if (lower.includes('queue') || lower.includes('wait') || lower.includes('crowd')) {
        fallbackText += "⚡ **Live Queue Radar Update:**\n- **Tridhara Sammilani:** ~10 min wait (Kalighat Metro)\n- **Ballygunge Cultural:** ~15 min wait\n- **Ekdalia Evergreen:** ~25 min wait\n- **Mohammad Ali Park:** Fast moving (~12m)\n- **Sree Bhumi Sporting:** ~50 min wait (VIP Pass Gate Active)\n\n💡 *Tip: Best darshan window is between 1:30 PM and 4:30 PM before evening rush!*";
      } else if (lower.includes('pass') || lower.includes('vip') || lower.includes('ticket')) {
        fallbackText += "🎫 **Utsav VIP & Darshan Pass Points:**\nYou can generate an instant digital **VIP Fast-Track Pass** or **Senior Citizen Sakha Pass** with QR code right now in the 'Passes' tab of this app!";
      } else if (lower.includes('ritual') || lower.includes('pushpanjali') || lower.includes('sandhi')) {
        fallbackText += "🙏 **Auspicious Ritual Timings:**\n- **Maha Ashtami Pushpanjali:** 09:30 AM & 10:30 AM\n- **Sandhi Puja (108 lotuses & 108 diyas):** 07:48 PM – 08:36 PM\n- **Sandhya Aarti & Dhunuchi:** 07:30 PM\n- **Kumari Puja:** 11:00 AM at Belur Math.";
      } else {
        fallbackText += "I am here to guide your pandal hopping, ritual schedules, and pass bookings! Feel free to ask about queue wait-times, nearest metro stations, or Mahabhog timings.";
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'fallback',
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg h-[85vh] max-h-[720px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#e4beb9]/40">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#795700] text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-[#ffdea5]/40 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">smart_toy</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif text-base font-bold text-white leading-tight">
                  Durga Sahayak AI
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#ffdea5] text-[#5c4100] uppercase">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-[11px] text-[#ffdad6] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live Puja Companion & Navigation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
            title="Close Assistant"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 bg-[#fef7ff]/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-[#91000a] text-white rounded-br-none'
                    : 'bg-white text-[#1f1928] border border-[#e4beb9]/40 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line prose-xs">
                  {m.text}
                </div>

                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    m.role === 'user' ? 'text-white/70' : 'text-[#5b403d]/70'
                  }`}
                >
                  <span>{m.timestamp}</span>
                </div>
              </div>

              {/* Suggestions chips if assistant */}
              {m.suggestions && m.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                  {m.suggestions.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(s)}
                      className="px-2.5 py-1 rounded-full bg-[#faf0ff] hover:bg-[#ffdad6] text-[#91000a] text-[11px] font-bold border border-[#e4beb9]/40 transition-colors shadow-2xs text-left"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-[#e4beb9]/40 shadow-sm max-w-[200px]">
              <span className="w-2 h-2 rounded-full bg-[#91000a] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#fe851f] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#795700] animate-bounce [animation-delay:0.4s]" />
              <span className="text-xs text-[#5b403d] font-bold ml-1">Consulting radar...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#e4beb9]/40 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about pandal queues, rituals, metro route..."
              className="flex-1 h-11 px-4 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/40 text-xs sm:text-sm text-[#1f1928] placeholder-[#5b403d]/60 focus:outline-none focus:ring-2 focus:ring-[#91000a]"
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#91000a] to-[#fe851f] text-white flex items-center justify-center disabled:opacity-50 transition-all shadow-md active:scale-95 shrink-0"
              title="Send Message"
            >
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </form>

          {/* Quick tab jump links */}
          {onNavigateToTab && (
            <div className="flex items-center justify-around pt-2 text-[10px] text-[#5b403d]">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToTab('passes');
                }}
                className="hover:text-[#91000a] font-bold"
              >
                🎫 Book VIP Pass
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToTab('pandals');
                }}
                className="hover:text-[#91000a] font-bold"
              >
                📡 Queue Radar
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToTab('rituals-bhog');
                }}
                className="hover:text-[#91000a] font-bold"
              >
                🍲 Bhog Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
