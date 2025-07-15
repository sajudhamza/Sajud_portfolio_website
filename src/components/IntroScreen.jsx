import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

const IntroScreen = ({ onEnter }) => {
  const canvasRef = useRef(null);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let stars = [];
    let animationFrameId;
    let scrollY = window.scrollY;

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
    
    const fov = 250; // Field of View

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const scrollSpeed = scrollY * 0.5;

      stars.forEach(star => {
        star.z -= scrollSpeed / 50; 
        if (star.z <= 0) {
          star.z = 1000;
        }
        
        const scale = fov / (fov + star.z);
        const x2d = star.x * scale + centerX;
        const y2d = star.y * scale + centerY;
        const radius = star.size * scale;
        
        ctx.beginPath();
        ctx.arc(x2d, y2d, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${scale})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
      const scrollPercent = Math.min(scrollY / (window.innerHeight * 0.8), 1);
      setTextOpacity(1 - scrollPercent * 2);
      setButtonVisible(scrollPercent > 0.9);
    };
    
    setup();
    animate();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setup);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setup);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative h-[200vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
        <div className="relative z-10 flex flex-col items-center text-center transition-opacity duration-500" style={{ opacity: textOpacity }}>
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
  );
};

export default IntroScreen;