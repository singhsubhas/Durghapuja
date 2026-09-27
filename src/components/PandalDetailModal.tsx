import React from 'react';
import { Pandal } from '../types/festival';

interface PandalDetailModalProps {
  pandal: Pandal | null;
  onClose: () => void;
  isInHopper: boolean;
  onToggleHopper: () => void;
  onOpenPasses: () => void;
  onSharePandal: () => void;
}

export const PandalDetailModal: React.FC<PandalDetailModalProps> = ({
  pandal,
  onClose,
  isInHopper,
  onToggleHopper,
  onOpenPasses,
  onSharePandal,
}) => {
  if (!pandal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#e4beb9]/40">
        {/* Top Hero Image Banner */}
        <div className="relative w-full h-64 sm:h-72 shrink-0 overflow-hidden">
          <img
            src={pandal.image}
            alt={pandal.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f1928] via-black/40 to-black/30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Top category chip */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#91000a] text-white text-xs font-bold shadow-md">
              {pandal.category}
            </span>
          </div>

          {/* Title on bottom of image */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[11px] uppercase tracking-wider text-[#ffdcc7] font-bold">
              {pandal.zone} • {pandal.bengaliName}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
              {pandal.name}
            </h2>
            <div className="flex items-center gap-3 mt-1.5 text-xs">
              <span className="flex items-center gap-1 font-bold text-[#ffdea5]">
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                {pandal.rating} ({pandal.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fe851f] text-white font-extrabold text-[11px]">
                {pandal.waitTimeMinutes}m Live Wait
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 text-xs sm:text-sm text-[#1f1928]">
          {/* Theme & Architectural Concept */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#91000a] mb-1">
              Architectural Concept & Theme
            </h3>
            <p className="text-[#5b403d] leading-relaxed">
              {pandal.description}
            </p>
          </div>

          {/* Key Visitor Timings */}
          <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/40">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                Optimal Darshan Window
              </span>
              <span className="font-bold text-[#91000a] text-xs">
                {pandal.bestWindow}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                Nearest Metro Transit
              </span>
              <span className="font-bold text-[#723600] text-xs">
                {pandal.location.metroStation}
              </span>
            </div>
            {pandal.lightShowTime && (
              <div className="col-span-2 pt-1 border-t border-[#e4beb9]/30">
                <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                  Lighting & Musical Projection Show
                </span>
                <span className="font-bold text-[#1f1928] text-xs">
                  {pandal.lightShowTime}
                </span>
              </div>
            )}
          </div>

          {/* Transit & Navigation */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#1f1928] mb-1">
              Location & Accessibility
            </h3>
            <div className="flex items-start gap-2 text-xs text-[#5b403d]">
              <span className="material-symbols-outlined text-[17px] text-[#91000a] shrink-0 mt-0.5">
                location_on
              </span>
              <span>{pandal.location.address} (Landmark: {pandal.location.landmark})</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#5b403d] mt-1">
              <span className="material-symbols-outlined text-[17px] text-[#964900] shrink-0">
                directions_walk
              </span>
              <span>Walking Distance: {pandal.location.metroDistance}</span>
            </div>
          </div>

          {/* Amenities & Security */}
          <div>
            <h3 className="font-serif text-base font-bold text-[#1f1928] mb-2">
              Sanctum Facilities & Assistance
            </h3>
            <div className="flex flex-wrap gap-2">
              {pandal.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-xl bg-[#faf0ff] text-[#5b403d] text-xs font-semibold border border-[#e4beb9]/30 flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px] text-green-700">
                    check
                  </span>
                  {fac}
                </span>
              ))}
            </div>
          </div>

          {/* Devotee Live Commentary */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#e4beb9]/40 flex flex-col gap-2">
            <span className="text-xs font-bold text-[#91000a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">forum</span>
              Live Devotee Crowd Feedback (Last 20m)
            </span>
            <p className="text-xs text-[#5b403d] italic">
              "Entered from Gate 2 near the crossing. The queue moved remarkably fast in under 15 minutes! The lighting sanctum is breathtaking."
            </p>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-3.5 bg-white border-t border-[#e4beb9]/30 flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleHopper}
            className={`flex-1 h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-98 ${
              isInHopper
                ? 'bg-[#723600] text-white shadow-md'
                : 'bg-[#91000a] text-white shadow-md hover:bg-[#b71c1c]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isInHopper ? 'check_circle' : 'add_circle'}
            </span>
            <span>{isInHopper ? 'In Hopper Trail' : 'Add to Hopper Trail'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenPasses();
            }}
            className="h-12 px-4 rounded-xl bg-[#ffdcc7] text-[#723600] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#ffb787]"
          >
            <span className="material-symbols-outlined text-[17px]">confirmation_number</span>
            <span className="hidden sm:inline">Get VIP Pass</span>
          </button>

          <button
            onClick={onSharePandal}
            className="w-12 h-12 rounded-xl bg-[#faf0ff] border border-[#e4beb9]/40 text-[#91000a] flex items-center justify-center hover:bg-[#f0e4fa]"
            title="Share Pandal"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
