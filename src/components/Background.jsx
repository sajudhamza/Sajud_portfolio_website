import React, { useEffect, useRef } from 'react';

const STAR_COUNT = 120;
const FOV = 300;

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    let stars = [];
    let animationFrameId = null;
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
          x: Math.random() * w - w / 2,
          y: Math.random() * h - h / 2,
          z: Math.random() * 1000,
          size: Math.random() * 1.5 + 0.8,
        });
      }
    };

    const draw = () => {
      if (!visible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 0.4;
        if (star.z <= 0) star.z = 1000;

        const scale = FOV / (FOV + star.z);
        const x2d = star.x * scale + centerX;
        const y2d = star.y * scale + centerY;
        const radius = star.size * scale;
        const alpha = scale * 0.6;

        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      visible = document.visibilityState === 'visible';
      if (visible) rafId = requestAnimationFrame(draw);
      else if (rafId != null) cancelAnimationFrame(rafId);
    };

    setup();
    document.addEventListener('visibilitychange', onVisibilityChange);
    rafId = requestAnimationFrame(draw);
    window.addEventListener('resize', setup);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('resize', setup);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 will-change-transform"
      style={{ contain: 'strict' }}
    />
  );
};

export default Background;