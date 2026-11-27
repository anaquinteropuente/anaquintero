/* =========================================================
   Ana Quintero · Creative Strategist Portfolio
   Vanilla JS, sin librerías.
   ========================================================= */
(() => {
'use strict';
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const isWide = () => innerWidth > 820;
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch {} }
};

/* =========================================================
   IDIOMA (ES / EN)
   ========================================================= */
let LANG = store.get('aq-lang') === 'en' ? 'en' : 'es';
const L = (es, en) => LANG === 'en' ? en : es;
const STR = {
  hint: ['Pon la aguja para empezar', 'Drop the needle to start'],
  skip: ['Saltar intro', 'Skip intro'],
  navWork: ['Trabajo', 'Work'], navAbout: ['Sobre mí', 'About'], navContact: ['Contacto', 'Contact'],
  scroll: ['Desliza', 'Scroll'],
  aboutT: ['Sobre mí', 'About me'],
  aboutP: ['Trabajo entre la estrategia y la ejecución: pienso el mensaje, lo escribo, lo diseño y lo produzco. Menos intermediarios, menos briefings que se pierden por el camino y más coherencia entre lo que dices y cómo se ve.',
           'I work between strategy and execution: I think up the message, write it, design it and produce it. Fewer middlemen, fewer briefs lost along the way and more consistency between what you say and how it looks.'],
  tools: ['Trabajo con', 'Tools I use'],
  contactT: ['¿Hablamos?', 'Let’s talk?'],
  contactSub: ['Cuéntame qué tienes entre manos.', 'Tell me what you’re working on.'],
  lcdTitle: ['Contacto', 'Contact'], mWrite: ['Escribir email', 'Write email'], mCopy: ['Copiar email', 'Copy email'],
  soft1: ['← Atrás', '← Back'], soft2: ['OK', 'OK'],
  nowPlaying: ['Ahora suena', 'Now playing'],
  close: ['Cerrar', 'Close'], desktop: ['Escritorio', 'Desktop'], mobile: ['Móvil', 'Mobile'],
  roomEnd: ['Gracias por escuchar.', 'Thanks for listening.'],
  navSvc: ['Servicios', 'Services'],
  more: ['Desliza para ver más', 'Scroll to see more'],
  gameTip: ['Pulsa cualquier número y juega', 'Press any number to play'],
  svcBadge: ['Disponible para proyectos freelance', 'Available for freelance projects'],
  svcT: ['¿Lo hacemos para tu marca?', 'Shall we do it for your brand?'],
  svcSub: ['Lo que has visto también lo puedo hacer para ti. Cuéntame tu proyecto y te paso presupuesto.', 'Everything you’ve seen, I can make for you too. Tell me about your project and I’ll send you a quote.'],
  s1t: ['Estrategia y copy', 'Strategy & copy'], s1d: ['ICP, ángulos y mensajes para anuncios y orgánico.', 'ICP, angles and messaging for ads and organic.'],
  s2t: ['Diseño de ads', 'Ad design'], s2d: ['Estáticos y carruseles para Meta y TikTok, con variantes para testear.', 'Statics and carousels for Meta and TikTok, with variants to test.'],
  s3t: ['Landings', 'Landing pages'], s3d: ['Páginas de conversión diseñadas y montadas, listas para publicar.', 'Conversion pages designed and built, ready to publish.'],
  s4t: ['Contenido con IA', 'AI content'], s4d: ['Imagen y vídeo de producto, de campaña y personajes propios.', 'Product and campaign images and video, plus original characters.'],
  s5t: ['Edición de vídeo', 'Video editing'], s5d: ['Reels, TikTok y vídeo para ads, con subtítulos y versiones por formato.', 'Reels, TikTok and ad video, with captions and versions for every format.'],
  svcBtn: ['Pedir presupuesto', 'Get a quote'],
  svcInc: [
    [['Análisis de cliente ideal (ICP) y mapa de objeciones', 'Ángulos de comunicación para testear', 'Copy para anuncios, landings y orgánico', 'Guiones para UGC y vídeo'],
     ['Ideal customer profile (ICP) and objection map', 'Messaging angles to test', 'Copy for ads, landing pages and organic', 'Scripts for UGC and video']],
    [['Estáticos y carruseles para Meta y TikTok', 'Variantes por ángulo y formato para testing A/B', 'Adaptación a stories, feed y reels', 'Piezas listas para subir'],
     ['Statics and carousels for Meta and TikTok', 'Variants by angle and format for A/B testing', 'Adapted to stories, feed and reels', 'Files ready to upload']],
    [['Estructura y copy pensados para convertir', 'Diseño y montaje responsive', 'Variantes A/B y lead magnets', 'Lista para publicar'],
     ['Structure and copy built to convert', 'Design and responsive build', 'A/B variants and lead magnets', 'Ready to publish']],
    [['Imagen de producto y de campaña', 'Vídeo realista y animado con IA', 'Personajes y mundos propios para tu marca', 'Voces y avatares (ElevenLabs, HeyGen)'],
     ['Product and campaign imagery', 'Realistic and animated AI video', 'Original characters and worlds for your brand', 'Voices and avatars (ElevenLabs, HeyGen)']],
    [['Reels, TikTok y vídeo para ads', 'Hooks y ritmo pensados para retener', 'Subtítulos y versiones por formato', 'Edición de UGC'],
     ['Reels, TikTok and ad video', 'Hooks and pacing built to retain', 'Captions and versions for every format', 'UGC editing']],
  ],
  svcNote: ['Respondo en menos de 48 h.', 'I reply within 48 hours.']
};
function applyLang() {
  document.documentElement.lang = LANG;
  $$('[data-i18n]').forEach(el => { const v = STR[el.dataset.i18n]; if (v) el.textContent = v[LANG === 'en' ? 1 : 0]; });
  $$('.bar__lang [data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === LANG));
  // email de presupuesto ya preparado
  const subj = L('Quiero trabajar contigo', 'I’d like to work with you');
  const bodyTxt = L('Hola Ana,\n\nMarca:\nQué necesito:\nPlazo:\n\nGracias.', 'Hi Ana,\n\nBrand:\nWhat I need:\nTimeline:\n\nThanks.');
  $$('[data-svc]').forEach(ul => { const inc = STR.svcInc[+ul.dataset.svc - 1][LANG === 'en' ? 1 : 0]; ul.innerHTML = inc.map(t => `<li>${t}</li>`).join(''); });
  const hb = $('#hireBtn'); if (hb) hb.href = `mailto:hola.anaquintero@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(bodyTxt)}`;
}

/* =========================================================
   SONIDO: solo efectos, sintetizados (0 KB de audio)
   ========================================================= */
const sfx = (() => {
  let ctx = null, master = null, crackle = null;
  let on = store.get('aq-sound') !== 'off';
  const init = () => {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = on ? 1 : 0; master.connect(ctx.destination);
  };
  const noiseBuf = (secs, fn) => {
    const b = ctx.createBuffer(1, ctx.sampleRate * secs, ctx.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = fn(i, d.length);
    return b;
  };
  const env = (g, t, a, peak, dec) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + dec);
  };
  const api = {
    get on() { return on; },
    init,
    toggle() {
      on = !on; store.set('aq-sound', on ? 'on' : 'off');
      if (master) master.gain.setTargetAtTime(on ? 1 : 0, ctx.currentTime, 0.05);
      return on;
    },
    thump() {
      if (!ctx) return; const t = ctx.currentTime;
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf(0.25, (i, n) => (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3));
      const lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
      const g = ctx.createGain(); env(g, t, 0.004, 0.9, 0.22);
      src.connect(lp).connect(g).connect(master); src.start(t);
      const o = ctx.createOscillator(); o.frequency.setValueAtTime(95, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.2);
      const g2 = ctx.createGain(); env(g2, t, 0.005, 0.5, 0.25);
      o.connect(g2).connect(master); o.start(t); o.stop(t + 0.35);
    },
    crackleStart() {
      if (!ctx || crackle) return;
      const src = ctx.createBufferSource();
      src.buffer = noiseBuf(3, () => {
        const r = Math.random();
        if (r > 0.9993) return (Math.random() * 2 - 1) * 0.9;
        if (r > 0.996) return (Math.random() * 2 - 1) * 0.25;
        return (Math.random() * 2 - 1) * 0.018;
      });
      src.loop = true;
      const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 500;
      const g = ctx.createGain(); g.gain.value = 0; g.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.4);
      src.connect(hp).connect(g).connect(master); src.start();
      crackle = { src, g };
    },
    crackleStop(fade = 1.5) {
      if (!crackle) return; const { src, g } = crackle; crackle = null;
      const t = ctx.currentTime;
      g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(g.gain.value, t);
      g.gain.linearRampToValueAtTime(0, t + fade); src.stop(t + fade + 0.1);
    },
    beep(f = 1400, d = 0.08) {
      if (!ctx) return; const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.setValueAtTime(0.04, t); g.gain.setValueAtTime(0.0001, t + d);
      o.connect(g).connect(master); o.start(t); o.stop(t + d + 0.02);
    },
    tick() {
      if (!ctx) return; const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.frequency.value = 2200;
      const g = ctx.createGain(); env(g, t, 0.002, 0.04, 0.03);
      o.connect(g).connect(master); o.start(t); o.stop(t + 0.06);
    },
    scratch() {
      if (!ctx) return; const t = ctx.currentTime;
      const src = ctx.createBufferSource(); src.buffer = noiseBuf(0.5, () => Math.random() * 2 - 1);
      const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 6;
      bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(1800, t + 0.16); bp.frequency.exponentialRampToValueAtTime(350, t + 0.4);
      const g = ctx.createGain(); env(g, t, 0.02, 0.5, 0.4);
      src.connect(bp).connect(g).connect(master); src.start(t);
    }
  };
  return api;
})();

