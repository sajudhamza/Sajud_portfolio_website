// <hero-3d> — original interactive three.js scenes.
// Hero mode: draggable orbit + clickable satellites (window 'hero3d-nav').
// mode="ambient" + variant="drift|waves|rings|shapes|rain": per-page immersive backgrounds.
(function () {
  class Hero3D extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.style.cssText += 'display:block;position:absolute;inset:0;overflow:hidden;';
      this._start();
    }
    async _start() {
      let THREE;
      try { THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'); }
      catch (e) { return; }
      const density = parseFloat(this.getAttribute('density') || '1');
      const accent = this.getAttribute('accent') || '#e8b64c';
      const ambient = this.getAttribute('mode') === 'ambient';
      const variant = this.getAttribute('variant') || 'drift';
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.appendChild(renderer.domElement);
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;touch-action:pan-y;';
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      camera.position.z = ambient ? 20 : 16;

      let update = () => {};
      const sats = [];
      let dragX = 0, dragVel = 0, dragging = false, lastX = 0, downX = 0, downY = 0;
      let hovered = null;

      const makeCloud = (n, spreadY, size, op) => {
        const pts = [];
        for (let i = 0; i < n; i++) {
          const r = 9 + Math.random() * 7;
          const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
          pts.push(new THREE.Vector3(r * Math.sin(p) * Math.cos(t), (Math.random() - 0.5) * spreadY, r * Math.sin(p) * Math.sin(t) * 0.6));
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const cloud = new THREE.Points(geo, new THREE.PointsMaterial({ color: accent, size, transparent: true, opacity: op }));
        return { pts, cloud };
      };

      if (!ambient) {
        // ---------- HERO ----------
        const { pts, cloud } = makeCloud(Math.round(260 * density), 12, 0.11, 0.9);
        scene.add(cloud);
        const linePos = [];
        for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].distanceTo(pts[j]) < 2.6) linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
        const lgeo = new THREE.BufferGeometry();
        lgeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        const lines = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.14 }));
        scene.add(lines);
        const core = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1),
          new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.22 }));
        scene.add(core);
        const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 0),
          new THREE.MeshBasicMaterial({ color: '#f5ede0', wireframe: true, transparent: true, opacity: 0.35 }));
        scene.add(inner);
        const world = new THREE.Group();
        scene.add(world);
        const defs = [
          { label: 'PUBLICATIONS', page: 'research' },
          { label: 'PATENTS', page: 'patents' },
          { label: 'RECOGNITION', page: 'recognition' },
          { label: 'TESTIMONIALS', page: 'testimonials' },
          { label: 'VAULT', page: 'vault' }
        ];
        const makeLabel = (text) => {
          const c = document.createElement('canvas'); c.width = 512; c.height = 96;
          const x = c.getContext('2d');
          x.font = '700 44px "JetBrains Mono", monospace';
          x.textAlign = 'center'; x.textBaseline = 'middle';
          x.fillStyle = accent; x.fillText(text, 256, 48);
          const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, opacity: 0.55, depthTest: false }));
          sp.scale.set(4.6, 0.86, 1);
          return sp;
        };
        defs.forEach((d, i) => {
          const g = new THREE.Group();
          g.userData = { angle: (i / defs.length) * Math.PI * 2, page: d.page, hover: 0 };
          const node = new THREE.Mesh(new THREE.OctahedronGeometry(0.42, 0),
            new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.85 }));
          const halo = new THREE.Mesh(new THREE.SphereGeometry(0.95, 12, 12),
            new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.0 }));
          const label = makeLabel(d.label);
          label.position.y = 1.05;
          g.add(node); g.add(halo); g.add(label);
          g.userData.node = node; g.userData.label = label; g.userData.halo = halo;
          world.add(g); sats.push(g);
        });
        update = (t, mx, my) => {
          const rotY = t * 0.05 + mx * 0.35 + dragX;
          cloud.rotation.y = rotY; lines.rotation.y = rotY;
          cloud.rotation.x = my * 0.18; lines.rotation.x = cloud.rotation.x;
          core.rotation.y = t * 0.18 + mx * 0.5 + dragX * 1.4; core.rotation.x = t * 0.07 + my * 0.3;
          inner.rotation.y = -t * 0.28; inner.rotation.z = t * 0.12;
          world.rotation.y = t * 0.1 + dragX;
          sats.forEach((g) => {
            const a = g.userData.angle;
            g.position.set(Math.cos(a) * 6.4, Math.sin(a * 2.1 + t * 0.3) * 1.4, Math.sin(a) * 6.4 * 0.75);
            g.userData.node.rotation.y = t * 0.8; g.userData.node.rotation.x = t * 0.4;
            g.userData.hover += (((hovered === g) ? 1 : 0) - g.userData.hover) * 0.12;
            const s = 1 + g.userData.hover * 0.7;
            g.userData.node.scale.set(s, s, s);
            g.userData.label.material.opacity = 0.55 + g.userData.hover * 0.45;
            const ls = 1 + g.userData.hover * 0.25;
            g.userData.label.scale.set(4.6 * ls, 0.86 * ls, 1);
          });
        };
      } else if (variant === 'waves') {
        // ---------- data-field wave grid ----------
        const cols = 70, rows = 34, pos = new Float32Array(cols * rows * 3);
        let k = 0;
        for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
          pos[k++] = (i - cols / 2) * 0.55; pos[k++] = 0; pos[k++] = (j - rows / 2) * 0.55;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const grid = new THREE.Points(geo, new THREE.PointsMaterial({ color: accent, size: 0.07, transparent: true, opacity: 0.5 }));
        grid.position.y = -4; grid.rotation.x = -0.25;
        scene.add(grid);
        update = (t) => {
          const p = geo.attributes.position.array;
          let k = 0;
          for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
            const x = p[k], z = p[k + 2];
            p[k + 1] = Math.sin(x * 0.45 + t * 0.8) * 0.7 + Math.cos(z * 0.5 + t * 0.55) * 0.7;
            k += 3;
          }
          geo.attributes.position.needsUpdate = true;
        };
      } else if (variant === 'rings') {
        // ---------- concentric spotlight rings ----------
        const rings = [];
        for (let r = 0; r < 6; r++) {
          const radius = 3.5 + r * 2.1, n = 60 + r * 26, pts = [];
          for (let i = 0; i < n; i++) {
            const a = (i / n) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, (Math.random() - 0.5) * 0.4));
          }
          const g = new THREE.Points(new THREE.BufferGeometry().setFromPoints(pts),
            new THREE.PointsMaterial({ color: accent, size: 0.07, transparent: true, opacity: 0.5 - r * 0.05 }));
          scene.add(g); rings.push(g);
        }
        update = (t) => rings.forEach((g, i) => { g.rotation.z = t * 0.05 * (i % 2 ? 1 : -1) * (1 + i * 0.25); });
      } else if (variant === 'shapes') {
        // ---------- blueprint wireframes ----------
        const grp = new THREE.Group(); scene.add(grp);
        const m = (o) => new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: o });
        const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(4.6, 1.2, 90, 12), m(0.08));
        knot.position.set(6, 1, -4);
        const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(2.6, 0), m(0.12));
        ico.position.set(-8, -2, -2);
        const oct = new THREE.Mesh(new THREE.OctahedronGeometry(1.6, 0), m(0.14));
        oct.position.set(-3, 4.5, -6);
        grp.add(knot); grp.add(ico); grp.add(oct);
        const { cloud } = makeCloud(70, 14, 0.06, 0.35); scene.add(cloud);
        update = (t) => {
          knot.rotation.y = t * 0.12; knot.rotation.x = t * 0.05;
          ico.rotation.y = -t * 0.18; ico.rotation.z = t * 0.08;
          oct.rotation.y = t * 0.25; oct.rotation.x = t * 0.15;
          cloud.rotation.y = t * 0.02;
        };
      } else if (variant === 'rain') {
        // ---------- falling cipher rain ----------
        const n = 320, pos = new Float32Array(n * 3), speed = new Float32Array(n);
        for (let i = 0; i < n; i++) {
          pos[i * 3] = (Math.random() - 0.5) * 34;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
          speed[i] = 0.02 + Math.random() * 0.06;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        const drops = new THREE.Points(geo, new THREE.PointsMaterial({ color: accent, size: 0.09, transparent: true, opacity: 0.45 }));
        scene.add(drops);
        update = () => {
          const p = geo.attributes.position.array;
          for (let i = 0; i < n; i++) {
            p[i * 3 + 1] -= speed[i];
            if (p[i * 3 + 1] < -12) p[i * 3 + 1] = 12;
          }
          geo.attributes.position.needsUpdate = true;
        };
      } else {
        // ---------- drift (default ambient) ----------
        const { pts, cloud } = makeCloud(Math.round(150 * density), 12, 0.08, 0.45);
        scene.add(cloud);
        const linePos = [];
        for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
          if (pts[i].distanceTo(pts[j]) < 2.6) linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z);
        }
        const lgeo = new THREE.BufferGeometry();
        lgeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        const lines = new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.07 }));
        scene.add(lines);
        update = (t, mx, my) => {
          const rotY = t * 0.025 + mx * 0.15;
          cloud.rotation.y = rotY; lines.rotation.y = rotY;
          cloud.rotation.x = my * 0.18; lines.rotation.x = cloud.rotation.x;
        };
      }

      // pointer: parallax everywhere; drag + raycast in hero mode
      let mx = 0, my = 0, tx = 0, ty = 0;
      const ray = new THREE.Raycaster();
      const ndc = new THREE.Vector2();
      const toNdc = (e) => {
        const r = renderer.domElement.getBoundingClientRect();
        ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      };
      const onMove = (e) => {
        const r = this.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      };
      window.addEventListener('pointermove', onMove);

      if (!ambient) {
        const el = renderer.domElement;
        el.style.cursor = 'grab';
        el.addEventListener('pointerdown', (e) => {
          dragging = true; lastX = e.clientX; downX = e.clientX; downY = e.clientY;
          el.style.cursor = 'grabbing'; el.setPointerCapture(e.pointerId);
        });
        el.addEventListener('pointermove', (e) => {
          if (dragging) {
            const dx = e.clientX - lastX; lastX = e.clientX;
            dragX += dx * 0.005; dragVel = dx * 0.005;
          } else {
            toNdc(e);
            ray.setFromCamera(ndc, camera);
            const hits = ray.intersectObjects(sats.map(s => s.userData.halo));
            const g = hits.length ? hits[0].object.parent : null;
            if (g !== hovered) { hovered = g; el.style.cursor = g ? 'pointer' : 'grab'; }
          }
        });
        el.addEventListener('pointerup', (e) => {
          dragging = false; el.style.cursor = hovered ? 'pointer' : 'grab';
          if (Math.hypot(e.clientX - downX, e.clientY - downY) < 6) {
            toNdc(e);
            ray.setFromCamera(ndc, camera);
            const hits = ray.intersectObjects(sats.map(s => s.userData.halo));
            if (hits.length) window.dispatchEvent(new CustomEvent('hero3d-nav', { detail: hits[0].object.parent.userData.page }));
          }
        });
        el.addEventListener('pointerleave', () => { hovered = null; });
      }

      const resize = () => {
        const w = this.clientWidth || 1, h = this.clientHeight || 1;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
      };
      resize();
      new ResizeObserver(resize).observe(this);

      const clock = new THREE.Clock();
      const loop = () => {
        if (!this.isConnected) { renderer.dispose(); window.removeEventListener('pointermove', onMove); return; }
        const t = clock.getElapsedTime();
        mx += (tx - mx) * 0.04; my += (ty - my) * 0.04;
        if (!ambient && !dragging) { dragX += dragVel; dragVel *= 0.95; }
        update(t, mx, my);
        camera.position.x = mx * 1.2; camera.position.y = -my * 0.8;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
      };
      loop();
    }
  }
  if (!customElements.get('hero-3d')) customElements.define('hero-3d', Hero3D);
})();
