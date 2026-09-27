import React, { useState } from 'react';
import { DHAK_BEAT_PATTERNS } from '../data/festivalData';
import { pujaAudio } from '../utils/audioSynth';

interface CulturalPageProps {
  onOpenShareModal: () => void;
  onOpenMusicStudio?: (presetPrompt?: string) => void;
}

export const CulturalPage: React.FC<CulturalPageProps> = ({
  onOpenShareModal,
  onOpenMusicStudio,
}) => {
  const [activeBeatId, setActiveBeatId] = useState<string | null>(null);
  const [greetingName, setGreetingName] = useState<string>('Family & Friends');
  const [customWish, setCustomWish] = useState<string>(
    'May Maa Durga shower you and your family with peace, health, prosperity, and endless laughter!'
  );
  const [copiedWish, setCopiedWish] = useState<boolean>(false);

  const handlePlayPattern = (id: string, pattern: number[]) => {
    if (activeBeatId === id) {
      pujaAudio.stopPattern();
      setActiveBeatId(null);
    } else {
      pujaAudio.startPattern(pattern, 140);
      setActiveBeatId(id);
    }
  };

  const handleCopyWish = () => {
    const text = `🌺 শুভ শারদীয়া • Subho Sharadiya! 🌺\n\nDear ${greetingName},\n${customWish}\n\nWarm festive regards from Utsav Durgotsav! ✨`;
    navigator.clipboard.writeText(text);
    setCopiedWish(true);
    setTimeout(() => setCopiedWish(false), 2000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* 1. Header Banner */}
      <div className="px-4 sm:px-6">
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#91000a] via-[#fe851f] to-[#795700] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#ffdea5] text-[10px] uppercase font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">festival</span>
              UNESCO Intangible Cultural Heritage
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Dhak Beats, Dhunuchi & Traditions
            </h2>
            <p className="text-xs sm:text-sm text-[#ffcac4] mt-1">
              Immerse yourself in the thunderous resonance of Bengal’s Dhak drums, burning clay Dhunuchi dance, and festive Bijoya blessings.
            </p>
          </div>
        </div>
      </div>

      {/* Lyria 3 AI Music & Stuti Generation Feature Card */}
      {onOpenMusicStudio && (
        <div className="px-4 sm:px-6 mt-4">
          <div className="relative overflow-hidden rounded-3xl p-5 bg-gradient-to-r from-[#1a1423] via-[#342d3e] to-[#795700] text-white border-2 border-[#ffdea5]/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5 z-10 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#fe851f] to-[#f7bd43] text-[#1a1423] flex items-center justify-center font-bold shrink-0 shadow-lg ring-2 ring-[#ffdea5]/50">
                <span className="material-symbols-outlined text-2xl">music_note</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#ffdea5]">
                    AI Music Studio
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-[#91000a] text-white">
                    Lyria 3 (Clip & Pro)
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">
                  Generate Sacred Puja & Dhak Tracks
                </h3>
                <p className="text-xs text-[#ffdad6] mt-0.5 leading-relaxed">
                  Compose short 30s clips or full-length devotional stutis with authentic Bengali instrumentation powered by Google Lyria.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 z-10 shrink-0">
              <button
                onClick={() => onOpenMusicStudio()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#fe851f] to-[#f7bd43] text-[#1a1423] font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Open Music Studio</span>
              </button>
            </div>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-[#fe851f]/20 blur-2xl pointer-events-none" />
          </div>
        </div>
      )}

      {/* 2. Interactive Dhak Percussion Studio */}
      <section className="px-4 sm:px-6 mt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#964900] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                music_note
              </span>
              Virtual Percussion Studio
            </span>
            <h3 className="font-serif text-xl font-bold text-[#1f1928]">
              Interactive Dhak & Shankha Player
            </h3>
          </div>
          {activeBeatId && (
            <button
              onClick={() => {
                pujaAudio.stopPattern();
                setActiveBeatId(null);
              }}
              className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">stop</span>
              Stop Beat
            </button>
          )}
        </div>

        {/* Live Drum Pads */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-4">
          <p className="text-xs text-[#5b403d]">
            Tap the drum pads below to play live festive instruments or select an automated traditional loop:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => pujaAudio.playDhakHit('high')}
              className="py-4 px-2 rounded-2xl bg-gradient-to-br from-[#91000a] to-[#b71c1c] text-white font-bold text-xs shadow-md active:scale-90 transition-transform flex flex-col items-center gap-1"
            >
              <span className="material-symbols-outlined text-2xl">radio_button_checked</span>
              <span>Dhak High (টা)</span>
              <span className="text-[10px] text-white/70">Membrane Stroke</span>
            </button>

            <button
              onClick={() => pujaAudio.playDhakHit('low')}
              className="py-4 px-2 rounded-2xl bg-gradient-to-br from-[#723600] to-[#964900] text-white font-bold text-xs shadow-md active:scale-90 transition-transform flex flex-col items-center gap-1"
            >
              <span className="material-symbols-outlined text-2xl">lens</span>
              <span>Dhak Low (ধা)</span>
              <span className="text-[10px] text-white/70">Bass Side</span>
            </button>

            <button
              onClick={() => pujaAudio.playKanshi()}
              className="py-4 px-2 rounded-2xl bg-gradient-to-br from-[#fe851f] to-[#f7bd43] text-[#1f1928] font-bold text-xs shadow-md active:scale-90 transition-transform flex flex-col items-center gap-1"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span>Kanshi (কাঁসি)</span>
              <span className="text-[10px] text-[#1f1928]/70">Brass Bell Ring</span>
            </button>

            <button
              onClick={() => pujaAudio.playShankha()}
              className="py-4 px-2 rounded-2xl bg-gradient-to-br from-[#ffdea5] to-amber-200 text-[#5c4100] font-bold text-xs shadow-md active:scale-90 transition-transform flex flex-col items-center gap-1"
            >
              <span className="material-symbols-outlined text-2xl">air</span>
              <span>Shankha (শঙ্খ)</span>
              <span className="text-[10px] text-[#5c4100]/70">Sacred Conch</span>
            </button>
          </div>

          {/* Preset Beat Patterns */}
          <div className="pt-2 border-t border-[#e4beb9]/30 flex flex-col gap-2">
            <span className="text-xs font-bold text-[#1f1928]">
              Automated Rhythmic Grooves:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DHAK_BEAT_PATTERNS.map((pattern) => {
                const isPlaying = activeBeatId === pattern.id;
                return (
                  <button
                    key={pattern.id}
                    onClick={() => handlePlayPattern(pattern.id, pattern.pattern)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isPlaying
                        ? 'border-[#91000a] bg-[#faf0ff] shadow-sm'
                        : 'border-[#e4beb9]/40 bg-white hover:border-[#91000a]/30'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#1f1928]">
                        {pattern.name} • <span className="font-normal text-[#91000a]">{pattern.bengaliName}</span>
                      </h4>
                      <p className="text-[11px] text-[#5b403d] line-clamp-1 mt-0.5">
                        {pattern.description}
                      </p>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                        isPlaying ? 'bg-[#91000a] text-white animate-pulse' : 'bg-[#faf0ff] text-[#91000a]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Dhunuchi Naach & Kumari Puja Heritage */}
      <section className="px-4 sm:px-6 mt-6 flex flex-col gap-3">
        <h3 className="font-serif text-xl font-bold text-[#1f1928]">
          Iconic Festival Traditions
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#fe851f]/15 text-[#964900] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">local_fire_department</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#1f1928]">
              The Art of Dhunuchi Naach
            </h4>
            <p className="text-xs text-[#5b403d] leading-relaxed">
              Dancers balance smoking earthen burners (dhunuchi) fueled by coconut husks, frankincense, and burning camphor, spinning to thunderous dhak beats in front of the idol.
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-[#91000a]">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Best viewed at Maddox Square & Bagbazar</span>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-2">
            <div className="w-10 h-10 rounded-2xl bg-[#91000a]/10 text-[#91000a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">face</span>
            </div>
            <h4 className="font-serif text-base font-bold text-[#1f1928]">
              Kumari Puja & Belur Math
            </h4>
            <p className="text-xs text-[#5b403d] leading-relaxed">
              Initiated by Swami Vivekananda in 1901, a young maiden is worshiped as living Mahamaya on Maha Ashtami dawn. Thousands gather along the banks of the Hooghly river.
            </p>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-[#91000a]">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Ashtami Morning • Belur Math Ferry Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bijoya & Festive Greetings Card Creator */}
      <section className="px-4 sm:px-6 mt-6">
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#faf0ff] via-white to-[#ffdcc7]/30 border border-[#e4beb9]/50 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#964900] tracking-wider block">
                Share Auspicious Blessings
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1f1928]">
                Custom Subho Sharadiya Greeting Card
              </h3>
            </div>
            <span className="material-symbols-outlined text-2xl text-[#91000a]">
              favorite
            </span>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <label className="text-xs font-bold text-[#1f1928]">Recipient Name / Family</label>
            <input
              type="text"
              value={greetingName}
              onChange={(e) => setGreetingName(e.target.value)}
              className="h-10 px-3 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928]"
            />

            <label className="text-xs font-bold text-[#1f1928] mt-1">Festive Wish Message</label>
            <textarea
              rows={2}
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="p-3 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928]"
            />
          </div>

          {/* Card Preview */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#91000a] to-[#795700] text-white shadow-md text-center flex flex-col items-center gap-1.5 mt-1 border border-[#ffdea5]/40">
            <span className="font-serif text-lg font-bold text-[#ffdea5]">
              শুভ শারদীয়া!
            </span>
            <p className="text-xs font-bold">Dear {greetingName},</p>
            <p className="text-[11px] text-[#ffdad6] max-w-sm">"{customWish}"</p>
            <span className="text-[9px] uppercase tracking-widest text-[#ffd075] mt-1">
              ✨ Sent with Devotion via Utsav Durgotsav ✨
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handleCopyWish}
              className="flex-1 h-11 rounded-xl bg-[#91000a] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">
                {copiedWish ? 'check' : 'content_copy'}
              </span>
              <span>{copiedWish ? 'Copied to Clipboard!' : 'Copy Festive Text'}</span>
            </button>

            <button
              onClick={onOpenShareModal}
              className="h-11 px-4 rounded-xl bg-white border border-[#e4beb9]/40 text-[#91000a] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#faf0ff]"
            >
              <span className="material-symbols-outlined text-[17px]">share</span>
              <span>Share App Link</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
