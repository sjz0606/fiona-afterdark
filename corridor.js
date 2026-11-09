/* fiona v2 — «Ночная галерея»: scroll-driven WebGL corridor of REAL Fiona photos/videos.
   Three.js is imported lazily only when the section approaches the viewport. */
const THREE_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const root = document.documentElement;
const section = document.getElementById('corridor');

// Order matters: this is the "walk" through the gallery. v = has video texture.
const PICKS = [
  'DbQ25cFNCXu', 'Dd8rq99tA9x', 'DeUIuU2tDA5', 'DbtnW6rNdrw', 'DbRLK7LtMLJ', 'DaStCwguK1u',
  'DZ-DHTWtx4f', 'DeOGxP6tlE4', 'DbRL-7ytUER', 'Dd6foIYtCG7', 'DZckofNNCLJ', 'Db0ac4ONWbx',
  'DbXZJ5pNop9', 'DaLZNqKNhzY', 'DbhtTsCqM36', 'DZibJretk9N', 'Dbl-ZyrN7rs', 'DbRLC8TtXtA'
];

function disable() {
  root.classList.remove('gl');
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}

if (section && root.classList.contains('gl')) {
  let started = false;
  const io = new IntersectionObserver((en) => {
    if (en[0].isIntersecting && !started) {
      started = true; io.disconnect();
      import(THREE_URL).then(init).catch(disable);
    }
  }, { rootMargin: '350% 0px' });
  io.observe(section);
}