let toastT;
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200);
}

/* =========================================================
   INTRO · vinilo real (foto) + brazo recortado
   Coordenadas en "unidades" de la foto (1440 × 960)
   ========================================================= */
const intro = $('#intro'), deck = $('#deck'), label = $('#label'), arm = $('#arm'), veil = $('#veil'), hint = $('#hint');
const photo = $('.deck__photo'), spindle = $('.deck__spindle'), site = $('.site'), body = document.body;
const P = { w: 1440, h: 1360, cx: 826, cy: 768, rVinyl: 562, rLabel: 187,
  arm: { x: 82, y: 354.5, w: 709, h: 694, px: 62, py: 1062 }, tip: { x: 735, y: 500 }, rest: -20, turn: -23 };
let G = {}, armA = P.rest, touched = false, state = 'idle', rot = 0, omega = 0, entered = false;

function layout() {
  const W = innerWidth, H = innerHeight;
  // el vinilo ocupa el ancho de la pantalla
  const s = W / (P.rVinyl * 2) * (W / H < 1 ? 1.3 : 1.02);
  const left = W / 2 - P.cx * s, top = H / 2 - P.cy * s;
  Object.assign(deck.style, { width: P.w * s + 'px', height: P.h * s + 'px', left: left + 'px', top: top + 'px' });
  const m = `radial-gradient(circle at ${P.cx * s}px ${P.cy * s}px, #000 ${600 * s}px, transparent ${690 * s}px)`;
  photo.style.webkitMaskImage = m; photo.style.maskImage = m;
  const lr = P.rLabel * s;
  Object.assign(label.style, { left: P.cx * s - lr + 'px', top: P.cy * s - lr + 'px', width: 2 * lr + 'px', height: 2 * lr + 'px' });
  const sp = 9 * s;
  Object.assign(spindle.style, { left: P.cx * s - sp / 2 + 'px', top: P.cy * s - sp / 2 + 'px', width: sp + 'px', height: sp + 'px' });
  const a = P.arm;
  Object.assign(arm.style, { left: a.x * s + 'px', top: a.y * s + 'px', width: a.w * s + 'px', height: a.h * s + 'px',
    transformOrigin: `${(a.px - a.x) * s}px ${(a.py - a.y) * s}px` });
  // el plano se gira un poco para que el brazo entre por la esquina
  P.turn = W / H < 1 ? 35 : -23;
  const tr = P.turn * Math.PI / 180, vx = (a.px - P.cx) * s, vy = (a.py - P.cy) * s;
  G = { W, H, s, px: W / 2 + vx * Math.cos(tr) - vy * Math.sin(tr), py: H / 2 + vx * Math.sin(tr) + vy * Math.cos(tr) };
  deck.style.transformOrigin = `${P.cx * s}px ${P.cy * s}px`;
  deck.style.transform = `rotate(${P.turn}deg)`;
  setArm(armA);
}
function setArm(deg) { armA = deg; arm.style.transform = `rotate(${deg}deg)`; }
const p2a = p => P.rest * (1 - p);              // progreso 0..1 -> ángulo
const a2p = a => 1 - a / P.rest;

function tween(dur, fn, ease = t => 1 - Math.pow(1 - t, 3)) {
  return new Promise(res => {
    const t0 = performance.now();
    (function f(now) {
      const t = clamp((now - t0) / dur, 0, 1);
      fn(ease(t), t);
      t < 1 ? requestAnimationFrame(f) : res();
    })(t0);
  });
}
const wait = ms => new Promise(r => setTimeout(r, ms));
const easeInOut = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let last = performance.now();
function introLoop(now) {
  if (entered) return;
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  if (state === 'idle' && !touched && !reduced) {
    const w = (Math.sin(now / 700) + 1) / 2;
    setArm(p2a(Math.pow(w, 4) * 0.1));
  }
  const target = state === 'playing' || state === 'zoom' ? 360 * 0.55 : 0; // 33 rpm
  omega = lerp(omega, target, Math.min(1, dt * 1.2));
  rot += omega * dt;
  label.style.transform = `rotate(${rot}deg)`;
  requestAnimationFrame(introLoop);
}

function bindArm() {
  // posición en pantalla de la punta de la aguja para un ángulo del brazo
  const tip = deg => {
    const s = G.s, t = (deg + P.turn) * Math.PI / 180;
    const vx = (P.tip.x - P.arm.px) * s, vy = (P.tip.y - P.arm.py) * s;
    return { x: G.px + vx * Math.cos(t) - vy * Math.sin(t), y: G.py + vx * Math.sin(t) + vy * Math.cos(t) };
  };
  let drag = null;
  intro.addEventListener('pointerdown', e => {
    if (state !== 'idle' || e.target.closest('#skip')) return;
    e.preventDefault();
    sfx.init(); touched = true;
    const r = tip(P.rest), p = tip(0);
    drag = { x: e.clientX, y: e.clientY, p0: a2p(armA), dx: p.x - r.x, dy: p.y - r.y, id: e.pointerId, moved: 0 };
    try { intro.setPointerCapture(e.pointerId); } catch {}
  });
  intro.addEventListener('dragstart', e => e.preventDefault());
  intro.addEventListener('pointermove', e => {
    if (!drag || e.pointerId !== drag.id) return;
    const mx = e.clientX - drag.x, my = e.clientY - drag.y;
    drag.moved = Math.max(drag.moved, Math.hypot(mx, my));
    const p = drag.p0 + (mx * drag.dx + my * drag.dy) / (drag.dx * drag.dx + drag.dy * drag.dy);
    setArm(p2a(clamp(p, 0, 1.03)));
  });
  const up = () => {
    if (!drag) return;
    const click = drag.moved < 6; drag = null;
    if (click || a2p(armA) > 0.55) drop();   // un toque también vale
    else { const a0 = armA; tween(500, t => setArm(lerp(a0, P.rest, t))); }
  };
  intro.addEventListener('pointerup', up);
  intro.addEventListener('pointercancel', up);
  $('#playKey').addEventListener('click', () => { sfx.init(); touched = true; drop(); });
  addEventListener('keydown', e => { if (!entered && state === 'idle' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); sfx.init(); touched = true; drop(); } });
}

