import React, { useState } from 'react';

interface HeaderProps {
  activeTab: string;
  onOpenNotifications: () => void;
  onOpenShareModal: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenNotifications,
  onOpenShareModal,
  unreadCount = 2,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Tab label display
  const getTabLabel = () => {
    switch (activeTab) {
      case 'home':
        return 'Home';
      case 'pandals':
        return 'Pandals';
      case 'passes':
        return 'VIP Passes & Points';
      case 'rituals-bhog':
        return 'Rituals & Bhog';
      case 'cultural':
        return 'Cultural & Dhak';
      default:
        return 'Home';
    }
  };

  return (
    <header className="fixed top-0 w-full z-40 bg-[#fef7ff]/95 backdrop-blur-xl border-b border-[#e4beb9]/30 shadow-[0_4px_20px_-4px_rgba(183,28,28,0.10)]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative flex items-center justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSyDGO5q_tfBNufWHsYFac55vQKtvUIQjvecGXurmDbMgK5cjHUvwr_NLcZfUDz8XxPwWBqDe2LAcCQwt0wASGsgRtSc83sCNKTEXr4zlnLNB631_tdHaJUIVoY3YvwymmoTf3y-yfDsR6CGxR566rBh5CA9UmaevEQ7uclZOFHJwPXpY2oARBX1QHY1LEDpAcWz4ujuUB0OKbT-EM6xHM169j7U5QowNPaNw0z7mm770OWY9KKY7t"
              alt="Utsav Durga Emblem Logo"
              className="h-9 w-auto object-contain transition-transform hover:scale-105"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl text-[#91000a] tracking-tight leading-none">
                Utsav Durgotsav
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#ffdad6] text-[#93000b] uppercase tracking-wider">
                1431
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-widest text-[#964900] font-bold">
              {getTabLabel()}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          {/* Public Access & Share Button */}
          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#91000a] bg-[#91000a]/10 hover:bg-[#91000a]/15 transition-colors border border-[#91000a]/20"
            title="Public Share & Access"
          >
            <span className="material-symbols-outlined text-[17px]">share</span>
            <span className="hidden md:inline">Share App</span>
          </button>

          {/* Notifications button */}
          <button
            onClick={onOpenNotifications}
            aria-label="Ritual and Queue Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-[#5b403d] hover:text-[#91000a] hover:bg-[#faf0ff] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#fe851f] ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Devotee Profile avatar */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center justify-center p-0.5 rounded-full bg-gradient-to-tr from-[#fe851f] via-[#f7bd43] to-[#b71c1c] shadow-sm hover:scale-105 transition-transform"
              title="Festival Profile"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzrec6SnzmGKgCQQq8wRJ7OJsGPdw7YSkgNrM5Bd89ZcZu09LLfrXrKoltoLiLFIbrID8Z00vn5xoI36DD4EMGpIagYaypM0esTrWhp3DWoJPdf0mc5PkUxNGCi-E_NLhkBc9TgYy1ofN1pKbtbtac5gWu9gkOm3Fm8TzFyXw_SXMyiBECg7oT29YYRfqc3e4IjsBD5vNzgmovuVOFTOt_Koyg7kwepf0y_aRANY16sM3KewjDIG1V"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e4beb9]/40 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-[#e4beb9]/30">
                  <p className="text-sm font-bold text-[#1f1928]">Devotee Account</p>
                  <p className="text-xs text-[#5b403d]">Devotee ID: UTSAV-8291</p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#ffdcc7] text-[#723600]">
                    Darshan Hopper Pass Active
                  </span>
                </div>
                <div className="py-1 text-xs">
                  <div className="px-3 py-2 text-[#5b403d] flex items-center justify-between">
                    <span>Language</span>
                    <span className="font-bold text-[#91000a]">English • বাংলা</span>
                  </div>
                  <div className="px-3 py-2 text-[#5b403d] flex items-center justify-between">
                    <span>City</span>
                    <span className="font-bold text-[#1f1928]">Kolkata (West Bengal)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
