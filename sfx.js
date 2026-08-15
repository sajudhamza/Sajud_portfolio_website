/**
 * Light cursor tone. No files, no music, no animation loop.
 * Pointer move pans and retunes a quiet sine; silence when still.
 */
(function () {
  const STORAGE_KEY = 'sajud_sfx_muted_v2';
  const VOICES = {
    home: { a: 220, b: 330, mix: 0.55, bright: 900 },
    research: { a: 329.6, b: 493.9, mix: 0.7, bright: 1400 },
    recognition: { a: 261.6, b: 329.6, mix: 0.45, bright: 1200 },
    patents: { a: 196, b: 294, mix: 0.4, bright: 800 },
    testimonials: { a: 174.6, b: 220, mix: 0.35, bright: 700 },
    vault: { a: 130.8, b: 196, mix: 0.3, bright: 550 },
  };

  let muted = false;
  let unlocked = false;
  let listenersBound = false;
  let currentPage = 'home';
  let ctx = null;
  let master = null;
  let panner = null;
  let filter = null;
  let gain = null;
  let oscA = null;
  let oscB = null;
  let mixB = null;

  try {
    muted = localStorage.getItem(STORAGE_KEY) === '1';
  } catch (_) {
    muted = false;
  }

  function voice() {
    return VOICES[currentPage] || VOICES.home;
  }

  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : 1;
    master.connect(ctx.destination);

    gain = ctx.createGain();
    gain.gain.value = 0.0001;
    filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1400;
    filter.Q.value = 0.4;
    panner = ctx.createStereoPanner();

    const v = voice();
    oscA = ctx.createOscillator();
    oscB = ctx.createOscillator();
    oscA.type = 'sine';
    oscB.type = 'sine';
    oscA.frequency.value = v.a;
    oscB.frequency.value = v.b;
    const a = ctx.createGain();
    mixB = ctx.createGain();
    a.gain.value = 1;
    mixB.gain.value = v.mix;
    oscA.connect(a);
    oscB.connect(mixB);
    a.connect(gain);
    mixB.connect(gain);
    gain.connect(filter);
    filter.connect(panner);
    panner.connect(master);
    oscA.start();
    oscB.start();
    return ctx;
  }

  function onPointerMove(e) {
    if (muted) return;
    if (!ensure()) return;
    if (ctx.state === 'suspended') ctx.resume();
    unlocked = true;

    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const x = (e.clientX / w) * 2 - 1;
    const y = e.clientY / h;
    const v = voice();
    const t = ctx.currentTime;

    panner.pan.setValueAtTime(Math.max(-1, Math.min(1, x)), t);
    oscA.frequency.setValueAtTime(v.a * (1 + x * 0.22), t);
    oscB.frequency.setValueAtTime(v.b * (1 + x * 0.16), t);
    filter.frequency.setValueAtTime(v.bright * 0.6 + (1 - y) * v.bright, t);

    gain.gain.cancelScheduledValues(t);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
  }

  function unlock() {
    if (!ensure()) return;
    if (ctx.state === 'suspended') ctx.resume();
    unlocked = true;
  }

  function setMuted(next) {
    muted = !!next;
    try { localStorage.setItem(STORAGE_KEY, muted ? '1' : '0'); } catch (_) {}
    unlock();
    if (master && ctx) {
      master.gain.setValueAtTime(muted ? 0 : 1, ctx.currentTime);
      if (muted && gain) gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    }
    syncToggle();
  }

  function toggleMute() {
    unlock();
    setMuted(!muted);
  }

  function setPage(page) {
    if (!page) return;
    currentPage = page;
    if (!ctx || !oscA) return;
    const v = voice();
    const t = ctx.currentTime;
    oscA.frequency.setTargetAtTime(v.a, t, 0.08);
    oscB.frequency.setTargetAtTime(v.b, t, 0.08);
    if (mixB) mixB.gain.setTargetAtTime(v.mix, t, 0.08);
    if (filter) filter.frequency.setTargetAtTime(v.bright, t, 0.1);
  }

  function syncToggle() {
    document.querySelectorAll('[data-sfx-toggle]').forEach((el) => {
      el.textContent = muted ? 'SOUND OFF' : 'SOUND ON';
      el.setAttribute('aria-pressed', muted ? 'false' : 'true');
      el.title = muted ? 'Enable cursor sound' : 'Mute sound';
    });
  }

  function bindUnlock() {
    if (listenersBound) return;
    listenersBound = true;
    const wake = () => { if (!muted) unlock(); };
    window.addEventListener('pointerdown', wake, { passive: true });
    window.addEventListener('keydown', wake, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
  }

  window.PortfolioSFX = {
    unlock,
    setPage,
    transition: setPage,
    click: () => {},
    hover: () => {},
    unlockSuccess: () => {},
    unlockFail: () => {},
    toggleMute,
    isMuted: () => muted,
    syncToggle,
    bindUnlock,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { bindUnlock(); syncToggle(); });
  } else {
    bindUnlock();
    syncToggle();
  }
})();
