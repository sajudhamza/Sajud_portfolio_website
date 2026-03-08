import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const IntroScreen = ({ onEnter }) => {
  const scrollContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);

  // Refs for scroll-driven starfield speed (updated in handleScroll)
  const scrollYRef = useRef(0);
  const maxScrollRef = useRef(1);

  // Scroll effect: react to scroll inside the intro's own scroll container
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      maxScrollRef.current = Math.max(maxScroll, 1);
      scrollYRef.current = scrollY;
      const scrollPercent = maxScroll > 0 ? Math.min(scrollY / (maxScroll * 0.85), 1) : 0;
      setTextOpacity(Math.max(0, 1 - scrollPercent * 2));
      setButtonVisible(scrollPercent > 0.85);
    };

    handleScroll(); // initial state
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    const STAR_COUNT = 100;
    const FOV = 300;
    let stars = [];
    let rafId = null;
    let visible = true;

    const setup = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * w * 1.2,
          y: (Math.random() - 0.5) * h * 1.2,
          z: Math.random() * 900,
          size: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const animate = () => {
      if (!visible) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxScroll = maxScrollRef.current;
      const rawPercent = maxScroll > 0 ? Math.min(scrollYRef.current / maxScroll, 1) : 0;
      const scrollPercent = rawPercent * rawPercent;
      const speedMultiplier = 1 + scrollPercent * 6;
      const speed = 0.5 * speedMultiplier;

      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= speed;
        if (star.z <= 0) star.z = 900;

        const scale = FOV / (FOV + star.z);
        const x = star.x * scale + cx;
        const y = star.y * scale + cy;
        const r = star.size * scale;
        const alpha = Math.min(scale * 0.8, 1);

        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(animate);
    };

    const onVisibilityChange = () => {
      visible = document.visibilityState === 'visible';
    };

    setup();
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(animate);
    window.addEventListener('resize', setup);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', setup);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="fixed inset-0 w-full h-full overflow-y-auto overflow-x-hidden bg-black overscroll-none"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="relative min-h-[200vh] w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
          />
          <div
            className="relative z-10 flex flex-col items-center text-center transition-opacity duration-300"
            style={{ opacity: textOpacity }}
          >
            <h1 className="text-6xl md:text-8xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              AI. Data. Innovation.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Unlocking the Future, One Insight at a Time.
            </p>
            <div className="mt-20 text-gray-400 animate-bounce">
              <p>Scroll to Begin</p>
            </div>
          </div>

          <button
            onClick={onEnter}
            className={`
              absolute z-20 px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-full shadow-lg
              transition-all duration-700 transform
              ${buttonVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
            `}
          >
            Enter Portfolio <ChevronRight size={24} className="inline-block ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;