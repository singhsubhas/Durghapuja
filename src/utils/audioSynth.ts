// Web Audio API percussion synthesizer for authentic Dhak drum and Shankha (Conch shell)

class PujaAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeInterval: number | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Plays a rich resonant Dhak drum stroke
  playDhakHit(tone: 'low' | 'high' | 'rim' = 'high') {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const now = ctx.currentTime;

      if (tone === 'low') {
        // Deep bass side of the Dhak drum
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.25);
        gain.gain.setValueAtTime(0.9, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      } else if (tone === 'rim') {
        // Wooden rim click (Kathi hit)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);
        gain.gain.setValueAtTime(0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      } else {
        // Main high-pitched resonant membrane hit
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
        gain.gain.setValueAtTime(0.85, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      }

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }
  }

  // Sacred Shankha (Conch shell) blow
  playShankha() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(330, now + 0.6);
      osc.frequency.linearRampToValueAtTime(320, now + 1.8);
      osc.frequency.exponentialRampToValueAtTime(220, now + 2.5);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.8);
      filter.frequency.linearRampToValueAtTime(600, now + 2.4);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.6, now + 0.5);
      gain.gain.setValueAtTime(0.55, now + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.5);
    } catch {
      // AudioContext fallback
    }
  }

  // Traditional Kanshi / Bell sound
  playKanshi() {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1480, now);
      osc.frequency.exponentialRampToValueAtTime(1420, now + 0.8);

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.0);
    } catch {
      // Ignore
    }
  }

  // Play rhythm loop
  startPattern(pattern: number[], bpm: number = 135) {
    this.stopPattern();
    let step = 0;
    const intervalMs = (60 / bpm) * 250; // 16th note feel

    this.activeInterval = window.setInterval(() => {
      const isHit = pattern[step % pattern.length];
      if (isHit) {
        if (step % 4 === 0) {
          this.playDhakHit('low');
        } else if (step % 2 === 1) {
          this.playDhakHit('high');
        } else {
          this.playDhakHit('rim');
        }
      }
      if (step % 8 === 0) {
        this.playKanshi();
      }
      step++;
    }, intervalMs);
  }

  stopPattern() {
    if (this.activeInterval !== null) {
      clearInterval(this.activeInterval);
      this.activeInterval = null;
    }
  }

  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.isMuted) this.stopPattern();
    return this.isMuted;
  }
}

export const pujaAudio = new PujaAudioEngine();
