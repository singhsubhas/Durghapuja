import React, { useState } from 'react';
import { Pandal } from '../types/festival';

interface HopperTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPandals: Pandal[];
  allPandals: Pandal[];
  onToggleHopper: (id: string) => void;
  onClearTrail: () => void;
  onSelectCuratedTrail: (trailIds: string[]) => void;
  onOpenShareModal: () => void;
}

export const HopperTrailModal: React.FC<HopperTrailModalProps> = ({
  isOpen,
  onClose,
  selectedPandals,
  allPandals,
  onToggleHopper,
  onClearTrail,
  onSelectCuratedTrail,
  onOpenShareModal,
}) => {
  const [trailMode, setTrailMode] = useState<'custom' | 'curated'>('custom');

  if (!isOpen) return null;

  // Curated trail options
  const curatedTrails = [
    {
      id: 'south-classic',
      name: 'South Kolkata Heritage Trail',
      pandalsCount: 4,
      estTime: '3h 30m',
      distance: '2.8 km',
      pandals: ['ekdalia-evergreen', 'ballygunge-cultural', 'tridhara-sammilani', 'maddox-square'],
      metroHub: 'Kalighat & Ballygunge Stn',
      highlight: 'Terracotta, Daaker Saaj, and famous Maddox Square adda',
    },
    {
      id: 'north-ghats',
      name: 'North Kolkata & Ghats Walk',
      pandalsCount: 3,
      estTime: '2h 45m',
      distance: '2.1 km',
      pandals: ['ahiritola-sarbojanin', 'mohammad-ali-park', 'college-square'],
      metroHub: 'Shobhabazar & MG Road',
      highlight: 'River breeze, handloom craft, and grand light palace',
    },
    {
      id: 'fast-track-rush',
      name: 'Smart Low-Queue Express Trail',
      pandalsCount: 3,
      estTime: '2h 10m',
      distance: '1.9 km',
      pandals: ['tridhara-sammilani', 'ballygunge-cultural', 'mohammad-ali-park'],
      metroHub: 'Kalighat & MG Road',
      highlight: 'Optimized for shortest wait times (all under 15m wait right now)',
    },
  ];

  // Calculate statistics
  const totalWaitTime = selectedPandals.reduce((sum, p) => sum + p.waitTimeMinutes, 0);
  const totalWalkKm = (selectedPandals.length * 0.7).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#e4beb9]/40">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#fe851f] via-[#b71c1c] to-[#91000a] text-white flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white ring-2 ring-white/30">
              <span className="material-symbols-outlined text-[22px]">route</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-white leading-tight">
                Pandal Hopper Trail Planner
              </h3>
              <p className="text-[11px] text-[#ffdad6]">
                AI crowd-optimizer & smart transit sequence
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Trail Mode Switcher */}
        <div className="flex items-center p-1.5 bg-[#faf0ff] border-b border-[#e4beb9]/30 shrink-0">
          <button
            onClick={() => setTrailMode('custom')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              trailMode === 'custom'
                ? 'bg-[#91000a] text-white shadow-sm'
                : 'text-[#5b403d] hover:text-[#91000a]'
            }`}
          >
            My Selected Trail ({selectedPandals.length})
          </button>
          <button
            onClick={() => setTrailMode('curated')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              trailMode === 'curated'
                ? 'bg-[#91000a] text-white shadow-sm'
                : 'text-[#5b403d] hover:text-[#91000a]'
            }`}
          >
            Curated Express Trails
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {trailMode === 'custom' ? (
            <>
              {selectedPandals.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-4xl text-[#91000a]/40">
                    add_location_alt
                  </span>
                  <p className="font-serif text-base font-bold text-[#1f1928]">
                    Your Hopper Trail is Empty
                  </p>
                  <p className="text-xs text-[#5b403d] max-w-xs">
                    Tap "Save to Hopper" on any pandal card to craft your personal darshan route.
                  </p>
                  <button
                    onClick={() => {
                      onSelectCuratedTrail(curatedTrails[0].pandals);
                    }}
                    className="mt-2 px-4 py-2 rounded-xl bg-[#91000a] text-white text-xs font-bold shadow-md"
                  >
                    Load South Kolkata Heritage Loop
                  </button>
                </div>
              ) : (
                <>
                  {/* Trail Summary Stats */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/40 text-center">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#5b403d]">Stops</span>
                      <p className="text-base font-bold text-[#1f1928]">{selectedPandals.length} Pandals</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#5b403d]">Est. Queue</span>
                      <p className="text-base font-bold text-[#91000a]">~{totalWaitTime} mins</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#5b403d]">Walking</span>
                      <p className="text-base font-bold text-[#723600]">~{totalWalkKm} km</p>
                    </div>
                  </div>

                  {/* Step-by-Step Waypoints */}
                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-[#1f1928]">
                      Optimized Darshan Sequence:
                    </span>

                    {selectedPandals.map((p, idx) => (
                      <div
                        key={p.id}
                        className="relative flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-[#e4beb9]/40 shadow-sm"
                      >
                        {/* Number Step Badge */}
                        <div className="w-7 h-7 rounded-full bg-[#91000a] text-white flex items-center justify-center text-xs font-extrabold shadow-sm shrink-0">
                          {idx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif text-sm font-bold text-[#1f1928] truncate">
                              {p.name}
                            </h4>
                            <span className="text-[10px] font-bold text-[#fe851f] px-2 py-0.5 rounded-full bg-[#ffdcc7]">
                              {p.waitTimeMinutes}m wait
                            </span>
                          </div>

                          <p className="text-xs text-[#5b403d] mt-0.5 line-clamp-1">
                            {p.theme}
                          </p>

                          <div className="flex items-center gap-2 mt-2 text-[11px] text-[#5b403d]">
                            <span className="flex items-center gap-1 font-semibold text-[#964900]">
                              <span className="material-symbols-outlined text-[13px]">train</span>
                              {p.location.metroStation}
                            </span>
                            <span>•</span>
                            <span className="text-[#91000a] font-semibold">
                              Best: {p.bestWindow}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => onToggleHopper(p.id)}
                          className="w-7 h-7 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center"
                          title="Remove Stop"
                        >
                          <span className="material-symbols-outlined text-[17px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={onClearTrail}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Clear All Stops
                    </button>
                    <button
                      onClick={onOpenShareModal}
                      className="text-xs font-bold text-[#91000a] flex items-center gap-1 hover:underline"
                    >
                      <span className="material-symbols-outlined text-[15px]">share</span>
                      Share Trail Itinerary
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            /* Curated Trails Options */
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-[#1f1928]">
                Select a Curated Festival Circuit:
              </span>

              {curatedTrails.map((trail) => (
                <div
                  key={trail.id}
                  className="p-4 rounded-2xl bg-white border border-[#e4beb9]/50 shadow-sm flex flex-col gap-2 hover:border-[#91000a]/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#1f1928]">
                        {trail.name}
                      </h4>
                      <p className="text-xs text-[#5b403d] mt-0.5">{trail.highlight}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000b]">
                      {trail.pandalsCount} Pandals
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#5b403d] mt-1">
                    <span className="flex items-center gap-1 font-semibold text-[#723600]">
                      <span className="material-symbols-outlined text-[15px]">schedule</span>
                      {trail.estTime}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#5b403d]">
                      <span className="material-symbols-outlined text-[15px]">directions_walk</span>
                      {trail.distance}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#91000a]">
                      <span className="material-symbols-outlined text-[15px]">subway</span>
                      {trail.metroHub}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCuratedTrail(trail.pandals);
                      setTrailMode('custom');
                    }}
                    className="mt-2 h-10 rounded-xl bg-[#91000a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Adopt This Hopper Trail</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-white border-t border-[#e4beb9]/30 flex items-center justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#91000a] text-white font-bold text-xs shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
