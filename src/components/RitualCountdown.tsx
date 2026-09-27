import React, { useState, useEffect } from 'react';
import { pujaAudio } from '../utils/audioSynth';

export interface MajorRitualCountdown {
  id: string;
  name: string;
  bengaliName: string;
  day: string;
  timingStr: string;
  targetOffsetHours: number; // Simulated offset in hours from now for dynamic countdown excitement
  description: string;
  significance: string;
  mantra: string;
  urgencyTag: string;
  urgencyType: 'critical' | 'high' | 'sacred';
  lotusCount?: number;
}

const MAJOR_RITUALS: MajorRitualCountdown[] = [
  {
    id: 'sandhi-puja',
    name: 'Maha Ashtami Sandhi Puja',
    bengaliName: 'মহাষ্টমী সন্ধিপূজা (১০৮ পদ্ম ও প্রদীপ)',
    day: 'Maha Ashtami Evening',
    timingStr: '07:48 PM – 08:36 PM (Exact 48 Minutes)',
    targetOffsetHours: 4.38, // ~4 hours 22 mins remaining
    description: 'The supreme cosmic junction between Ashtami & Navami when Devi manifested as Chamunda to vanquish Chanda and Munda.',
    significance: '108 blue lotuses offered alongside 108 glowing brass diyas during the exact 48-minute celestial transition.',
    mantra: 'ॐ হ্রীং চামুণ্ডায়ৈ বিচ্চে... ওঁ দুর্গায়ৈ নমঃ',
    urgencyTag: 'Sacred 48-Minute Window Closes Promptly at 08:36 PM',
    urgencyType: 'critical',
    lotusCount: 108,
  },
  {
    id: 'pushpanjali',
    name: 'Maha Ashtami Pushpanjali',
    bengaliName: 'মহাষ্টমী পুষ্পাঞ্জলি (পবিত্র অঞ্জলি)',
    day: 'Maha Ashtami Morning',
    timingStr: '09:30 AM & 10:30 AM',
    targetOffsetHours: 11.2,
    description: 'The most revered collective community prayer where devotees fast and offer fresh lotus petals with sacred chants.',
    significance: 'Consecrates the heart with devotion, invoking universal wellness and protection from all distress.',
    mantra: 'নমঃ সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে। শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোহস্তুতে॥',
    urgencyTag: 'Sanctum Prayer Batches Filling Fast • Fasting Recommended',
    urgencyType: 'high',
  },
  {
    id: 'dhunuchi-hom',
    name: 'Maha Navami Hom & Dhunuchi Naach',
    bengaliName: 'মহানবমী হোম ও মহাধুনুচি আরতি',
    day: 'Maha Navami Night',
    timingStr: '08:00 PM – 11:30 PM',
    targetOffsetHours: 27.5,
    description: 'Resonant sacred fire oblations (Hom) followed by hypnotic Dhunuchi dance competitions with burning frankincense.',
    significance: 'Marks the triumph of light over darkness and the supreme victory over Mahishasura.',
    mantra: 'অগ্নিমুখন দেবানাং... মহামায়া প্রসীদতু',
    urgencyTag: 'Grand Pandal Arena Showcase • High Crowd Inflow',
    urgencyType: 'sacred',
  },
  {
    id: 'sindoor-khela',
    name: 'Vijaya Dashami Sindoor Khela',
    bengaliName: 'বিজয়া দশমী সিঁদুর খেলা ও বিসর্জন',
    day: 'Vijaya Dashami',
    timingStr: '10:30 AM – 03:00 PM',
    targetOffsetHours: 51.0,
    description: 'Devotees bless each other with sacred vermilion (sindoor) and sweets before the emotional farewell of Maa Durga.',
    significance: 'Wishing eternal health and prosperity while bidding farewell: "Asche bochor abar hobe!"',
    mantra: 'শুভ বিজয়া • আসছে বছর আবার হবে!',
    urgencyTag: 'Traditional Farewell Procession & River Ghat Visarjan',
    urgencyType: 'high',
  },
];

interface RitualCountdownProps {
  onOpenLiveAarti?: () => void;
  onOpenMusicStudio?: (presetPrompt?: string) => void;
}