async function drop() {
  if (state !== 'idle') return;
  state = 'dropping';
  const a0 = armA;
  await tween(380, t => setArm(lerp(a0, 0, t)));
  // la aguja baja: la sombra se acerca
  arm.style.transition = 'filter .25s'; arm.style.filter = 'drop-shadow(5px 8px 5px rgba(0,0,0,.6))';
  sfx.thump(); sfx.crackleStart();
  if (navigator.vibrate) navigator.vibrate(15);
  state = 'playing';
  intro.classList.add('is-playing');
  if (reduced) return enter();
  await wait(1600);
  state = 'zoom';
  intro.classList.add('is-zooming');
  // zoom cinematográfico hacia el centro de la galleta
  const S = Math.hypot(G.W, G.H) / 2 / (P.rLabel * G.s * 0.45);
  await tween(2400, (t, raw) => {
    const sc = Math.exp(Math.log(S) * t);
    deck.style.transform = `rotate(${P.turn}deg) scale(${sc})`;
    deck.style.filter = raw > .55 ? `blur(${(raw - .55) * 10}px)` : '';
    veil.style.opacity = clamp((raw - .62) / .3, 0, 1);
  }, easeInOut);
  enter();
}

function enter() {
  if (entered) return;
  entered = true;
  sfx.crackleStop(2.4);
  window.scrollTo(0, 0);
  site.removeAttribute('aria-hidden');
  body.classList.remove('is-intro');
  intro.style.transition = 'opacity .6s'; intro.style.opacity = '0';
  setTimeout(() => intro.classList.add('is-gone'), 620);
  requestAnimationFrame(() => { body.classList.add('is-in'); layoutBlocks(); buildRoom(); });
  setTimeout(() => fanEl && fanEl.classList.add('is-ready'), 2200);   // tras la entrada, la tira sigue al scroll sin retraso
}

function initIntro() {
  layout();
  const ready = () => deck.classList.add('is-ready');
  photo.complete ? ready() : (photo.addEventListener('load', ready), setTimeout(ready, 2500));
  addEventListener('resize', () => { if (!entered) layout(); });
  bindArm();
  $('#skip').addEventListener('click', () => { sfx.init(); enter(); });
  requestAnimationFrame(introLoop);
}

/* =========================================================
   TRABAJO · 5 bloques (estrategia al final)
   ========================================================= */
const im = (name, dir, ar, cap, alt) => ({ k: 'img', thumb: `assets/thumb/${name}.jpg`, src: `assets/${dir}/${name}.jpg`, ar, cap, alt });
const vd = (name, dir, ar, cap, alt) => ({ k: 'vid', thumb: `assets/thumb/${name}.jpg`, src: `assets/${dir}/${name}.mp4?v=2`, ar, cap, alt });
const V = 9 / 16;
const BLOCKS = [
  { t: 'Diseño de ads', te: 'Ad design', items: [
    im('olistic-vision-board', 'creas', 1, 'Olistic', 'Anuncio de Olistic: si has puesto tener pelazo en tu Vision Board'),
    im('tuzona-foco', 'creas', .8, 'tuzona', 'Anuncio de tuzona: un coche amarillo iluminado por un foco'),
    im('elha-baloncesto', 'creas', .8, 'elha laser center', 'Anuncio de elha laser center: ¿juegas al baloncesto?'),
    im('olistic-que-pasa', 'creas', 1, 'Olistic', 'Anuncio de Olistic: ¿qué pasa si tomo Olistic?'),
    im('dehesa-golf', 'creas', .8, 'La Dehesa Club de Golf', 'Anuncio de La Dehesa: el único sitio donde no escucharás «Mamá, vámonos ya»'),
    im('olistic-tinte', 'creas', 1, 'Olistic', 'Anuncio de Olistic: ¿el tinte hizo que perdieras densidad?'),
    im('tuzona-alien', 'creas', .8, 'tuzona', 'Anuncio de tuzona: aparca en Madrid sin dar vueltas'),
    im('olistic-gracias', 'creas', 1, 'Olistic', 'Anuncio de Olistic: gracias a Olistic Women'),
    im('elha-2', 'creas', .8, 'elha laser center', 'Anuncio de elha laser center: esto y que el vello no te moleste'),
    im('olistic-3', 'creas', 1, 'Olistic', 'Anuncio de Olistic: además de mejorar tu pelo, aporta energía'),
    im('tuzona-cenital', 'creas', .8, 'tuzona', 'Anuncio de tuzona: vista cenital de un aparcamiento'),
    im('olistic-ayuda', 'creas', 1, 'Olistic', 'Anuncio de Olistic: te ayuda a tener pelazo'),
    im('olistic-4', 'creas', 1, 'Olistic', 'Anuncio de Olistic: ¿tu peluquera cortó demasiado?')
  ] },
  { t: 'Landings', te: 'Landing pages', webs: [
    { src: 'landings/tuzona/index.html', t: 'tuzona' },
    { src: 'landings/preply/index.html', t: 'Preply' },
    { src: 'landings/rhode/index.html', t: 'rhode' }
  ] },
  { t: 'Generaciones con IA', te: 'AI content', depth: true, items: [
    vd('xcape-bate', 'video', V, 'Xcape', 'Vídeo de Xcape: dos chicos y un bate'),
    im('rare-marmol', 'rare', 1, 'Rare', 'Perfume Rare sobre bandeja dorada y mármol rosa'),
    vd('mogu-empleado', 'video', V, 'Mogu', 'Vídeo de Mogu: el empleado del mes'),
    im('sofa', 'felt', .557, 'Fieltro', 'Escena de fieltro: sofá'),
    im('rare-manos', 'rare', .75, 'Rare', 'Tres manos sostienen el perfume Rare'),
    vd('tuzona-huecos', 'video', V, 'tuzona', 'Vídeo de tuzona: hay huecos'),
    im('rare-ojos', 'rare', .75, 'Rare', 'Modelo riendo con dos frascos de Rare sobre los ojos'),
    vd('travel-museo', 'video', V, 'Agencia de viajes', 'Vídeo animado de una agencia de viajes'),
    im('mirror', 'felt', .557, 'Fieltro', 'Escena de fieltro: espejo'),
    vd('rare-perfume', 'video', .751, 'Rare', 'Perfume Rare con un brillo cálido'),
      vd('ugc-storytime', 'video', V, 'UGC', 'Vídeo UGC: una chica cuenta su historia'),
    vd('avatar-anuncios', 'video', V, 'Avatar de fieltro', 'Avatar de fieltro trabajando en el portátil'),
    im('rare-cama', 'rare', .75, 'Rare', 'Modelo en la cama con el perfume Rare')
  ] },
  { t: 'Edición de vídeo', te: 'Video editing', items: [
    vd('mogu', 'video', 16 / 9, 'Mogu', 'Vídeo de Mogu: pídeselo a Mogu'),
    vd('avatar-lista', 'video', V, 'Avatar de fieltro', 'Avatar de fieltro en el sofá, con subtítulos'),
    vd('plastilina-eng', 'video', V, 'Plastilina', 'Vídeo de plastilina en inglés'),
    vd('nn-ahorro', 'video', .8, 'Nationale-Nederlanden', 'Vídeo de Nationale-Nederlanden sobre ahorro'),
    vd('tuzona-motion', 'creas', V, 'tuzona', 'Anuncio en motion de tuzona'),
    vd('hogar-esencial', 'video', .8, 'Hogar Esencial', 'Vídeo de Hogar Esencial: contratación online'),
    vd('avatar-inventado', 'video', V, 'Avatar de fieltro', 'Avatar de fieltro cruza un pasillo de láseres')
  ] },
  { t: 'Estrategia y copy', te: 'Strategy & copy', kind: 'copy' }
];
const COPIES = [
  ['Titular web', 'Soluciones innovadoras para optimizar la gestión de tu negocio.', 'Cierra el mes en dos horas, no en dos días.'],
  ['Anuncio', '¡Descubre nuestra nueva colección! Calidad y estilo al mejor precio.', 'El jersey que te vas a poner tres veces por semana.'],
  ['Post', 'Hoy os queremos hablar de la importancia de cuidar tu piel.', 'Tu piel no necesita diez productos. Necesita dos que funcionen.']
];
const ANGLES = [
  ['Tiempo', 'Tu rutina, en un solo paso.'],
  ['Desconfianza', 'Un sérum con resultados reales.'],
  ['Prueba social', 'Más de 4.000 mujeres ya confían en nosotros. ¿Cuándo nos pruebas tú?']
];
const COPIES_EN = [
  ['Website headline', 'Innovative solutions to optimise your business management.', 'Close the month in two hours, not two days.'],
  ['Ad', 'Discover our new collection! Quality and style at the best price.', 'The jumper you’ll wear three times a week.'],
  ['Post', 'Today we want to talk about the importance of looking after your skin.', 'Your skin doesn’t need ten products. It needs two that work.']
];
const ANGLES_EN = [
  ['Time', 'Your routine, in one step.'],
  ['Distrust', 'A serum with real results.'],
  ['Social proof', 'Over 4,000 women already trust us. When will you try it?']
];
const copies = () => LANG === 'en' ? COPIES_EN : COPIES;
const angles = () => LANG === 'en' ? ANGLES_EN : ANGLES;
const bt = b => L(b.t, b.te);
const PLAY = '<svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>';
// patrones de vuelo (posición x en %, ancho, giro, velocidad)
const PAT = [
  { x: .08, w: .22, r: -5, v: 1 }, { x: .62, w: .19, r: 4, v: 1.25 }, { x: .34, w: .25, r: -2, v: .85 },
  { x: .74, w: .21, r: 6, v: 1.1 }, { x: .04, w: .18, r: 3, v: 1.3 }, { x: .44, w: .2, r: -6, v: 1.05 },
  { x: .18, w: .24, r: 5, v: .9 }, { x: .66, w: .23, r: -3, v: 1.2 }
];

