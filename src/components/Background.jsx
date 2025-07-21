import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationFrameId;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 400; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * 1000,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const fov = 300;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      stars.forEach(star => {
        star.z -= 0.5;
        if (star.z <= 0) {
          star.z = 1000;
        }
        
        const scale = fov / (fov + star.z);
        const x2d = star.x * scale + centerX;
        const y2d = star.y * scale + centerY;
        const radius = star.size * scale;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${scale * 0.7})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    setup();
    animate();
    window.addEventListener('resize', setup);
    return () => {
      window.removeEventListener('resize', setup);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />;
};

export default Background;