export const RitualCountdown: React.FC<RitualCountdownProps> = ({
  onOpenLiveAarti,
  onOpenMusicStudio,
}) => {
  const [selectedRitualId, setSelectedRitualId] = useState<string>('sandhi-puja');
  const [diyasLitCount, setDiyasLitCount] = useState<number>(84);
  const [reminderSet, setReminderSet] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Time state in total seconds
  const currentRitual = MAJOR_RITUALS.find((r) => r.id === selectedRitualId) || MAJOR_RITUALS[0];
  
  // Base initial seconds derived from the targetOffsetHours
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(() => {
    return Math.floor(currentRitual.targetOffsetHours * 3600);
  });

  // Reset time whenever the selected ritual changes
  useEffect(() => {
    setTimeLeftSeconds(Math.floor(currentRitual.targetOffsetHours * 3600));
    setReminderSet(false);
  }, [currentRitual]);

  // Live ticking countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          if (soundEnabled) pujaAudio.playShankha();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [soundEnabled]);

  // Calculate days, hours, minutes, seconds
  const days = Math.floor(timeLeftSeconds / (3600 * 24));
  const hours = Math.floor((timeLeftSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeftSeconds % 3600) / 60);
  const seconds = timeLeftSeconds % 60;

  const handleLightDiya = () => {
    setDiyasLitCount((prev) => (prev < 108 ? prev + 1 : prev));
    pujaAudio.playKanshi();
  };

  const handleSetReminder = () => {
    setReminderSet(true);
    pujaAudio.playKanshi();
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1423] via-[#342d3e] to-[#261900] text-white p-5 sm:p-6 shadow-2xl border-2 border-[#f7bd43]/40">
      {/* Decorative background glows */}
      <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-[#fe851f]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#91000a]/25 blur-3xl pointer-events-none" />

      {/* Header bar with live pulsation */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#ffdea5]/20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fe851f] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fe851f]" />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#ffdea5] flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            Auspicious Ritual Countdown
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-colors ${
              soundEnabled ? 'bg-[#ffdea5]/20 text-[#ffdea5] border border-[#ffdea5]/40' : 'bg-white/10 text-white/60'
            }`}
            title="Toggle Chime Alert"
          >
            <span className="material-symbols-outlined text-[14px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
            <span>{soundEnabled ? 'Chimes On' : 'Muted'}</span>
          </button>

          <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full bg-[#91000a] text-white shadow-sm border border-[#ffcac4]/30">
            Live Precision Clock
          </span>
        </div>
      </div>

      {/* Selectable Ritual Switcher */}
      <div className="relative z-10 flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
        {MAJOR_RITUALS.map((ritual) => {
          const isSelected = selectedRitualId === ritual.id;
          return (
            <button
              key={ritual.id}
              onClick={() => setSelectedRitualId(ritual.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-[#b71c1c] to-[#fe851f] text-white shadow-md ring-2 ring-[#ffdea5]/50 scale-102'
                  : 'bg-white/10 text-[#ffdea5] hover:bg-white/15 border border-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: isSelected ? "'FILL' 1" : "'FILL' 0" }}>
                {ritual.id === 'sandhi-puja' ? 'flare' : ritual.id === 'pushpanjali' ? 'local_florist' : ritual.id === 'dhunuchi-hom' ? 'fireplace' : 'celebration'}
              </span>
              <span>{ritual.name}</span>
            </button>
          );
        })}
      </div>

      {/* Main Title & Urgency Badge */}
      <div className="relative z-10 flex flex-col mt-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs text-[#ffdea5] font-serif font-semibold">
              {currentRitual.bengaliName}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mt-0.5">
              {currentRitual.name}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#b71c1c]/80 border border-[#ffcac4]/40 text-[#ffdad6] text-xs font-bold shadow-md">
            <span className="material-symbols-outlined text-[16px] text-[#fe851f] animate-pulse">
              alarm
            </span>
            <span>{currentRitual.timingStr}</span>
          </div>
        </div>

        {/* Urgency Highlight Tag */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#fe851f]/20 border border-[#fe851f]/40 text-[#ffdcc7] text-xs font-semibold w-fit">
          <span className="w-2 h-2 rounded-full bg-[#fe851f] animate-ping" />
          <span>{currentRitual.urgencyTag}</span>
        </div>
      </div>

      {/* 4 DYNAMIC COUNTDOWN DIGIT TILES */}
      <div className="relative z-10 grid grid-cols-4 gap-2 sm:gap-3.5 my-5">
        {/* Days */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/40 border border-[#ffdea5]/30 backdrop-blur-md shadow-inner group hover:border-[#fe851f] transition-colors">
          <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#ffdea5] tracking-tight drop-shadow-[0_2px_10px_rgba(255,222,165,0.4)]">
            {String(days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white/70 mt-1">
            Days
          </span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/40 border border-[#ffdea5]/30 backdrop-blur-md shadow-inner group hover:border-[#fe851f] transition-colors">
          <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#ffdcc7] tracking-tight drop-shadow-[0_2px_10px_rgba(254,133,31,0.4)]">
            {String(hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white/70 mt-1">
            Hours
          </span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/40 border border-[#ffdea5]/30 backdrop-blur-md shadow-inner group hover:border-[#fe851f] transition-colors">
          <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-[#f7bd43] tracking-tight drop-shadow-[0_2px_10px_rgba(247,189,67,0.4)]">
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-white/70 mt-1">
            Minutes
          </span>
        </div>

        {/* Seconds (Pulsing live) */}
        <div className="relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-[#91000a]/60 to-black/60 border-2 border-[#fe851f] backdrop-blur-md shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-[#fe851f]/10 animate-pulse pointer-events-none" />
          <span className="relative z-10 font-serif text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_15px_rgba(254,133,31,0.6)]">
            {String(seconds).padStart(2, '0')}
          </span>
          <span className="relative z-10 text-[10px] sm:text-xs font-extrabold uppercase tracking-widest text-[#ffdcc7] mt-1">
            Seconds
          </span>
        </div>
      </div>

      {/* Special Sacred 108 Lotuses & Diyas Feature (Sandhi Puja highlight) */}
      {currentRitual.lotusCount && (
        <div className="relative z-10 p-3.5 rounded-2xl bg-white/10 border border-[#ffdea5]/30 backdrop-blur-md mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#fe851f] to-[#795700] flex items-center justify-center text-white shrink-0 shadow-md">
              <span className="material-symbols-outlined text-[22px]">flare</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#ffdea5]">
                  Sacred 108 Clay Diyas Altar
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#fe851f] text-white">
                  {diyasLitCount} / 108 Lit
                </span>
              </div>
              <p className="text-[11px] text-[#ffcac4]">
                Light a virtual brass lamp ahead of Sandhi Puja auspicious convergence.
              </p>
            </div>
          </div>

          <button
            onClick={handleLightDiya}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#fe851f] to-[#f7bd43] text-[#1a1423] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              local_fire_department
            </span>
            <span>Light a Diya ({diyasLitCount})</span>
          </button>
        </div>
      )}

      {/* Sacred Invocation Mantra Pill */}
      <div className="relative z-10 p-3 rounded-2xl bg-black/30 border border-white/10 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffdea5] text-[18px]">
            auto_awesome
          </span>
          <span className="font-serif font-bold text-[#ffdcc7]">
            {currentRitual.mantra}
          </span>
        </div>
        <button
          onClick={() => {
            pujaAudio.playShankha();
          }}
          className="text-[11px] font-bold text-[#ffdea5] hover:text-white flex items-center gap-1 self-end sm:self-auto"
        >
          <span className="material-symbols-outlined text-[15px]">air</span>
          <span>Sound Conch Shell</span>
        </button>
      </div>

      {/* Action Buttons: Set Reminder, Sync Live Stream, and Lyria AI Music */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-4 pt-3 border-t border-[#ffdea5]/20">
        <button
          onClick={handleSetReminder}
          className={`h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
            reminderSet
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">
            {reminderSet ? 'check_circle' : 'notifications_active'}
          </span>
          <span>{reminderSet ? 'Reminder Activated!' : 'Notify for Ritual'}</span>
        </button>

        {onOpenLiveAarti && (
          <button
            onClick={onOpenLiveAarti}
            className="h-11 rounded-xl bg-gradient-to-r from-[#b71c1c] to-[#91000a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg active:scale-95 transition-all border border-[#ffcac4]/30"
          >
            <span className="material-symbols-outlined text-[17px]">videocam</span>
            <span>Sync Live Aarti Stream</span>
          </button>
        )}

        {onOpenMusicStudio && (
          <button
            onClick={() => onOpenMusicStudio(`Majestic sacred ${currentRitual.name} stuti hymn with resonating 108 brass bells, dhak beats, and shankha conch shell`)}
            className="h-11 rounded-xl bg-gradient-to-r from-[#795700] via-[#fe851f] to-[#f7bd43] text-[#1a1423] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            title="Generate AI Music with Lyria"
          >
            <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              music_note
            </span>
            <span>Generate Ritual Stuti</span>
          </button>
        )}
      </div>
    </div>
  );
};
