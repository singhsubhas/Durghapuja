import React, { useState, useRef, useEffect } from 'react';
import { pujaAudio } from '../utils/audioSynth';

interface MusicGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const MusicGeneratorModal: React.FC<MusicGeneratorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [model, setModel] = useState<'lyria-3-clip-preview' | 'lyria-3-pro-preview'>('lyria-3-clip-preview');
  const [prompt, setPrompt] = useState<string>(
    initialPrompt || 'Festive Durga Puja dhak beats with celebratory bansuri flute and temple bells'
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  // Clean up Object URL when modal closes
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  if (!isOpen) return null;

  const presets = [
    {
      title: 'Maha Ashtami Sandhi Puja Stuti',
      prompt: 'Sacred chanting and 108 resonant brass bells with deep dhak reverberation during Sandhi Puja',
      icon: 'flare',
    },
    {
      title: 'Traditional Dhak & Kanshi Joy',
      prompt: 'High-energy celebratory Bengali dhak drum roll with brass kanshi rhythm at a crowded pandal',
      icon: 'radio_button_checked',
    },
    {
      title: 'Evening Sandhya Aarti Flute',
      prompt: 'Serene devotional evening raga with bamboo bansuri flute, tanpura drone, and sacred conch blowing',
      icon: 'spa',
    },
    {
      title: 'Dhunuchi Naach Festival Groove',
      prompt: 'Ecstatic uptempo percussion groove powering dhunuchi smoke dancers with rapid rhythmic claps',
      icon: 'fireplace',
    },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setErrorMessage(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, model }),
      });

      const data = await res.json();

      if (data.success && data.audioBase64) {
        // Decode base64 into audio Blob
        const binary = atob(data.audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setLyrics(data.lyrics || null);
        pujaAudio.playKanshi();
      } else {
        setErrorMessage(
          data.error ||
            'Lyria music generation is initializing. If your API key is not tier-enabled, you can also play live percussion in our Cultural Dhak Studio.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to connect to music service.');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#ffdea5]/50 max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#91000a] via-[#fe851f] to-[#795700] text-white flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white ring-2 ring-[#ffdea5]/50">
              <span className="material-symbols-outlined text-[22px]">music_note</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif text-lg font-bold text-white leading-tight">
                  Devotional Music Studio
                </h3>
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-[#ffdea5] text-[#5c4100] uppercase">
                  Lyria 3 AI
                </span>
              </div>
              <p className="text-[11px] text-[#ffdad6]">
                Generate custom Puja stutis, Dhak grooves & melodies
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

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {/* Model Selector (Lyria Clip vs Lyria Pro) */}
          <div>
            <label className="text-xs font-bold text-[#1f1928] block mb-1.5">
              Choose Music Engine & Duration:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setModel('lyria-3-clip-preview')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  model === 'lyria-3-clip-preview'
                    ? 'border-[#91000a] bg-[#faf0ff] shadow-sm'
                    : 'border-[#e4beb9]/40 bg-white hover:border-[#91000a]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1f1928]">Lyria Clip</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#ffdad6] text-[#93000b]">
                    Up to 30s
                  </span>
                </div>
                <p className="text-[11px] text-[#5b403d] mt-1 leading-snug">
                  Fast festive clips for rituals, social reels & stories.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setModel('lyria-3-pro-preview')}
                className={`p-3 rounded-2xl border-2 text-left transition-all ${
                  model === 'lyria-3-pro-preview'
                    ? 'border-[#91000a] bg-[#faf0ff] shadow-sm'
                    : 'border-[#e4beb9]/40 bg-white hover:border-[#91000a]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1f1928]">Lyria Pro</span>
                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-[#ffdcc7] text-[#723600]">
                    Full Track
                  </span>
                </div>
                <p className="text-[11px] text-[#5b403d] mt-1 leading-snug">
                  Extended ceremonial devotional compositions.
                </p>
              </button>
            </div>
          </div>

          {/* Quick Preset Prompts */}
          <div>
            <label className="text-xs font-bold text-[#1f1928] block mb-1.5">
              Auspicious Prompt Presets:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(preset.prompt)}
                  className="p-2.5 rounded-xl border border-[#e4beb9]/40 hover:border-[#91000a]/40 bg-[#faf0ff]/60 hover:bg-[#faf0ff] text-left text-xs transition-all flex items-start gap-2"
                >
                  <span className="material-symbols-outlined text-[#91000a] text-[18px] shrink-0 mt-0.5">
                    {preset.icon}
                  </span>
                  <div>
                    <span className="font-bold text-[#1f1928] block leading-tight">
                      {preset.title}
                    </span>
                    <span className="text-[10px] text-[#5b403d] line-clamp-1 mt-0.5">
                      {preset.prompt}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input Box */}
          <div>
            <label className="text-xs font-bold text-[#1f1928] block mb-1">
              Custom Music Description:
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Thunderous Dhak rhythms with reverberating brass bells and sacred Shankha conch..."
              className="w-full p-3 rounded-2xl border border-[#e4beb9]/60 text-xs sm:text-sm text-[#1f1928] focus:outline-none focus:ring-2 focus:ring-[#91000a]"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="h-12 rounded-2xl bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#fe851f] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 active:scale-98 transition-all"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Composing with {model}... (Streaming Audio)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">music_note</span>
                <span>Generate Devotional Track</span>
              </>
            )}
          </button>

          {/* Generated Audio Player */}
          {audioUrl && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a1423] to-[#342d3e] text-white border border-[#ffdea5]/40 shadow-lg flex flex-col gap-3 animate-in fade-in">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={() => setIsPlaying(false)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#ffdea5] tracking-wider block">
                    Generated with {model}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-white leading-tight">
                    {prompt.slice(0, 45)}...
                  </h4>
                </div>
                <a
                  href={audioUrl}
                  download="durga-puja-ai-stuti.wav"
                  className="px-2.5 py-1 rounded-xl bg-white/20 text-[#ffdea5] text-xs font-bold flex items-center gap-1 hover:bg-white/30"
                  title="Download Track"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Save</span>
                </a>
              </div>

              {/* Player Controls */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#fe851f] to-[#f7bd43] text-[#1a1423] flex items-center justify-center font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-2xl">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] text-white/60 mb-1">
                    <span>{isPlaying ? 'Playing Audio' : 'Ready'}</span>
                    <span>{model === 'lyria-3-clip-preview' ? '30s Clip' : 'Full Track'}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-[#fe851f] to-[#ffdea5] rounded-full ${
                        isPlaying ? 'animate-pulse w-full duration-1000' : 'w-1/3'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {lyrics && (
                <div className="mt-1 p-2.5 rounded-xl bg-white/10 text-xs text-[#ffdad6] border border-white/10">
                  <span className="text-[10px] uppercase font-bold text-[#ffdea5] block mb-0.5">
                    Hymn / Lyric Notes:
                  </span>
                  <p className="italic">{lyrics}</p>
                </div>
              )}
            </div>
          )}

          {/* Feedback/Notice if model requires API key */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-amber-700 text-[18px]">info</span>
                <span>Lyria Generation Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                {errorMessage}
              </p>
              <div className="pt-1 flex items-center gap-2">
                <button
                  onClick={() => {
                    pujaAudio.playDhakHit('high');
                    pujaAudio.playKanshi();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-700 text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[15px]">music_note</span>
                  <span>Play Live Percussion Sample</span>
                </button>
              </div>
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