function titleHTML(t) {
  const parts = t.split(' ');
  if (parts.length < 2) return t;
  return `${parts[0]}<br><span class="fly__t2">${parts.slice(1).join(' ')}</span>`;
}

function renderBlocks() {
  const C = copies(), A = angles(), trk = L('Pista', 'Track');
  $('#trabajo').innerHTML = BLOCKS.map((b, bi) => {
    const n = String(bi + 1).padStart(2, '0');
    let inner = '';
    if (b.items) inner = b.items.map((it, i) => `<figure class="fp" data-k="media" style="--ar:${it.ar}" data-ar="${it.ar}">
        <button type="button" class="fp__media" data-i="${i}" aria-label="${it.k === 'vid' ? L('Ver vídeo', 'Watch video') : L('Ver en grande', 'View larger')}: ${it.cap}">
          <img src="${it.thumb}" srcset="${it.thumb} 720w${it.k === 'vid' ? '' : `, ${it.src} 1200w`}" sizes="(max-width:820px) 60vw, 26vw" alt="" loading="lazy" decoding="async">
          ${it.k === 'vid' ? `<video muted loop playsinline preload="none" data-src="${it.src}"></video><span class="fp__play" aria-hidden="true">${PLAY}</span>` : ''}
        </button></figure>`).join('');
    else if (b.webs) inner = b.webs.map(w => `<figure class="fp" data-k="web" data-ar="1.45">
        <button type="button" class="web" data-web="${w.src}" data-title="${w.t}" aria-label="${L('Ver la landing de', 'View the landing page for')} ${w.t}">
          <span class="web__bar" aria-hidden="true"><i></i><i></i><i></i></span>
          <span class="web__view"><img src="assets/landing-prev/${w.src.split('/')[1]}-sm.webp" srcset="assets/landing-prev/${w.src.split('/')[1]}-sm.webp 720w, assets/landing-prev/${w.src.split('/')[1]}.webp 1440w" sizes="(max-width:820px) 86vw, 43vw" alt="" loading="lazy" decoding="async"></span>
          <span class="web__go">${L('Ver landing', 'View page')}</span>
        </button></figure>`).join('');
    else return `<section class="fly fly--static" id="b${n}" data-b="${bi}" aria-labelledby="bt${n}">
      <div class="still">
        <h2 class="fly__title still__title" id="bt${n}">${titleHTML(bt(b))}</h2>
        <div class="still__cards">
      <div class="card card--rose">
        <span class="card__k">${L('Antes y después', 'Before and after')}</span>
        <div class="tabs" role="tablist">${C.map((c, i) => `<button type="button" role="tab" aria-selected="${!i}" class="${i ? '' : 'is-on'}" data-copy="${i}">${c[0]}</button>`).join('')}</div>
        <div class="ba" style="--pos:50%"><span class="ba__hint" aria-hidden="true">${L('Desliza', 'Slide')} →</span>
          <div class="ba__side ba__before"><span class="ba__lbl">${L('Antes', 'Before')}</span><p data-before>${C[0][1]}</p></div>
          <div class="ba__side ba__after"><span class="ba__lbl">${L('Después', 'After')}</span><p data-after>${C[0][2]}</p></div>
          <span class="ba__handle" aria-hidden="true"></span>
          <input type="range" min="0" max="100" value="50" aria-label="${L('Comparar antes y después', 'Compare before and after')}">
        </div></div>
        </div>
      </div>
    </section>`;
    return `<section class="fly${b.depth ? ' fly--depth' : ''}" id="b${n}" data-b="${bi}" aria-labelledby="bt${n}">
      <div class="fly__pin">
        <h2 class="fly__title" id="bt${n}">${titleHTML(bt(b))}</h2>
        <div class="fly__layer">${inner}</div>
      </div>
    </section>`;
  }).join('');
}

