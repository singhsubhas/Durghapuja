import React, { useState, useMemo } from 'react';
import { Pandal } from '../types/festival';

interface PandalsPageProps {
  pandals: Pandal[];
  onSelectPandal: (pandal: Pandal) => void;
  selectedHopperIds: Set<string>;
  onToggleHopper: (pandalId: string) => void;
  onOpenHopperTrail: () => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (pandalId: string) => void;
  initialViewMode?: 'list' | 'radar';
}

export const PandalsPage: React.FC<PandalsPageProps> = ({
  pandals,
  onSelectPandal,
  selectedHopperIds,
  onToggleHopper,
  onOpenHopperTrail,
  bookmarkedIds,
  onToggleBookmark,
  initialViewMode = 'list',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'radar'>(initialViewMode);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Available zones
  const zones = ['All', 'South Kolkata', 'North Kolkata', 'Central Kolkata'];

  // Filtered pandals
  const filteredPandals = useMemo(() => {
    return pandals.filter((p) => {
      const matchesZone = selectedZone === 'All' || p.zone === selectedZone;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.bengaliName.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q) ||
        p.location.address.toLowerCase().includes(q) ||
        p.location.metroStation.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesZone && matchesSearch;
    });
  }, [pandals, selectedZone, searchQuery]);

  const handleVoiceSearch = () => {
    setIsVoiceActive(true);
    // Simulate voice search feedback
    setTimeout(() => {
      setIsVoiceActive(false);
      setSearchQuery('Kalighat');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* 1. Search Bar (Matches Image 5) */}
      <div className="px-4 sm:px-6">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#5b403d] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by pandal, theme, or locality..."
            className="w-full h-12 pl-10 pr-11 rounded-2xl bg-white border border-[#e4beb9]/50 shadow-sm text-sm text-[#1f1928] placeholder-[#5b403d]/60 focus:outline-none focus:ring-2 focus:ring-[#91000a] focus:border-transparent transition-all"
          />
          <button
            onClick={handleVoiceSearch}
            className={`absolute right-2.5 w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isVoiceActive ? 'bg-[#91000a] text-white animate-pulse' : 'text-[#5b403d] hover:bg-[#faf0ff]'
            }`}
            title="Voice Search"
          >
            <span className="material-symbols-outlined text-[19px]">mic</span>
          </button>
        </div>
      </div>

      {/* 2. Zone Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 sm:px-6 py-3 no-scrollbar">
        {zones.map((zone) => {
          const isSelected = selectedZone === zone;
          return (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                isSelected
                  ? 'bg-[#91000a] text-white ring-2 ring-[#91000a]/20'
                  : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
              }`}
            >
              {zone === 'All' ? '‹ All Pandals' : zone}
            </button>
          );
        })}
      </div>

      {/* 3. Subheader: Live Puja Queue Radar + View Toggle */}
      <div className="px-4 sm:px-6 flex items-center justify-between mt-1 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#fe851f] animate-ping" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#964900]">
            Live Puja Queue Radar
          </span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center p-0.5 rounded-xl bg-white border border-[#e4beb9]/40 shadow-sm">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-[#91000a] text-white shadow-sm'
                : 'text-[#5b403d] hover:text-[#91000a]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">list</span>
            <span>List</span>
          </button>
          <button
            onClick={() => setViewMode('radar')}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'radar'
                ? 'bg-[#91000a] text-white shadow-sm'
                : 'text-[#5b403d] hover:text-[#91000a]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">radar</span>
            <span>Radar</span>
          </button>
        </div>
      </div>

      {/* 4. Radar View Mode */}
      {viewMode === 'radar' && (
        <div className="px-4 sm:px-6 mb-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#1a1423] to-[#342d3e] text-white shadow-lg border border-[#ffdea5]/30">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <p className="text-xs text-[#ffdea5] uppercase font-bold tracking-wider">
                  Real-Time Queue Heatmap
                </p>
                <h3 className="font-serif text-lg font-bold text-white">
                  Congestion Monitor
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold">
                Updated 1m ago
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-3 rounded-xl bg-green-950/50 border border-green-500/30">
                <span className="text-[10px] uppercase font-bold text-green-300">Fast Moving (&lt;15m)</span>
                <p className="text-xl font-bold text-white mt-1">4 Pandals</p>
                <span className="text-[10px] text-green-200">Tridhara, Ballygunge</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/50 border border-amber-500/30">
                <span className="text-[10px] uppercase font-bold text-amber-300">Moderate (15-30m)</span>
                <p className="text-xl font-bold text-white mt-1">5 Pandals</p>
                <span className="text-[10px] text-amber-200">Ekdalia, Ahiritola</span>
              </div>
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30">
                <span className="text-[10px] uppercase font-bold text-red-300">High (&gt;35m)</span>
                <p className="text-xl font-bold text-white mt-1">3 Pandals</p>
                <span className="text-[10px] text-red-200">Sree Bhumi, Suruchi</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Pandal Cards Feed (Matches Image 5) */}
      <div className="px-4 sm:px-6 flex flex-col gap-5">
        {filteredPandals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl p-6 border border-[#e4beb9]/30">
            <span className="material-symbols-outlined text-4xl text-[#91000a]/50">travel_explore</span>
            <p className="font-serif text-lg font-bold text-[#1f1928] mt-2">No Pandals Found</p>
            <p className="text-xs text-[#5b403d] mt-1">Try adjusting your search terms or zone filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedZone('All');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#91000a] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPandals.map((p) => {
            const isBookmarked = bookmarkedIds.has(p.id);
            const isInHopper = selectedHopperIds.has(p.id);

            return (
              <div
                key={p.id}
                className="group relative flex flex-col rounded-3xl bg-white overflow-hidden shadow-[0_6px_20px_rgba(26,20,35,0.06)] border border-[#e4beb9]/40 hover:shadow-xl transition-all"
              >
                {/* Hero Image Block */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Left Tag */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md backdrop-blur-md ${
                        p.category === 'Fast-Track Eligible'
                          ? 'bg-[#91000a] text-white flex items-center gap-1'
                          : p.category === 'Eco-Craft'
                          ? 'bg-emerald-800 text-white'
                          : p.category === 'Illumination Wonder'
                          ? 'bg-amber-600 text-white'
                          : 'bg-[#795700] text-[#ffd075]'
                      }`}
                    >
                      {p.category === 'Fast-Track Eligible' && (
                        <span className="material-symbols-outlined text-[13px]">bolt</span>
                      )}
                      {p.category}
                    </span>
                  </div>

                  {/* Top Right Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(p.id);
                    }}
                    aria-label="Bookmark Pandal"
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#91000a] active:scale-90 transition-transform shadow-md hover:bg-[#faf0ff]"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>

                  {/* Rating & Wait Time Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-xs font-bold">
                      <span className="material-symbols-outlined text-[15px] text-[#fe851f]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>{p.rating}</span>
                      <span className="text-white/60 text-[10px]">({p.reviewsCount})</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fe851f] text-white text-xs font-extrabold shadow-md">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span>{p.crowdStatus === 'fast-moving' ? 'Fast Moving' : `${p.waitTimeMinutes} min wait`}</span>
                    </div>
                  </div>
                </div>

                {/* Content Info (Matches Image 5) */}
                <div className="p-4 sm:p-5 flex flex-col gap-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        onClick={() => onSelectPandal(p)}
                        className="font-serif text-xl sm:text-2xl font-bold text-[#1f1928] cursor-pointer hover:text-[#91000a] transition-colors leading-tight"
                      >
                        {p.name}
                      </h3>
                      <p className="text-xs text-[#5b403d] flex items-center gap-1.5 mt-0.5">
                        <span className="material-symbols-outlined text-[14px] text-[#964900]">palette</span>
                        <span>Theme: {p.theme}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-[#91000a] block">
                        1.2 km away
                      </span>
                      <span className="text-[10px] text-[#5b403d] block">
                        {p.zone}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Chips Grid (Matches Image 5) */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="p-2 rounded-xl bg-[#faf0ff] border border-[#e4beb9]/30 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-[#91000a] shrink-0">
                        schedule
                      </span>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#5b403d] block leading-tight">
                          Best Window
                        </span>
                        <span className="text-[11px] font-bold text-[#1f1928] truncate block">
                          {p.bestWindow}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-[#faf0ff] border border-[#e4beb9]/30 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[17px] text-[#964900] shrink-0">
                        subway
                      </span>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#5b403d] block leading-tight">
                          Nearest Metro
                        </span>
                        <span className="text-[11px] font-bold text-[#1f1928] truncate block">
                          {p.location.metroStation}
                        </span>
                      </div>
                    </div>

                    {p.fastTrackAvailable && (
                      <div className="p-2 rounded-xl bg-[#ffdcc7]/40 border border-[#fe851f]/30 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[17px] text-[#723600] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                          confirmation_number
                        </span>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-bold text-[#723600] block leading-tight">
                            Queue Pass
                          </span>
                          <span className="text-[11px] font-bold text-[#91000a] truncate block">
                            VIP Gate Active
                          </span>
                        </div>
                      </div>
                    )}

                    {p.riverGhat && (
                      <div className="p-2 rounded-xl bg-[#f0e4fa] border border-[#e4beb9]/30 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[17px] text-[#5c4100] shrink-0">
                          sailing
                        </span>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-bold text-[#5b403d] block leading-tight">
                            River Ghat
                          </span>
                          <span className="text-[11px] font-bold text-[#1f1928] truncate block">
                            {p.riverGhat}
                          </span>
                        </div>
                      </div>
                    )}

                    {p.lightShowTime && (
                      <div className="p-2 rounded-xl bg-[#ffdea5]/30 border border-[#f7bd43]/40 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[17px] text-[#5c4100] shrink-0">
                          wb_twilight
                        </span>
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase font-bold text-[#5c4100] block leading-tight">
                            Light Show
                          </span>
                          <span className="text-[11px] font-bold text-[#1f1928] truncate block">
                            {p.lightShowTime}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2 Primary CTAs matching Image 5: Route Map & Save to Hopper */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <button
                      onClick={() => onSelectPandal(p)}
                      className="h-11 rounded-xl bg-[#f0e4fa] hover:bg-[#eadef4] text-[#91000a] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#e4beb9]/40 active:scale-98"
                    >
                      <span className="material-symbols-outlined text-[18px]">explore</span>
                      <span>Route Map</span>
                    </button>

                    <button
                      onClick={() => onToggleHopper(p.id)}
                      className={`h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
                        isInHopper
                          ? 'bg-[#723600] text-white shadow-md'
                          : 'bg-[#91000a] hover:bg-[#b71c1c] text-white shadow-md'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isInHopper ? 'check_circle' : 'add_circle'}
                      </span>
                      <span>{isInHopper ? 'In Hopper Trail' : 'Save to Hopper'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 6. Sticky Floating Bottom Action Bar (Matches Image 5) */}
      {selectedHopperIds.size > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-30 px-4 sm:px-6 pointer-events-none">
          <div className="max-w-md mx-auto pointer-events-auto">
            <button
              onClick={onOpenHopperTrail}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-[#fe851f] via-[#b71c1c] to-[#91000a] text-white font-bold text-sm shadow-[0_8px_30px_rgba(254,133,31,0.5)] flex items-center justify-center gap-2 active:scale-95 transition-transform border border-white/30"
            >
              <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                route
              </span>
              <span>Plan My Hopper Trail</span>
              <span className="w-6 h-6 rounded-full bg-white text-[#91000a] flex items-center justify-center text-xs font-extrabold shadow-sm">
                {selectedHopperIds.size}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
