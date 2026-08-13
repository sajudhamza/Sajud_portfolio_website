// <tilt-card> — pointer-tracking 3D tilt wrapper with glare
(function () {
  class TiltCard extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.style.display = 'block';
      this.style.perspective = '900px';
      const inner = this.firstElementChild;
      if (!inner) return;
      inner.style.transition = 'transform 0.12s ease-out, box-shadow 0.25s ease';
      inner.style.transformStyle = 'preserve-3d';
      inner.style.willChange = 'transform';
      const glare = document.createElement('div');
      glare.style.cssText = 'position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity 0.25s ease;background:radial-gradient(220px circle at 50% 50%, rgba(232,182,76,0.10), transparent 60%);z-index:3';
      if (getComputedStyle(inner).position === 'static') inner.style.position = 'relative';
      inner.appendChild(glare);
      const max = parseFloat(this.getAttribute('max') || '7');
      this.addEventListener('pointermove', (e) => {
        const r = this.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        inner.style.transform = 'rotateY(' + ((px - 0.5) * 2 * max) + 'deg) rotateX(' + ((0.5 - py) * 2 * max) + 'deg) translateZ(6px)';
        glare.style.opacity = '1';
        glare.style.background = 'radial-gradient(240px circle at ' + (px * 100) + '% ' + (py * 100) + '%, rgba(232,182,76,0.12), transparent 60%)';
      });
      this.addEventListener('pointerleave', () => {
        inner.style.transform = 'rotateY(0deg) rotateX(0deg)';
        glare.style.opacity = '0';
      });
    }
  }
  if (!customElements.get('tilt-card')) customElements.define('tilt-card', TiltCard);
})();