/* --- hero: abanico de portadas que lanza el vinilo --- */
// hero: tira curva como la referencia, con las piezas de Rare Beauty (más finas)
const FAN = [
  im('rare-ojos', 'rare', .75, 'Rare', 'Modelo riendo con dos frascos de Rare sobre los ojos'),
  im('rare-manos', 'rare', .75, 'Rare', 'Tres manos sostienen el perfume Rare'),
  vd('rare-perfume', 'video', .751, 'Rare', 'Perfume Rare con un brillo cálido'),
  im('rare-marmol', 'rare', 1, 'Rare', 'Perfume Rare sobre bandeja dorada y mármol rosa'),
  im('rare-cama', 'rare', .75, 'Rare', 'Modelo en la cama con el perfume Rare')
];
function renderFan() {
  const list = innerWidth <= 820 ? FAN.slice(1, 4) : FAN;
  const c = (list.length - 1) / 2;
  $('#fan').innerHTML = `<div class="fan__strip">${list.map((it, i) => {
    const k = i - c;
    return `<button type="button" class="fan__card" data-i="${i}" style="--k:${k};--ak:${Math.abs(k)};--d:${(Math.abs(k) * 90 + 150)}ms" aria-label="${L('Ver en grande', 'View larger')}: ${it.alt}">
      <img src="${it.thumb}" alt="" decoding="async">${it.k === 'vid' ? `<span class="fp__play" aria-hidden="true">${PLAY}</span>` : ''}</button>`;
  }).join('')}</div>`;
  $('#fan').onclick = e => { const b = e.target.closest('.fan__card'); if (b) openLupa(list, +b.dataset.i); };
}
// al deslizar, la tira se aplana, se desplaza y crece un poco
const fanEl = $('#fan');
function updateFan(y, vh) {
  if (!fanEl || y > vh * 1.4) return;
  const p = clamp(y / (vh * .9), 0, 1);
  fanEl.style.setProperty('--p', p.toFixed(4));
}

/* --- vuelo: cada pieza sube a su velocidad mientras el título queda fijo --- */
let blockData = [];
function layoutBlocks() {
  const W = innerWidth, H = innerHeight, mobile = W <= 820;
  blockData = $$('.fly').map(sec => {
    if (sec.classList.contains('fly--static')) return { sec, pieces: [], T: Math.max(1, sec.offsetHeight - H) };
    const els = $$('.fp', sec), web = els[0] && els[0].dataset.k === 'web';
    if (sec.classList.contains('fly--depth')) {
      // las piezas vienen desde el fondo, repartidas alrededor del título
      const n = els.length, FAR = 3200, NEAR = 760, GAP = 380;
      const T = n * H * (mobile ? .34 : .3);
      const speed = (NEAR + FAR + (n - 1) * GAP) / T;
      const pieces = els.map((el, i) => {
        const ar = +el.dataset.ar;
        const w = Math.min(W * (mobile ? .46 : .17), H * .42 * ar);
        el.style.width = w + 'px';
        const h = w / ar, a = i * 2.39996 + .6;
        const rx = W * (mobile ? .3 : .3), ry = H * (mobile ? .3 : .28);
        return { el, w, h, depth: true, x: W / 2 + Math.cos(a) * rx - w / 2, y: H / 2 + Math.sin(a) * ry - h / 2,
          z0: -FAR - i * GAP, speed, FAR, NEAR };
      });
      sec.style.height = T + H + 'px';
      return { sec, pieces, T };
    }
    // carriles: en escritorio 3 (2 para landings); en móvil una columna que alterna lados
    const lanes = mobile ? 1 : web ? 2 : 3;
    const laneW = mobile ? W * .74 : web ? W * .43 : W * .27;
    const laneX = mobile ? [0] : web ? [W * .05, W * .52] : [W * .05, W * .365, W * .68];
    const order = lanes === 3 ? [0, 2, 1] : [0, 1];
    const laneBottom = new Array(lanes).fill(-1e9);
    let prevY = H * .7 - (mobile ? H * .1 : H * .22);
    const pieces = els.map((el, i) => {
      const ar = +el.dataset.ar, p = PAT[i % PAT.length];
      let w = laneW * (web ? 1 : .82 + (p.w - .17) * 1.6);
      w = Math.min(w, laneW, H * (mobile ? .58 : .62) * ar);
      el.style.width = w + 'px';
      const h = w / ar;
      const lane = mobile ? 0 : order[i % order.length];
      const x = mobile ? (i % 2 ? W - w - W * .05 : W * .05) : laneX[lane] + (laneW - w) * ((i * 37 % 10) / 10);
      const margin = H * .06;
      const y0 = mobile ? prevY + (i ? margin : 0) : Math.max(prevY + H * .24, laneBottom[lane] + margin);
      laneBottom[lane] = y0 + h;
      prevY = mobile ? y0 + h : y0;
      const r = (mobile ? .5 : 1) * p.r * .55;
      return { el, w, h, x, y0, r };
    });
    // la sección deja de estar fija cuando el último elemento llega a la mitad de la pantalla
    const last = pieces.reduce((m, q) => (q.y0 + q.h / 2 > m.y0 + m.h / 2 ? q : m), pieces[0]);
    const T = Math.max(1, last.y0 + last.h / 2 - H / 2);
    sec.style.height = T + H + 'px';
    return { sec, pieces, T };
  });
  fitWebs();
  onScroll();
}
function fitWebs() {
  $$('.web__view').forEach(v => { const f = $('iframe', v); if (f) f.style.transform = `scale(${v.clientWidth / 1440})`; });
}

/* --- interacciones de piezas --- */
function initPieces() {
  $$('.fly').forEach(sec => {
    const b = BLOCKS[+sec.dataset.b];
    if (b.items) {
      sec.addEventListener('click', e => { const m = e.target.closest('.fp__media'); if (m) openLupa(b.items, +m.dataset.i); });
      if (finePointer) $$('.fp', sec).forEach(p => {
        const v = $('video', p); if (!v) return;
        p.addEventListener('mouseenter', () => { if (!v.src) v.src = v.dataset.src; v.play().then(() => p.classList.add('is-playing')).catch(() => {}); });
        p.addEventListener('mouseleave', () => { v.pause(); p.classList.remove('is-playing'); });
      });
    }
  });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    $$('iframe', e.target).forEach(f => { if (!f.src) f.src = f.dataset.src; });
    io.unobserve(e.target);
  }), { rootMargin: '600px 0px' });
  $$('.fly').forEach(s => { if ($('iframe', s)) io.observe(s); });
  $$('[data-web]').forEach(b => b.addEventListener('click', () => openVisor(b.dataset.web, b.dataset.title, innerWidth > 820 ? 'desktop' : 'mobile')));

  const ba = $('.ba');
  if (ba) {
    const range = $('input', ba);
    const setPos = v => { range.value = v; ba.style.setProperty('--pos', v + '%'); };
    range.addEventListener('input', () => { setPos(range.value); ba.classList.add('is-used'); });
    $$('[data-copy]').forEach(btn => btn.addEventListener('click', () => {
      sfx.tick();
      $$('[data-copy]').forEach(x => { x.classList.toggle('is-on', x === btn); x.setAttribute('aria-selected', x === btn); });
      const c = copies()[+btn.dataset.copy];
      $('[data-before]', ba).textContent = c[1]; $('[data-after]', ba).textContent = c[2];
      ba.classList.remove('is-used'); setPos(50);
    }));
    const head = $('.icp__head');
    if (head)
    $$('[data-angle]').forEach(btn => btn.addEventListener('click', () => {
      sfx.tick();
      $$('[data-angle]').forEach(x => { x.classList.toggle('is-on', x === btn); x.setAttribute('aria-selected', x === btn); });
      head.classList.add('swap');
      setTimeout(() => { head.textContent = angles()[+btn.dataset.angle][1]; head.classList.remove('swap'); }, 220);
    }));
  }
}

