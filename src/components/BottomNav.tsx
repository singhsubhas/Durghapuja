import React from 'react';

interface BottomNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  hopperCount?: number;
  onOpenHopperTrail?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  hopperCount = 0,
}) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: 'temple_hindu',
    },
    {
      id: 'pandals',
      label: 'Pandals',
      icon: 'explore',
      badge: hopperCount > 0 ? `${hopperCount}` : undefined,
    },
    {
      id: 'passes',
      label: 'Passes',
      icon: 'confirmation_number',
      tag: 'VIP',
    },
    {
      id: 'rituals-bhog',
      label: 'Rituals & Bhog',
      icon: 'local_fire_department',
    },
    {
      id: 'cultural',
      label: 'Cultural',
      icon: 'festival',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#e4beb9]/30 shadow-[0_-4px_24px_rgba(26,20,35,0.08)] pb-[calc(env(safe-area-inset-bottom,0px))]">
      <div className="max-w-md md:max-w-xl mx-auto flex items-center justify-around h-18 px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`group relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all select-none ${
                isActive
                  ? 'text-[#91000a] font-bold'
                  : 'text-[#5b403d] hover:text-[#91000a]'
              }`}
            >
              <div
                className={`relative w-12 h-7 flex items-center justify-center rounded-full transition-all ${
                  isActive ? 'bg-[#91000a]/12 text-[#91000a]' : 'group-hover:bg-[#faf0ff]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[22px] transition-transform group-active:scale-90"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>

                {item.badge && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#fe851f] text-white text-[10px] font-bold shadow-sm">
                    {item.badge}
                  </span>
                )}
                {item.tag && !item.badge && (
                  <span className="absolute -top-1 -right-1.5 px-1 py-0.2 rounded-full bg-[#ffdad6] text-[#93000b] text-[9px] font-extrabold uppercase">
                    {item.tag}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs tracking-tight leading-tight mt-1 text-center font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