function init(THREE) {
  const F = window.FIONA;
  if (!F) return disable();
  const stage = section.querySelector('.cor-stage');
  const host = section.querySelector('.cor-canvas');
  const caption = section.querySelector('.cor-caption');
  const capPrice = caption.querySelector('.cc-price');
  const capBtn = caption.querySelector('.js-cor-order');
  const intro = section.querySelector('.cor-intro');
  const bar = section.querySelector('.cor-progress span');

  const mobile = () => window.innerWidth < 900;
  const isMobile = mobile();
  const codes = PICKS.slice(0, isMobile ? 12 : PICKS.length).filter((c) => F.byCode[c]);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) { return disable(); }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // textures are passed through untouched
  renderer.setClearColor(0x140e12, 1);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(isMobile ? 62 : 50, 1, 0.1, 80);

  const STEP = isMobile ? 1.55 : 1.7;
  const Z0 = isMobile ? -0.6 : -0.8;
  const H = isMobile ? 1.95 : 2.55;
  const FOG = new THREE.Color(0x140e12);

  const vert = `
    uniform float uVel; uniform float uTime; uniform float uHover;
    varying vec2 vUv; varying float vDepth;
    void main(){
      vUv = uv;
      vec3 p = position;
      float v = uVel;
      // page-curl bend from scroll velocity + soft travelling ripple
      p.z += sin(uv.y * 3.14159) * v * 0.55;
      p.z += sin(uv.x * 3.14159) * abs(v) * 0.22;
      p.z += sin(uv.y * 9.0 - uTime * 3.0) * 0.035 * abs(v);
      p.z += sin(uv.x * 3.14159) * sin(uv.y * 3.14159) * uHover * 0.12;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      vDepth = -mv.z;
      gl_Position = projectionMatrix * mv;
    }`;
  const frag = `
    uniform sampler2D uTex; uniform vec2 uPlane; uniform vec2 uImg; uniform vec3 uFog;
    uniform float uNear; uniform float uFar; uniform float uHover; uniform float uLoaded; uniform float uVel;
    varying vec2 vUv; varying float vDepth;
    void main(){
      vec2 ratio = vec2(
        min((uPlane.x / uPlane.y) / (uImg.x / uImg.y), 1.0),
        min((uPlane.y / uPlane.x) / (uImg.y / uImg.x), 1.0));
      vec2 uv = vec2(vUv.x * ratio.x + (1.0 - ratio.x) * 0.5, vUv.y * ratio.y + (1.0 - ratio.y) * 0.5);
      float s = uVel * 0.006;
      vec3 c = vec3(texture2D(uTex, uv + vec2(0.0, s)).r, texture2D(uTex, uv).g, texture2D(uTex, uv - vec2(0.0, s)).b);
      c *= mix(0.94, 1.08, uHover);
      vec2 e = vUv - 0.5; c *= 1.0 - dot(e, e) * 0.55;               // inner vignette
      float f = smoothstep(uNear, uFar, vDepth);
      c = mix(c, uFog, f * 0.82);
      c = mix(uFog, c, uLoaded);
      gl_FragColor = vec4(c, 1.0);
    }`;

  const loader = new THREE.TextureLoader();
  const geoCache = {};
  const planes = [];
  const videos = [];
  const hash = (i, k) => { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };

  codes.forEach((code, i) => {
    const it = F.byCode[code];
    const aspect = it.w / it.h;
    const w = H * aspect;
    const key = w.toFixed(2);
    const geo = geoCache[key] || (geoCache[key] = new THREE.PlaneGeometry(w, H, 28, 28));
    const uniforms = {
      uTex: { value: null }, uPlane: { value: new THREE.Vector2(w, H) }, uImg: { value: new THREE.Vector2(it.w, it.h) },
      uFog: { value: FOG }, uNear: { value: isMobile ? 6 : 8 }, uFar: { value: isMobile ? 19 : 27 },
      uHover: { value: 0 }, uLoaded: { value: 0 }, uVel: { value: 0 }, uTime: { value: 0 }
    };
    const mat = new THREE.ShaderMaterial({ uniforms, vertexShader: vert, fragmentShader: frag, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat);
    const side = i % 2 ? 1 : -1;
    const outer = Math.floor(i / 2) % 2 === 1;           // two lanes per side: inner wall + outer wall
    const x = isMobile ? side * (outer ? 1.25 : 0.78) + side * hash(i, 1) * 0.1
                       : side * (outer ? 2.95 : 1.6) + side * hash(i, 1) * 0.3;
    const y = (hash(i, 2) - 0.5) * (isMobile ? 0.5 : 0.8) + (outer ? 0.25 : 0);
    const z = Z0 - i * STEP;
    mesh.position.set(x, y, z);
    mesh.rotation.y = -side * (outer ? (isMobile ? 0.62 : 0.5) : (isMobile ? 0.42 : 0.26));
    mesh.rotation.z = (hash(i, 3) - 0.5) * 0.05;
    mesh.userData = { code, item: it, base: new THREE.Vector3(x, y, z), hover: 0, loaded: 0 };
    scene.add(mesh);
    planes.push(mesh);

    if (it.v && !isMobile) {
      const v = document.createElement('video');
      v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto';
      v.src = 'media/v/' + code + '.mp4';
      const tex = new THREE.VideoTexture(v);
      tex.colorSpace = THREE.NoColorSpace;
      tex.minFilter = THREE.LinearFilter; tex.generateMipmaps = false;
      uniforms.uTex.value = tex;
      v.addEventListener('loadeddata', () => { mesh.userData.loaded = 1; uniforms.uImg.value.set(v.videoWidth || it.w, v.videoHeight || it.h); }, { once: true });
      videos.push(v);
      // poster while video buffers
      loader.load('media/p/' + code + '.jpg', (t) => { if (!mesh.userData.loaded) { t.colorSpace = THREE.NoColorSpace; uniforms.uTex.value = t; mesh.userData.loaded = 1; v.addEventListener('playing', () => { uniforms.uTex.value = tex; }, { once: true }); } });
    } else {
      loader.load('media/p/' + code + '.jpg', (t) => {
        t.colorSpace = THREE.NoColorSpace;
        t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        uniforms.uTex.value = t; mesh.userData.loaded = 1;
      });
    }
  });

  const START = isMobile ? 3.6 : 3.4;
  const END = Z0 - (codes.length - 1) * STEP + (isMobile ? 5.0 : 3.8);

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    renderer.domElement.style.width = w + 'px'; renderer.domElement.style.height = h + 'px';
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // --- input
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2(9, 9);
  let mx = 0, my = 0, hovered = null, down = null;
  const toNdc = (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  };
  const pick = () => { ray.setFromCamera(ndc, camera); const hit = ray.intersectObjects(planes, false)[0]; return hit ? hit.object : null; };
  stage.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    toNdc(e); mx = ndc.x; my = ndc.y;
  });
  stage.addEventListener('pointerleave', () => { ndc.set(9, 9); mx = 0; my = 0; });
  stage.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; });
  stage.addEventListener('pointerup', (e) => {
    if (!down || e.target.closest('button')) return;
    const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    if (moved > 10 || performance.now() - down.t > 600) return;
    toNdc(e);
    const hit = pick();
    if (e.pointerType !== 'mouse') ndc.set(9, 9);
    if (hit) { hit.userData.hover = 1; F.open(hit.userData.code); }
  });
  capBtn.addEventListener('click', () => { if (focus) F.open(focus.userData.code); });

  // --- scroll state
  let progress = 0, camZ = START, lastY = window.scrollY, vel = 0, focus = null, capKey = '';
  function readScroll() {
    const r = section.getBoundingClientRect();
    const total = r.height - window.innerHeight;
    progress = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
  }
  function setCaption(m) {
    const key = (m ? m.userData.code : '') + document.documentElement.lang;
    if (key === capKey) return; capKey = key;
    if (!m) { caption.classList.remove('on'); return; }
    capPrice.textContent = F.label(m.userData.item);
    caption.classList.add('on');
  }
  document.addEventListener('fiona:lang', () => { capKey = ''; });

  // --- loop (only while visible)
  let running = false, prevT = performance.now(), t0 = prevT;
  function frame(now) {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - prevT) / 1000); prevT = now;
    readScroll();
    const y = window.scrollY;
    const v = (y - lastY) / Math.max(dt, 0.001); lastY = y;
    vel += (Math.max(-1.3, Math.min(1.3, v * 0.0016)) - vel) * 0.12;

    const target = START + (END - START) * progress;
    camZ += (target - camZ) * 0.12;
    camera.position.set(mx * 0.35, my * 0.18 + 0.05, camZ);
    camera.rotation.set(my * 0.04, -mx * 0.06, vel * 0.02);

    hovered = ndc.x < 5 ? pick() : null;
    stage.style.cursor = hovered ? 'pointer' : '';

    // focus = nearest plane ahead of camera
    let best = null, bd = 1e9;
    for (const m of planes) {
      const d = camZ - m.userData.base.z;
      if (d > 2.4 && d < bd) { bd = d; best = m; }
    }
    focus = hovered || best;
    setCaption(progress > 0.03 && progress < 0.995 ? focus : null);

    const tm = (now - t0) / 1000;
    for (const m of planes) {
      const u = m.material.uniforms, d = m.userData;
      const h = m === hovered ? 1 : 0;
      d.hover += (h - d.hover) * 0.1;
      u.uHover.value = d.hover;
      u.uVel.value = vel;
      u.uTime.value = tm;
      u.uLoaded.value += ((d.loaded ? 1 : 0) - u.uLoaded.value) * 0.06;
      const s = 1 + d.hover * 0.07;
      m.scale.set(s, s, 1);
      m.position.z = d.base.z + d.hover * 0.35;
      const near = Math.max(0, 2.6 - (camZ - d.base.z));    // planes part sideways as the camera passes them
      m.position.x = d.base.x * (1 + near * 0.45);
      m.position.y = d.base.y + Math.sin(tm * 0.6 + d.base.z) * 0.03;
    }
    const ip = Math.min(1, progress / 0.16);
    intro.style.opacity = String(Math.max(0, 1 - ip * 1.5));
    intro.style.transform = 'translate3d(0,0,0) scale(' + (1 + ip * ip * 1.6).toFixed(3) + ')';
    intro.style.filter = ip > 0.02 ? 'blur(' + (ip * 6).toFixed(1) + 'px)' : '';
    bar.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
    renderer.render(scene, camera);
  }

  const vis = new IntersectionObserver((en) => {
    const on = en[0].isIntersecting;
    if (on && !running) {
      running = true; prevT = performance.now(); lastY = window.scrollY; requestAnimationFrame(frame);
      videos.forEach((v) => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
    } else if (!on && running) {
      running = false; videos.forEach((v) => v.pause());
    }
  }, { rootMargin: '10% 0px' });
  vis.observe(section);
  section.classList.add('ready');
  readScroll(); camZ = START + (END - START) * progress;
}