/* --- lupa --- */
let lupaItems = [], lupaI = 0, lastFocus = null;
const lupa = $('#lupa'), lupaStage = $('#lupaStage');
function renderLupa() {
  const it = lupaItems[lupaI];
  lupaStage.innerHTML = it.k === 'vid'
    ? `<video src="${it.src}" poster="${it.thumb}" controls autoplay playsinline aria-label="${it.alt}"></video>`
    : `<img src="${it.src}" alt="${it.alt}">`;
}
function openLupa(items, i) {
  sfx.tick(); lastFocus = document.activeElement;
  lupaItems = items; lupaI = i; renderLupa();
  lupa.hidden = false; body.style.overflow = 'hidden'; $('[data-close]', lupa).focus();
}
function closeLupa() { lupa.hidden = true; lupaStage.innerHTML = ''; body.style.overflow = ''; lastFocus?.focus(); }
const stepLupa = d => { lupaI = (lupaI + d + lupaItems.length) % lupaItems.length; renderLupa(); };
lupa.addEventListener('click', e => {
  if (e.target.closest('[data-close]') || e.target === lupa) return closeLupa();
  const s = e.target.closest('[data-step]'); if (s) stepLupa(+s.dataset.step);
});

/* --- visor landings --- */
const visor = $('#visor'), vFrame = $('#visorFrame');
function setMode(m) { vFrame.classList.toggle('is-mobile', m === 'mobile'); $$('.visor__modes button').forEach(b => b.classList.toggle('is-on', b.dataset.mode === m)); }
function openVisor(src, title, mode) {
  sfx.tick(); lastFocus = document.activeElement;
  $('#visorT').textContent = title; $('iframe', vFrame).src = src; setMode(mode);
  visor.hidden = false; body.style.overflow = 'hidden'; $('[data-close]', visor).focus();
}
function closeVisor() { visor.hidden = true; $('iframe', vFrame).src = 'about:blank'; body.style.overflow = ''; lastFocus?.focus(); }
visor.addEventListener('click', e => {
  if (e.target.closest('[data-close]')) return closeVisor();
  const b = e.target.closest('[data-mode]'); if (b) setMode(b.dataset.mode);
});
addEventListener('keydown', e => {
  if (!lupa.hidden) {
    if (e.key === 'Escape') closeLupa();
    if (e.key === 'ArrowRight') stepLupa(1);
    if (e.key === 'ArrowLeft') stepLupa(-1);
  } else if (!visor.hidden && e.key === 'Escape') closeVisor();
});

/* =========================================================
   SCROLL: piezas volando, "Ahora suena", barra
   ========================================================= */
const player = $('#player'), playerT = $('#playerT'), playerBar = $('#playerBar');
const bar = $('#bar');
let curBlock = -1, discRot = 0, lastY = 0, ticking = false;

function onScroll() {
  ticking = false;
  const vh = innerHeight, y = scrollY;
  let active = -1, prog = 0;
  blockData.forEach((d, i) => {
    const r = d.sec.getBoundingClientRect();
    const t = clamp(-r.top, 0, d.T);
    const visible = r.top < vh && r.bottom > 0;
    if (visible) d.pieces.forEach(p => {
      if (p.depth) {
        const z = p.z0 + t * p.speed;
        const o = clamp((z + p.FAR) / 900, 0, 1) * clamp((p.NEAR - z) / 420, 0, 1);
        p.el.style.transform = `translate3d(${p.x}px,${p.y}px,${z}px)`;
        p.el.style.opacity = o;
        p.el.style.visibility = o < .01 ? 'hidden' : 'visible';
        p.el.style.pointerEvents = o > .12 ? 'auto' : 'none';
        return;
      }
      const py = p.y0 - t;
      p.el.style.transform = `translate3d(${p.x}px,${py}px,0) rotate(${p.r}deg)`;
      p.el.style.visibility = py > vh + 40 || py < -p.h - 80 ? 'hidden' : 'visible';
    });
    if (r.top <= vh * .5 && r.bottom > vh * .5) { active = i; prog = t / d.T; }
  });
  player.classList.toggle('on', active >= 0);
  if (active >= 0) {
    if (active !== curBlock) { curBlock = active; playerT.textContent = `${String(active + 1).padStart(2, '0')} · ${bt(BLOCKS[active])}`; }
    playerBar.style.width = prog * 100 + '%';
  }
  discRot += (y - lastY) * 0.5; lastY = y;
  bar.classList.toggle('is-solid', y > vh * 0.6);
  updateFan(y, vh);
  updateRoom(vh);
}
addEventListener('scroll', () => {
  if (document.hidden) return onScroll();          // sin pintado (pestaña oculta) se actualiza igual
  if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
}, { passive: true });
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (entered) { layoutBlocks(); buildRoom(); } }, 150); });

/* =========================================================
   FINAL · sala redonda con las portadas
   ========================================================= */
const COVERS = ['olistic-vision-board', 'tuzona-foco', 'rare-marmol', 'elha-baloncesto', 'mogu', 'olistic-que-pasa', 'xcape-bate', 'dehesa-golf',
  'rare-manos', 'tuzona-alien', 'nn-ahorro', 'olistic-tinte', 'sofa', 'travel-museo', 'rare-ojos', 'olistic-gracias', 'tuzona-huecos',
  'elha-2', 'plastilina-eng', 'rare-contraluz', 'olistic-3', 'mogu-empleado', 'tuzona-cenital', 'hogar-esencial', 'rare-perfume',
  'olistic-ayuda', 'ugc-storytime', 'mirror', 'tuzona-motion', 'rare-cama', 'olistic-4', 'avatar-lista', 'rare-reflejo'];
const room = $('#sala'), roomScene = $('#roomScene'), roomWash = $('#roomWash'), roomEnd = $('#roomEnd');
let roomR = 900;
function buildRoom() {
  if (!roomScene) return;
  const W = innerWidth, H = innerHeight, mobile = W <= 820;
  roomR = mobile ? 560 : Math.max(900, W * .62);
  const size = mobile ? 74 : 118, gap = mobile ? 12 : 16;
  const per = Math.floor(2 * Math.PI * roomR / (size + gap));
  const rows = 7, rowH = size * 1.6;
  let html = '', k = 0;
  for (let r = 0; r < rows; r++) {
    // estanterías por tramos, como en una sala real
    const segs = r % 3 === 0 ? [[0, per]] : [[(r * 5) % per, Math.floor(per * .34)], [(r * 5 + Math.floor(per * .5)) % per, Math.floor(per * .26)]];
    segs.forEach(([start, len]) => {
      for (let j = 0; j < len; j++) {
        const idx = (start + j) % per, ang = idx * 360 / per;
        const c = COVERS[(k++ * 7) % COVERS.length];
        html += `<span class="cv" style="width:${size}px;height:${size}px;transform:rotateY(${ang}deg) translateZ(${-roomR}px) translateY(${-r * rowH}px)"><img src="assets/cover/${c}.jpg" alt="" loading="lazy" decoding="async" width="260" height="260"></span>`;
      }
    });
  }
  roomScene.innerHTML = html;
  roomScene.style.setProperty('--size', size + 'px');
}
function updateRoom(vh) {
  if (!room) return;
  const r = room.getBoundingClientRect();
  if (r.top > vh || r.bottom < 0) return;
  const p = clamp(-r.top / (r.height - vh), 0, 1);
  // de ciruela a blanco y la cámara se aleja hasta el centro de la sala, mirando hacia arriba
  roomWash.style.opacity = clamp(p / .35, 0, 1);
  const e = 1 - Math.pow(1 - clamp((p - .12) / .8, 0, 1), 3);
  const zoom = lerp(roomR * .93, 0, e), tilt = lerp(-4, -26, e), spin = lerp(-10, 18, p);
  roomScene.style.transform = `translateZ(${zoom}px) rotateX(${tilt}deg) rotateY(${spin}deg)`;
  roomScene.style.opacity = clamp((p - .08) / .2, 0, 1);
  roomEnd.style.opacity = clamp((p - .82) / .12, 0, 1);
  bar.classList.toggle('on-room', p > .25);
}

