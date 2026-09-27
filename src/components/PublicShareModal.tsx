import React, { useState } from 'react';

interface PublicShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUrl?: string;
  isKioskMode: boolean;
  onToggleKioskMode: () => void;
}

export const PublicShareModal: React.FC<PublicShareModalProps> = ({
  isOpen,
  onClose,
  isKioskMode,
  onToggleKioskMode,
}) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://utsav-durgotsav.app';

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🌺 শুভ শারদীয়া! Explore Kolkata Durga Puja 1431 with Utsav Durgotsav!\n\nCheck live pandal queue radar, book VIP Darshan passes, listen to traditional Dhak rhythms, and ask the Durga Sahayak AI guide:\n${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 flex flex-col gap-4 border border-[#e4beb9]/40">
        <div className="flex items-center justify-between pb-2 border-b border-[#e4beb9]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#91000a]">share</span>
            <h3 className="font-serif text-lg font-bold text-[#1f1928]">
              Public Access & Sharing
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <p className="text-xs text-[#5b403d] leading-relaxed">
          Anyone with this link can access all pages, live pandal radar, ritual schedules, and free VIP pass booking without needing an account.
        </p>

        {/* QR Code preview */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/30">
          <div className="w-32 h-32 bg-white p-2.5 rounded-2xl shadow-sm border border-[#e4beb9]/30 flex items-center justify-center">
            <svg className="w-full h-full text-[#91000a]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
              <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
              <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
              <rect x="40" y="10" width="10" height="20" />
              <rect x="55" y="10" width="10" height="10" />
              <rect x="10" y="40" width="20" height="10" />
              <rect x="40" y="40" width="20" height="20" />
              <rect x="70" y="40" width="20" height="10" />
              <rect x="70" y="60" width="10" height="20" />
              <rect x="40" y="70" width="10" height="20" />
              <rect x="60" y="80" width="30" height="10" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-[#91000a] mt-2">
            Scan to Open on Mobile Device
          </span>
        </div>

        {/* Copy Link input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="flex-1 h-11 px-3.5 rounded-xl bg-[#faf0ff] border border-[#e4beb9]/50 text-xs text-[#1f1928] font-mono select-all"
          />
          <button
            onClick={handleCopy}
            className="h-11 px-4 rounded-xl bg-[#91000a] text-white font-bold text-xs flex items-center gap-1 active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* WhatsApp Share Button */}
        <button
          onClick={handleWhatsAppShare}
          className="w-full h-12 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#1EBE5D] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span>Share via WhatsApp to Friends & Family</span>
        </button>

        {/* Public Kiosk Mode Toggle */}
        <div className="pt-2 border-t border-[#e4beb9]/30 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#1f1928]">Pandal Gate Kiosk Display Mode</p>
            <p className="text-[10px] text-[#5b403d]">Full-screen public kiosk presentation</p>
          </div>
          <button
            onClick={onToggleKioskMode}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              isKioskMode
                ? 'bg-green-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isKioskMode ? 'Kiosk Active' : 'Enable Kiosk'}
          </button>
        </div>
      </div>
    </div>
  );
};
