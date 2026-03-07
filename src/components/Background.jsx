import React from 'react';

/**
 * Static CSS-only background. No canvas or JS animation so scrolling stays smooth.
 */
const Background = () => (
  <div
    aria-hidden="true"
    className="fixed inset-0 z-0 bg-black pointer-events-none"
    style={{
      backgroundImage: `
        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(88, 28, 135, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse 60% 40% at 80% 60%, rgba(30, 58, 138, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse 50% 30% at 20% 80%, rgba(88, 28, 135, 0.06) 0%, transparent 50%)
      `,
    }}
  />
);

export default Background;