function initPlayer() {
  const go = d => {
    sfx.tick();
    const i = clamp((curBlock < 0 ? -1 : curBlock) + d, 0, BLOCKS.length - 1);
    const sec = $$('.fly')[i];
    window.scrollTo({ top: sec.getBoundingClientRect().top + scrollY + 2, behavior: reduced ? 'auto' : 'smooth' });
  };
  $('#prevT').addEventListener('click', () => go(-1));
  $('#nextT').addEventListener('click', () => go(1));
}

/* =========================================================
   MINIJUEGO · el vinilo que salta (pantalla del móvil, 84 px de ancho)
   ========================================================= */
function vinylRunner(lcd, { beep }) {
  const cv = document.createElement('canvas'); cv.className = 'lcd__game'; cv.setAttribute('aria-hidden', 'true');
  const over = document.createElement('p'); over.className = 'lcd__over'; over.setAttribute('aria-live', 'polite');
  lcd.append(cv, over);
  const g = cv.getContext('2d');
  const W = 84, H = 46, GROUND = 40, INK = 'rgba(46,42,12,.9)';
  cv.width = W; cv.height = H;
  const soft = $$('.lcd__soft span', lcd);
  let on = false, run = false, dead = false, raf = 0, t0 = 0, backT = 0;
  let y, vy, speed, dist, obs, nextGap, score, best = +(store.get('aq-best') || 0);
  // dígitos de 3x5 píxeles para el marcador
  const DIG = ['111101101101111', '010110010010111', '111001111100111', '111001111001111', '101101111001001',
               '111100111001111', '111100111101111', '111001001001001', '111101111101111', '111101111001111'];
  const px = (x, yy, w = 1, h = 1) => g.fillRect(Math.round(x), Math.round(yy), w, h);
  function num(n, x) {
    String(n).padStart(4, '0').split('').forEach((c, i) => {
      const m = DIG[+c];
      for (let k = 0; k < 15; k++) if (m[k] === '1') px(x + i * 4 + (k % 3), 1 + Math.floor(k / 3));
    });
  }
  function reset() { y = GROUND; vy = 0; speed = 0.9; dist = 0; obs = []; nextGap = 40; score = 0; dead = false; }
  function spawn() {
    const r = Math.random();
    // casete (bajo y ancho), altavoz (alto) o dos casetes seguidos
    if (r < .45) obs.push({ x: W + 2, w: 8, h: 5, k: 'tape' });
    else if (r < .8) obs.push({ x: W + 2, w: 5, h: 9, k: 'spk' });
    else { obs.push({ x: W + 2, w: 8, h: 5, k: 'tape' }); obs.push({ x: W + 11, w: 8, h: 5, k: 'tape' }); }
    nextGap = 34 + Math.random() * 36 + speed * 8;
  }
  function draw(frame) {
    g.clearRect(0, 0, W, H); g.fillStyle = INK;
    // suelo con rayas que avanzan
    px(0, GROUND + 1, W, 1);
    for (let i = 0; i < 9; i++) px(((i * 11 - dist * 1) % W + W) % W, GROUND + 3, 2, 1);
    // vinilo: disco de 7 px con galleta y agujero; gira mostrando un reflejo
    const cx = 12, cy = Math.round(y) - 3;
    for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
      const r2 = dx * dx + dy * dy;
      if (r2 <= 10 && r2 > 1) px(cx + dx, cy + dy);
    }
    g.clearRect(cx, cy, 1, 1);
    const a = frame / 3, sx = Math.round(Math.cos(a) * 2), sy = Math.round(Math.sin(a) * 2);
    g.clearRect(cx + sx, cy + sy, 1, 1);
    // obstáculos
    obs.forEach(o => {
      const ox = Math.round(o.x), top = GROUND + 1 - o.h;
      if (o.k === 'tape') { px(ox, top, o.w, o.h); g.clearRect(ox + 1, top + 1, o.w - 2, 2); px(ox + 2, top + 1); px(ox + o.w - 3, top + 1); }
      else { px(ox, top, o.w, o.h); g.clearRect(ox + 1, top + 1, 3, 3); px(ox + 2, top + 2); g.clearRect(ox + 1, top + 5, 3, 2); }
    });
    num(score, W - 17);
  }
  let frame = 0;
  function tick(now) {
    if (!on) return;
    raf = requestAnimationFrame(tick);
    if (now - t0 < 1000 / 60) return; t0 = now;
    frame++;
    if (run && !dead) {
      speed = Math.min(2.6, speed + 0.0009);
      dist += speed; score = Math.floor(dist / 4);
      vy += 0.28; y = Math.min(GROUND, y + vy); if (y === GROUND) vy = 0;
      obs.forEach(o => o.x -= speed); obs = obs.filter(o => o.x > -12);
      nextGap -= speed; if (nextGap <= 0) spawn();
      // choque (caja del disco algo más pequeña para ser justos)
      const top = y - 6;
      for (const o of obs) if (o.x < 14 && o.x + o.w > 10 && y - 1 > GROUND + 1 - o.h && top < GROUND) { crash(); break; }
      if (score && score % 100 === 0 && frame % 6 === 0) beep(1900, 0.03);
    }
    if (!dead) draw(frame);
  }
  function crash() {
    dead = true; run = false; beep(220, 0.25);
    g.clearRect(0, 0, W, H); g.fillStyle = INK; px(0, GROUND + 1, W, 1);
    if (score > best) { best = score; store.set('aq-best', best); }
    over.innerHTML = L(`Fin · ${score}`, `Game over · ${score}`) + `<br><small>${score >= best && score ? L('¡Nuevo récord!', 'New record!') : L(`Récord: ${best}`, `Best: ${best}`)}</small>`;
    over.classList.add('on');
    // tras perder, vuelve al menú de contacto
    clearTimeout(backT); backT = setTimeout(() => api.exit(), 1700);
  }
  function labels() {
    soft[0].textContent = on ? L('← Salir', '← Exit') : STR.soft1[LANG === 'en' ? 1 : 0];
    soft[1].textContent = on ? L('Saltar', 'Jump') : STR.soft2[LANG === 'en' ? 1 : 0];
  }
  const api = {
    get on() { return on; },
    press() {
      if (!on) { on = true; lcd.classList.add('is-game'); labels(); t0 = 0; raf = requestAnimationFrame(tick); }
      if (dead) return;                       // enseñando la puntuación: se vuelve solo al menú
      if (!run) { reset(); run = true; over.classList.remove('on'); }
      if (y >= GROUND - 0.01) { vy = -3.6; beep(1500, 0.04); }
    },
    exit() { clearTimeout(backT); on = false; run = false; dead = false; cancelAnimationFrame(raf); lcd.classList.remove('is-game'); over.classList.remove('on'); labels(); }
  };
  return api;
}

/* =========================================================
   CONTACTO · móvil antiguo
   ========================================================= */
