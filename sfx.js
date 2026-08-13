/**
 * Immersive sound bed + UI cues for the Sajud portfolio.
 * Pure Web Audio (no external files). Starts muted until the visitor
 * clicks/taps once (browser autoplay policy), then remembers preference.
 */
(function () {
  const STORAGE_KEY = 'sajud_sfx_muted';

  const BEDS = {
    home: {
      freqs: [55, 82.4, 110],
      types: ['sine', 'sine', 'triangle'],
      gains: [0.028, 0.016, 0.008],
      lfoHz: [0.07, 0.11, 0.05],
      lfoDepth: [0.45, 0.35, 0.55],
      filterHz: 720,
    },
    research: {
      freqs: [61.7, 92.5, 123.5],
      types: ['sine', 'triangle', 'sine'],
      gains: [0.024, 0.014, 0.01],
      lfoHz: [0.09, 0.14, 0.06],
      lfoDepth: [0.55, 0.4, 0.65],
      filterHz: 880,
      swell: true,
    },
    recognition: {
      freqs: [73.4, 110, 146.8],
      types: ['sine', 'sine', 'triangle'],
      gains: [0.022, 0.014, 0.009],
      lfoHz: [0.12, 0.08, 0.16],
      lfoDepth: [0.35, 0.5, 0.3],
      filterHz: 1100,
      pulse: true,
    },
    patents: {
      freqs: [65.4, 98, 130.8, 196],
      types: ['triangle', 'sine', 'sine', 'square'],
      gains: [0.018, 0.014, 0.01, 0.004],
      lfoHz: [0.06, 0.1, 0.08, 0.2],
      lfoDepth: [0.4, 0.35, 0.45, 0.7],
      filterHz: 950,
    },
    testimonials: {
      freqs: [69.3, 103.8, 138.6],
      types: ['sine', 'sine', 'triangle'],
      gains: [0.026, 0.015, 0.009],
      lfoHz: [0.05, 0.07, 0.04],
      lfoDepth: [0.3, 0.25, 0.4],
      filterHz: 640,
    },
    vault: {
      freqs: [49, 73.4, 98],
      types: ['sawtooth', 'sine', 'triangle'],
      gains: [0.01, 0.018, 0.012],
      lfoHz: [0.15, 0.09, 0.18],
      lfoDepth: [0.6, 0.4, 0.55],
      filterHz: 480,
      rain: true,
    },
  };

  let ctx = null;
  let master = null;
  let bedGain = null;
  let fxGain = null;
  let filter = null;
  let bedNodes = [];
  let rainNodes = null;
  let currentPage = 'home';
  let unlocked = false;
  let muted = true;
  let listenersBound = false;

  try {
    muted = localStorage.getItem(STORAGE_KEY) !== '0';
  } catch (_) {
    muted = true;
  }

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 1;
    master.connect(ctx.destination);

    bedGain = ctx.createGain();
    bedGain.gain.value = 0;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.7;
    bedGain.connect(filter);
    filter.connect(master);

    fxGain = ctx.createGain();
    fxGain.gain.value = 0.9;
    fxGain.connect(master);
    return ctx;
  }

  function stopBed(fade = 0.45) {
    if (!ctx || !bedGain) return;
    const now = ctx.currentTime;
    bedGain.gain.cancelScheduledValues(now);
    bedGain.gain.setValueAtTime(bedGain.gain.value, now);
    bedGain.gain.linearRampToValueAtTime(0, now + fade);
    const dying = bedNodes.slice();
    const dyingRain = rainNodes;
    bedNodes = [];
    rainNodes = null;
    setTimeout(() => {
      dying.forEach((n) => {
        try {
          n.osc.stop();
          n.osc.disconnect();
          n.gain.disconnect();
          if (n.lfo) n.lfo.stop();
        } catch (_) {}
      });
      if (dyingRain) {
        try {
          dyingRain.src.stop();
          dyingRain.src.disconnect();
          dyingRain.gain.disconnect();
          dyingRain.filter.disconnect();
        } catch (_) {}
      }
    }, (fade + 0.05) * 1000);
  }

  function startRain() {
    if (!ctx) return null;
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1800;
    f.Q.value = 0.6;
    const g = ctx.createGain();
    g.gain.value = 0.018;
    src.connect(f);
    f.connect(g);
    g.connect(bedGain);
    src.start();
    return { src, filter: f, gain: g };
  }

  function startBed(page) {
    const cfg = BEDS[page] || BEDS.home;
    if (!ensureCtx() || !unlocked || muted) return;

    stopBed(0.35);
    const now = ctx.currentTime;
    filter.frequency.setTargetAtTime(cfg.filterHz, now, 0.25);

    cfg.freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = cfg.types[i] || 'sine';
      osc.frequency.value = freq;

      const g = ctx.createGain();
      const base = cfg.gains[i] || 0.01;
      g.gain.value = base;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = cfg.lfoHz[i] || 0.08;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = base * (cfg.lfoDepth[i] || 0.4);
      lfo.connect(lfoGain);
      lfoGain.connect(g.gain);

      if (cfg.pulse && i === 0) {
        const pulse = ctx.createOscillator();
        pulse.frequency.value = 1.2;
        const pg = ctx.createGain();
        pg.gain.value = base * 0.35;
        pulse.connect(pg);
        pg.connect(g.gain);
        pulse.start();
        bedNodes.push({ osc: pulse, gain: pg });
      }

      if (cfg.swell && i === 1) {
        const swell = ctx.createOscillator();
        swell.frequency.value = 0.035;
        const sg = ctx.createGain();
        sg.gain.value = base * 0.5;
        swell.connect(sg);
        sg.connect(g.gain);
        swell.start();
        bedNodes.push({ osc: swell, gain: sg });
      }

      osc.connect(g);
      g.connect(bedGain);
      osc.start();
      lfo.start();
      bedNodes.push({ osc, gain: g, lfo });
    });

    if (cfg.rain) rainNodes = startRain();

    bedGain.gain.cancelScheduledValues(now);
    bedGain.gain.setValueAtTime(0, now);
    bedGain.gain.linearRampToValueAtTime(1, now + 1.1);
  }

  function playTone({ freq = 440, type = 'sine', dur = 0.2, gain = 0.08, slideTo = null, when = 0 }) {
    if (!ensureCtx() || !unlocked || muted) return;
    const t0 = ctx.currentTime + when;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo != null) osc.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g);
    g.connect(fxGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  function transition(page) {
    const accents = {
      home: 220,
      research: 246.9,
      recognition: 277.2,
      patents: 293.7,
      testimonials: 311.1,
      vault: 185,
    };
    const f = accents[page] || 220;
    playTone({ freq: f * 0.5, type: 'triangle', dur: 0.35, gain: 0.05, slideTo: f * 1.5 });
    playTone({ freq: f, type: 'sine', dur: 0.45, gain: 0.04, slideTo: f * 2, when: 0.05 });
    playTone({ freq: f * 1.5, type: 'sine', dur: 0.25, gain: 0.025, when: 0.12 });
  }

  function click() {
    playTone({ freq: 880, type: 'triangle', dur: 0.07, gain: 0.035 });
    playTone({ freq: 1320, type: 'sine', dur: 0.05, gain: 0.02, when: 0.01 });
  }

  function unlockSuccess() {
    playTone({ freq: 392, type: 'sine', dur: 0.18, gain: 0.05 });
    playTone({ freq: 523.3, type: 'sine', dur: 0.22, gain: 0.045, when: 0.1 });
    playTone({ freq: 659.3, type: 'triangle', dur: 0.35, gain: 0.04, when: 0.2 });
  }

  function unlockFail() {
    playTone({ freq: 180, type: 'sawtooth', dur: 0.25, gain: 0.035, slideTo: 90 });
  }

  function applyMute() {
    if (!master || !ctx) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(muted ? 0 : 1, now + 0.2);
    if (muted) stopBed(0.2);
    else if (unlocked) startBed(currentPage);
    syncToggle();
  }

  function setMuted(next) {
    muted = !!next;
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch (_) {}
    applyMute();
  }

  function toggleMute() {
    unlock();
    setMuted(!muted);
  }

  function syncToggle() {
    document.querySelectorAll('[data-sfx-toggle]').forEach((el) => {
      el.textContent = muted ? 'SOUND OFF' : 'SOUND ON';
      el.setAttribute('aria-pressed', muted ? 'false' : 'true');
      el.title = muted ? 'Enable immersive sound' : 'Mute sound';
    });
  }

  function unlock() {
    if (!ensureCtx()) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (!unlocked) {
      unlocked = true;
      if (!muted) startBed(currentPage);
    }
  }

  function setPage(page) {
    if (!page || page === currentPage) {
      currentPage = page || currentPage;
      return;
    }
    currentPage = page;
    if (unlocked && !muted) startBed(page);
  }

  function bindUnlock() {
    if (listenersBound) return;
    listenersBound = true;
    const once = () => {
      unlock();
      window.removeEventListener('pointerdown', once);
      window.removeEventListener('keydown', once);
    };
    window.addEventListener('pointerdown', once);
    window.addEventListener('keydown', once);
  }

  window.PortfolioSFX = {
    unlock,
    setPage,
    transition,
    click,
    unlockSuccess,
    unlockFail,
    toggleMute,
    isMuted: () => muted,
    syncToggle,
    bindUnlock,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      bindUnlock();
      syncToggle();
    });
  } else {
    bindUnlock();
    syncToggle();
  }
})();