function initPhone() {
  const lcd = $('#lcd'), msg = $('#lcdMsg'), items = $$('#lcdMenu [data-i]');
  const mail = 'hola.anaquintero@gmail.com';
  let sel = 0, timer, buf = '', presses = 0;
  const paint = () => items.forEach((el, i) => el.classList.toggle('is-sel', i === sel));
  paint();
  const show = (html, ms = 2200) => {
    msg.innerHTML = html; lcd.classList.add('is-msg');
    clearTimeout(timer); timer = setTimeout(() => { lcd.classList.remove('is-msg'); buf = ''; }, ms);
  };
  const move = d => { sfx.init(); sfx.beep(1300, 0.05); sel = (sel + d + items.length) % items.length; paint(); };
  const hideMsg = () => { clearTimeout(timer); lcd.classList.remove('is-msg'); };
  items.forEach((el, i) => {
    el.addEventListener('mouseenter', () => { sel = i; paint(); });
    el.addEventListener('focus', () => { sel = i; paint(); });
  });
  items[1].addEventListener('click', async () => {
    sfx.init(); sfx.beep(1600, 0.06);
    try { await navigator.clipboard.writeText(mail); show(L('Email<br>copiado', 'Email<br>copied')); }
    catch { show(mail, 3500); }
  });
  items[0].addEventListener('click', () => show(L('Abriendo<br>email...', 'Opening<br>email...')));
  items[2].addEventListener('click', () => show(L('Abriendo<br>LinkedIn...', 'Opening<br>LinkedIn...')));

  const tones = { 1: 697, 2: 770, 3: 852, 4: 941, 5: 1209, 6: 1336, 7: 1477, 8: 1633, 9: 1100, 0: 1000, '*': 900, '#': 1500 };
  const game = vinylRunner(lcd, { beep: (f, t) => { sfx.init(); sfx.beep(f, t); } });
  const tip = $('.phone-tip');

  // Las teclas responden al APRETAR (pointerdown): el móvil se inclina y flota,
  // y con "click" la pulsación se perdía si la tecla se movía entre apretar y soltar.
  // Con teclado (Intro/espacio sobre el botón) llega un click con detail 0 y también vale.
  function onKey(el, fn) {
    el.addEventListener('pointerdown', e => { if (e.button > 0) return; e.preventDefault(); fn(); });
    el.addEventListener('click', e => { if (e.detail === 0) fn(); });
  }
  const press = k => () => {
    if (k === 'up') return game.on ? game.press() : move(-1);
    if (k === 'down') return game.on ? game.press() : move(1);
    if (k === 'ok') { sfx.init(); sfx.beep(1600, 0.06); return game.on ? game.press() : items[sel].click(); }
    if (k === 'back') { sfx.init(); sfx.beep(900, 0.05); if (game.on) return game.exit(); hideMsg(); sel = 0; return paint(); }
    // números, * y #: arrancan el juego (y saltan mientras se juega)
    sfx.init(); sfx.beep(tones[k] || 1200, 0.05); hideMsg(); game.press();
    if (tip) tip.classList.add('is-played');
  };
  onKey($('#navUp'), press('up'));
  onKey($('#navDown'), press('down'));
  onKey($('#softR'), press('ok'));
  onKey($('#softL'), press('back'));
  $$('#keys [data-k]').forEach(b => onKey(b, press(b.dataset.k)));
  new IntersectionObserver(es => { if (!es[0].isIntersecting && game.on) game.exit(); }).observe(lcd);
  lcd.addEventListener('pointerdown', e => { if (game.on) { e.preventDefault(); game.press(); } });
  addEventListener('keydown', e => {
    if (!game.on) return;
    if (e.key === 'Escape' || e.key === 'Backspace') { e.preventDefault(); return game.exit(); }
    if (e.key.length === 1 || e.key.startsWith('Arrow') || e.key === 'Enter') { e.preventDefault(); game.press(); }
  });

  // inclinación 3D con el ratón
  if (finePointer && !reduced) {
    const phone = $('#phone'), sec = $('#contacto');
    sec.addEventListener('pointermove', e => {
      const r = sec.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      phone.style.setProperty('--ry', `${-16 + x * 26}deg`);
      phone.style.setProperty('--rx', `${8 - y * 14}deg`);
    });
    sec.addEventListener('pointerleave', () => { phone.style.removeProperty('--ry'); phone.style.removeProperty('--rx'); });
  }
}

/* =========================================================
   VARIOS
   ========================================================= */
function initMisc() {
  const sb = $('#soundBtn');
  const paint = () => { sb.setAttribute('aria-pressed', sfx.on); sb.setAttribute('aria-label', sfx.on ? 'Sonido activado' : 'Sonido desactivado'); };
  paint();
  sb.addEventListener('click', () => { sfx.init(); sfx.toggle(); paint(); sfx.tick(); });

  // apariciones
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });

  // easter egg: 5 toques al vinilo de "Ahora suena" = cara B (versión clara)
  let taps = [];
  $('.player__disc').addEventListener('click', () => {
    const now = Date.now(); taps = taps.filter(t => now - t < 2500); taps.push(now);
    sfx.init(); sfx.tick();
    if (taps.length >= 5) {
      taps = [];
      const light = document.documentElement.dataset.theme !== 'light';
      document.documentElement.dataset.theme = light ? 'light' : '';
      sfx.scratch(); toast(light ? 'Cara B' : 'Cara A');
    }
  });

  // idioma
  $$('.bar__lang [data-lang]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === LANG) return;
    LANG = b.dataset.lang; store.set('aq-lang', LANG);
    sfx.init(); sfx.tick();
    applyLang();
    const y = scrollY;
    renderBlocks(); renderFan(); initPieces(); layoutBlocks(); curBlock = -1; onScroll();
    window.scrollTo(0, y);
  }));

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', () => { sfx.init(); sfx.tick(); }));
  console.log('%cAna Quintero · Creative Strategist Portfolio', 'font:700 14px Helvetica;color:#EAB0C8;background:#6E1E3B;padding:6px 12px;border-radius:99px');
  console.log('Si estás mirando el código, ya nos entendemos: hola.anaquintero@gmail.com');
}

/* =========================================================
   SERVICIOS: al pinchar el título se ve qué incluye
   ========================================================= */
function initServices() {
  $$('.svc__t').forEach(b => b.addEventListener('click', () => {
    const open = b.getAttribute('aria-expanded') !== 'true';
    $$('.svc__t').forEach(x => { x.setAttribute('aria-expanded', 'false'); x.closest('.svc__i').classList.remove('is-open'); });
    if (open) { b.setAttribute('aria-expanded', 'true'); b.closest('.svc__i').classList.add('is-open'); }
    sfx.init(); sfx.tick();
  }));
}

/* =========================================================
   AVISO "Desliza para ver más": sale si alguien se queda quieto
   ========================================================= */
function initMoreHint() {
  const el = $('#more'); if (!el) return;
  let t = 0, seen = 0;
  const atEnd = () => scrollY + innerHeight > document.documentElement.scrollHeight - innerHeight * .6;
  const busy = () => body.classList.contains('is-intro') || !lupa.hidden || !visor.hidden;
  const arm = (ms) => { clearTimeout(t); t = setTimeout(() => {
    if (busy() || atEnd()) return arm(3000);
    el.classList.toggle('is-up', player.classList.contains('on'));
    el.classList.add('on'); seen++;
  }, ms); };
  addEventListener('scroll', () => { el.classList.remove('on'); arm(seen ? 5000 : 3500); }, { passive: true });
  addEventListener('pointerdown', () => { el.classList.remove('on'); arm(5000); }, { passive: true });
  arm(2600);
}

/* =========================================================
   ARRANQUE
   ========================================================= */
applyLang();
initMoreHint();
initServices();
renderBlocks();
renderFan();
initPieces();
buildRoom();
initPlayer();
initPhone();
initMisc();
if (document.fonts) document.fonts.ready.then(() => { if (entered) layoutBlocks(); });
addEventListener('load', () => { if (entered) layoutBlocks(); });
// pantalla de los móviles si un día no hay conexión
if ('serviceWorker' in navigator && location.protocol !== 'file:') addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
if (new URLSearchParams(location.search).has('sin-intro')) { sfx.init(); enter(); }
else initIntro();
})();
