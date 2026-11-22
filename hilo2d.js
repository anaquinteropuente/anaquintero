/* nudo · ovillo e hilo (2D).
   El ovillo es la foto de referencia pasada a rosa; gira y encoge al soltar hilo.
   El hilo es UN solo trazo continuo: avanza con el scroll y retrocede por el mismo camino.
   Nunca pasa por encima del texto. */
(() => {
const canvas = document.querySelector('.hilo-canvas');
const ovCanvas = document.getElementById('ovillo');
if (!canvas || !ovCanvas) return;
const ctx = canvas.getContext('2d');
const state = window.__ovillo || (window.__ovillo = { progress: 0, ready: false });
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// colores de la marca (rosas de Chicle y Rubor)
// un solo color, como una ilustración plana (Chicle de marca, un punto más intenso para que se lea sobre blanco)
const DIBUJAR_HILO = false;   // el hilo de la página está desactivado: solo queda el ovillo
const INK = '#F77DBB';

let W = 1, VH = 1, DPR = 1, LW = 7;      // LW = grosor del trazo
const narrowNow = () => innerWidth < 768;
function resize() {
  W = innerWidth; VH = innerHeight;
  if (!W || !VH) return;
  DPR = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(W * DPR); canvas.height = Math.round(VH * DPR);
  LW = narrowNow() ? 12 : Math.max(18, Math.min(30, VH * 0.03));
}
addEventListener('resize', resize);
resize();

/* ---------- camino del hilo: puntos en marcos 'p' (página) y 't' (pista horizontal de los hilos) ---------- */
const main = $('main'), track = $('.hilos__track');
const prng = seed => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const TIP = 0.82;  // la punta va a esta altura de la pantalla
let layout = null;

function layoutPath() {
  resize();
  if (!W || !VH) return;
  const vh = VH, narrow = W < 768, RP = LW / 2 + 4;
  const mTop = main.getBoundingClientRect().top, mPage = mTop + scrollY;
  const box = el => { const r = (typeof el === 'string' ? $(el) : el).getBoundingClientRect(); return { t: r.top - mTop, b: r.bottom - mTop, l: r.left, r: r.right, h: r.height }; };
  const L = narrow ? RP - 1 : Math.max(RP + 14, W * 0.018), R = W - L;
  const A = narrow ? 1 : 10;
  const rnd = prng(5);
  const drape = (x, y0, y1, amp, every) => {
    const out = [], n = Math.min(60, Math.max(2, Math.round((y1 - y0) / Math.max(every, 80))));
    for (let i = 1; i < n; i++) out.push(['p', x + Math.sin(i * 1.7 + rnd()) * amp * (0.6 + rnd() * 0.6), y0 + ((y1 - y0) * i) / n + (rnd() - 0.5) * every * 0.25]);
    return out;
  };
  const P = (x, y) => ['p', x, y];
  const m = box('.manifiesto'), h = box('.hilos'), p = box('.proceso'), s = box('.sobre'), bar = box('.peek__bar');
  const pts = [];
  let pin = null;
  if (!narrow) {
    const mt = box('.manifiesto__text');
    const cross = Math.min(vh * 0.2, (vh - mt.h) / 2 - 40);
    pts.push(P(W / 2, m.t), P(W * 0.46, m.t + cross * 0.3), P(W * 0.28, m.t + cross * 0.62), P(L + A, m.t + cross));
    pts.push(...drape(L, m.t + cross, h.t - vh * 0.05, A, vh * 0.42));
    // hilos: pista horizontal; ondula por detrás de las tarjetas
    const st = window.ScrollTrigger && ScrollTrigger.getAll().find(x => x.pin && x.pin.classList && x.pin.classList.contains('hilos__pin'));
    const tr = track.getBoundingClientRect(), tx = (window.gsap && gsap.getProperty(track, 'x')) || 0;
    const tl0 = tr.left - tx, tt = tr.top;
    const pinR = $('.hilos__pin').getBoundingClientRect();
    const T = (x, y) => ['t', x, y];
    const pinT = pinR.top - tt, pinB = pinR.bottom - tt;
    const cards = $$('.hilo').map(c => { const r = c.getBoundingClientRect(); return { l: r.left - tr.left, r: r.right - tr.left, t: r.top - tt, b: r.bottom - tt }; });
    const c0 = cards[0], gap = cards[1] ? cards[1].l - c0.r : 40;
    const mid = (c0.t + c0.b) / 2, below = c0.b + (pinB - c0.b) * 0.42, above = c0.t - (c0.t - pinT) * 0.42;
    pts.push(T(L - tl0, pinT), T(L + A - tl0, pinT + vh * 0.3), T(L - tl0, below - vh * 0.05), T(L + 60 - tl0, below), T((L - tl0 + c0.l) / 2, below + 6));
    cards.forEach((c, i) => {
      const w = c.r - c.l, up = i % 2 === 1;
      if (i) pts.push(T(c.l - gap / 2, mid + (up ? 1 : -1) * (c.b - c.t) * 0.1));
      pts.push(T(c.l + w * 0.25, up ? above : below), T(c.l + w * 0.65, up ? above - 6 : below + 6));
    });
    const cl = cards[cards.length - 1];
    pts.push(T(cl.r + gap * 0.6, mid), T(cl.r + gap * 0.9, below + vh * 0.04), T(cl.r + gap, pinB + 10));
    if (st) {
      const head = $('.hilos__head');
      pin = { start: st.start, end: st.end, D: track.scrollWidth + head.offsetWidth - innerWidth + 40, tl0, trackOff: tt - pinR.top };
    }
    // del hilo al nudo: cruza por arriba (sin texto) y baja pegado al borde izquierdo
    const pTitle = box('.proceso .h2');
    const crossY = p.t + Math.min(vh * 0.08, (pTitle.t - p.t) * 0.45);
    pts.push(P(W * 0.7, crossY - vh * 0.02), P(W * 0.35, crossY + 6), P(L + A * 2, crossY + vh * 0.06));
    pts.push(...drape(L, crossY + vh * 0.06, s.t, A, vh * 0.45));
    pts.push(...drape(L, s.t, bar.t - vh * 0.06, A, vh * 0.45));
    pts.push(P(L + A, bar.t - vh * 0.02), P(L + 2, bar.t + 40), P(L + 6, bar.t + 90));
  } else {
    const E = W - L;
    pts.push(P(W * 0.72, m.t + vh * 0.05), P(E, m.t + vh * 0.12), P(E - A, m.t + vh * 0.18));
    const hh = box('.hilos__head');
    pts.push(...drape(E, m.t + vh * 0.18, hh.b, A, vh * 0.4));
    const cards = $$('.hilo').map(c => box(c));
    cards.forEach((c, i) => {
      const x = i % 2 === 0 ? E : L, hgt = c.b - c.t;
      pts.push(P(x, c.t + hgt * 0.2), P(x, c.t + hgt * 0.5), P(x, c.t + hgt * 0.8));
      const n = cards[i + 1];
      if (n) pts.push(P(W / 2, (c.b + n.t) / 2));
    });
    const cl = cards[cards.length - 1], side = (cards.length - 1) % 2 === 0 ? E : L;
    pts.push(P(side, cl.b + 30));
    if (side === L) pts.push(P(W / 2, (cl.b + h.b) / 2));
    pts.push(P(E, h.b - vh * 0.04));
    pts.push(...drape(E, h.b, bar.t - vh * 0.05, 0, vh * 0.5));
    pts.push(P(E, bar.t - vh * 0.02), P(E, bar.t + 40), P(E - 4, bar.t + 90));
  }
  const keys = pts.map(([f, x, y]) => {
    if (f === 'p' || !pin) return y + mPage - vh * TIP;
    const yPage = s0 => s0 + pin.trackOff + y;
    const frac = (x + pin.tl0 - W * 0.86) / pin.D;
    if (frac <= 0) return Math.min(yPage(pin.start) - vh * TIP, pin.start);
    if (frac >= 1) return Math.max(pin.end, yPage(pin.end) - vh * TIP);
    return pin.start + frac * (pin.end - pin.start);
  });
  for (let i = 1; i < keys.length; i++) keys[i] = Math.max(keys[i], keys[i - 1]);
  layout = { pts, keys, narrow, M: [W / 2, m.t], L, R, mKey: m.t + mPage - vh * TIP };
}

// Catmull-Rom centrípeta → control Bézier
const bez = (p0, p1, p2, p3) => {
  const d1 = Math.sqrt(Math.hypot(p1[0] - p0[0], p1[1] - p0[1])) || 1e-4;
  const d2 = Math.sqrt(Math.hypot(p2[0] - p1[0], p2[1] - p1[1])) || 1e-4;
  const d3 = Math.sqrt(Math.hypot(p3[0] - p2[0], p3[1] - p2[1])) || 1e-4;
  const a1 = 2 * d1 * d1 + 3 * d1 * d2 + d2 * d2, b1 = 3 * d1 * (d1 + d2);
  const a2 = 2 * d3 * d3 + 3 * d3 * d2 + d2 * d2, b2 = 3 * d3 * (d3 + d2);
  return [
    [(d1 * d1 * p2[0] - d2 * d2 * p0[0] + a1 * p1[0]) / b1, (d1 * d1 * p2[1] - d2 * d2 * p0[1] + a1 * p1[1]) / b1],
    [(d3 * d3 * p1[0] - d2 * d2 * p3[0] + a2 * p2[0]) / b2, (d3 * d3 * p1[1] - d2 * d2 * p3[1] + a2 * p2[1]) / b2]
  ];
};
const lerp2 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
// primera parte (0..t) de una Bézier cúbica
const splitBez = (p1, c1, c2, p2, t) => {
  const a = lerp2(p1, c1, t), b = lerp2(c1, c2, t), c = lerp2(c2, p2, t);
  const d = lerp2(a, b, t), e = lerp2(b, c, t), f = lerp2(d, e, t);
  return [a, d, f];
};

/* ---------- ovillo: la foto de referencia pasada a rosa; gira y se puede hacer girar ---------- */
const ballImg = new Image();
ballImg.src = 'assets/ovillo2d/ovillo-rosa2.png?v=1';
const BALL_FILL = 226.3 / 244.5;         // radio del ovillo dentro de la imagen
// hebra real sacada de la misma foto (3 cabos retorcidos), ya repetible
const strandImg = new Image();
strandImg.src = 'assets/ovillo2d/hebra3d.png?v=1';
const STRAND_FRAC = 134.4 / 215;        // la hebra (modelada en Blender) ocupa este alto de la imagen
let intro = 0, settle = 0, spin = 0, spinV = 0, smoothP = 0, last = performance.now(), t = 0;

function ballPose(dt, cw, ch) {
  const narrow = narrowNow();
  intro = Math.min(1, intro + dt / 0.9);
  if (state.ready) settle = Math.min(1, settle + dt / 1.4);
  const sE = settle < 0.5 ? 4 * settle ** 3 : 1 - Math.pow(-2 * settle + 2, 3) / 2;
  const eI = 1 - Math.pow(1 - intro, 4) + Math.sin(intro * Math.PI) * 0.06;
  smoothP += ((state.progress || 0) - smoothP) * 0.12;
  const p = smoothP;
  const baseR = narrow ? Math.min(cw * 0.3, ch * 0.16) : Math.min(ch * 0.24, cw * 0.17);
  const hx = narrow ? cw * 0.5 : cw * (0.74 - 0.18 * p);
  const hy = narrow ? ch * (0.7 - 0.1 * p) : ch * (0.38 + 0.04 * p);
  const x = cw * 0.5 + (hx - cw * 0.5) * sE;
  const y = ch * 0.45 + (hy - ch * 0.45) * sE + Math.sin(t * 1.1) * 4;
  const r = Math.max(1, baseR * (1 - p * 0.35) * (0.6 + 0.4 * sE) * eI);
  spinV *= 0.95;
  spin += dt * (0.1 + (1 - sE) * 2.4) + spinV * dt;
  return { x, y, r, p };
}

function drawBall(x, y, r) {
  if (!ballImg.complete || !ballImg.naturalWidth) return;
  const s = r / BALL_FILL;
  ctx.save();
  ctx.shadowColor = 'rgba(190, 70, 130, 0.22)'; ctx.shadowBlur = r * 0.35; ctx.shadowOffsetY = r * 0.16;
  ctx.translate(x, y); ctx.rotate(spin);
  ctx.drawImage(ballImg, -s, -s, s * 2, s * 2);
  ctx.restore();
}

/* ---------- textura de la hebra: lana suave de cabos retorcidos, en los mismos rosas del ovillo ---------- */
let tile = null, tileKey = '', P = 12;
function makeTile() {
  if (strandImg.naturalWidth) {
    const key = 'img' + LW;
    if (key === tileKey) return;
    tileKey = key;
    const h = LW / STRAND_FRAC, w = h * strandImg.naturalWidth / strandImg.naturalHeight;
    tile = { c: strandImg, w: w * 1.02, h };
    P = w * 0.995;                                  // la tira ya es repetible: pieza tras pieza
    return;
  }
  const key = LW + 'x' + DPR + (ballImg.naturalWidth ? 'f' : '');
  if (key === tileKey) return;
  tileKey = key;
  P = LW * 1.35;                                    // un paso de torsión
  const D = LW, H = LW * 1.7, Wt = P * 1.25;        // la pieza se solapa un poco con la siguiente
  const c = document.createElement('canvas');
  c.width = Math.ceil(Wt * DPR); c.height = Math.ceil(H * DPR);
  const g = c.getContext('2d');
  g.scale(DPR, DPR);
  const top = (H - D) / 2;
  // pelusa por fuera del cuerpo
  g.lineCap = 'round';
  for (let i = 0; i < 9; i++) {
    const x = (i / 9) * Wt + 1, up = i % 2 ? -1 : 1, y0 = up < 0 ? top + 1 : top + D - 1;
    g.strokeStyle = i % 3 ? 'rgba(255,170,210,.55)' : 'rgba(214,92,150,.45)'; g.lineWidth = 0.6;
    g.beginPath(); g.moveTo(x, y0); g.quadraticCurveTo(x + 2, y0 + up * -2.5, x + 3.5, y0 + up * -3.6); g.stroke();
  }
  g.save();
  g.beginPath(); g.roundRect(0, top, Wt, D, D / 2.2); g.clip();
  g.fillStyle = '#B9497E'; g.fillRect(0, top, Wt, D);
  const a = 0.82;                                    // inclinación de los cabos (como en la foto)
  const dx = Math.cos(a), dy = Math.sin(a), len = D / dy * 1.25, wPly = (P / 3) * dy * 1.08;
  for (let k = -3; k < 7; k++) {
    const cx = (k / 3) * P + P / 6, cy = H / 2;
    const x0 = cx - dx * len / 2, y0 = cy - dy * len / 2, x1 = cx + dx * len / 2, y1 = cy + dy * len / 2;
    const nx = -dy, ny = dx;
    // cuerpo del cabo con volumen: oscuro en los bordes, claro en el centro
    const gr = g.createLinearGradient(cx - nx * wPly / 2, cy - ny * wPly / 2, cx + nx * wPly / 2, cy + ny * wPly / 2);
    gr.addColorStop(0, '#9E3468'); gr.addColorStop(0.3, '#E8709F'); gr.addColorStop(0.55, '#FF9DCA'); gr.addColorStop(0.75, '#FFB9DA'); gr.addColorStop(1, '#C24F86');
    g.strokeStyle = gr; g.lineWidth = wPly; g.lineCap = 'round';
    g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    // fibras finas dentro del cabo
    for (let f = -1; f <= 1; f++) {
      const o = f * wPly * 0.25;
      g.strokeStyle = f ? 'rgba(255,214,234,.45)' : 'rgba(200,80,140,.35)'; g.lineWidth = 0.55;
      g.beginPath(); g.moveTo(x0 + nx * o, y0 + ny * o); g.lineTo(x1 + nx * o, y1 + ny * o); g.stroke();
    }
  }
  // sombra del cilindro: arriba luz, abajo sombra
  const sh = g.createLinearGradient(0, top, 0, top + D);
  sh.addColorStop(0, 'rgba(255,230,242,.25)'); sh.addColorStop(0.45, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(120,20,70,.32)');
  g.fillStyle = sh; g.fillRect(0, top, Wt, D);
  // grano real de la lana: fibras de la propia foto del ovillo encima
  if (ballImg.naturalWidth) {
    const iw = ballImg.naturalWidth, sc = D / (iw * 0.034);          // una hebra de la foto ≈ 3,4% del ancho
    const cw0 = Wt / sc, ch0 = D / sc;
    g.globalCompositeOperation = 'soft-light'; g.globalAlpha = 0.9;
    g.drawImage(ballImg, iw * 0.42, iw * 0.42, cw0, ch0, 0, top, Wt, D);
    g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  }
  g.restore();
  tile = { c, w: Wt, h: H };
}

/* ---------- el hilo cuelga del ovillo con física: cae natural, se puede coger y al bajar se tensa ---------- */
const N = 30;
const RX = new Float32Array(N), RY = new Float32Array(N), OX = new Float32Array(N), OY = new Float32Array(N);
let seeded = false, grab = -1;
const pointer = { x: 0, y: 0 };

function simulate(dt, A, B, p) {
  const chord = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const rest = (chord * (1.07 - 0.05 * Math.min(1, p * 1.4))) / (N - 1);
  if (!seeded) {
    for (let i = 0; i < N; i++) { const f = i / (N - 1); RX[i] = OX[i] = A[0] + (B[0] - A[0]) * f + Math.sin(f * Math.PI) * chord * 0.15; RY[i] = OY[i] = A[1] + (B[1] - A[1]) * f; }
    seeded = true;
  }
  const g = 2000 * dt * dt, wind = (Math.sin(t * 0.8) * 14 + Math.sin(t * 2.1) * 6) * dt * dt;
  for (let i = 1; i < N - 1; i++) {
    const vx = (RX[i] - OX[i]) * 0.982, vy = (RY[i] - OY[i]) * 0.982;
    OX[i] = RX[i]; OY[i] = RY[i];
    RX[i] += vx + wind * Math.sin((i / N) * Math.PI); RY[i] += vy + g;
  }
  RX[0] = A[0]; RY[0] = A[1]; RX[N - 1] = B[0]; RY[N - 1] = B[1];
  if (grab > 0 && grab < N - 1) { RX[grab] = pointer.x; RY[grab] = pointer.y; }
  const fixed = i => i === 0 || i === N - 1 || i === grab;
  for (let it = 0; it < 28; it++) {
    for (let i = 0; i < N - 1; i++) {
      const j = i + 1, wa = fixed(i) ? 0 : 1, wb = fixed(j) ? 0 : 1, ws = wa + wb;
      if (!ws) continue;
      const ddx = RX[j] - RX[i], ddy = RY[j] - RY[i], l = Math.hypot(ddx, ddy) || 1e-6, c = (l - rest) / (l * ws);
      RX[i] += wa * c * ddx; RY[i] += wa * c * ddy; RX[j] -= wb * c * ddx; RY[j] -= wb * c * ddy;
    }
    if (it & 1) for (let i = 0; i < N - 2; i++) {    // la lana tiene cuerpo: no se dobla en ángulo
      const j = i + 2, wa = fixed(i) ? 0 : 1, wb = fixed(j) ? 0 : 1, ws = wa + wb;
      if (!ws) continue;
      const ddx = RX[j] - RX[i], ddy = RY[j] - RY[i], l = Math.hypot(ddx, ddy) || 1e-6, min = rest * 1.75;
      if (l >= min) continue;
      const c = 0.35 * (l - min) / (l * ws);
      RX[i] += wa * c * ddx; RY[i] += wa * c * ddy; RX[j] -= wb * c * ddx; RY[j] -= wb * c * ddy;
    }
  }
}

// recorre el camino (Bézier) y devuelve puntos cada ~3 px
function sampleCurve(pts, lastSeg, frac) {
  const out = [];
  out.push(pts[0][0], pts[0][1]);
  for (let i = 0; i <= lastSeg; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const [c1, c2] = bez(p0, p1, p2, p3);
    const tMax = i === lastSeg ? frac : 1;
    if (tMax <= 0.001) break;
    const len = Math.hypot(c1[0] - p1[0], c1[1] - p1[1]) + Math.hypot(c2[0] - c1[0], c2[1] - c1[1]) + Math.hypot(p2[0] - c2[0], p2[1] - c2[1]);
    const n = Math.min(900, Math.max(2, Math.ceil((len * tMax) / 3)));
    for (let k = 1; k <= n; k++) {
      const tt = (k / n) * tMax, u = 1 - tt;
      out.push(u * u * u * p1[0] + 3 * u * u * tt * c1[0] + 3 * u * tt * tt * c2[0] + tt * tt * tt * p2[0],
               u * u * u * p1[1] + 3 * u * u * tt * c1[1] + 3 * u * tt * tt * c2[1] + tt * tt * tt * p2[1]);
    }
  }
  return out;
}

function drawYarn(q) {
  const n = q.length / 2;
  if (n < 2) return;
  // base continua (por si en una curva cerrada quedan huecos entre piezas)
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.beginPath(); ctx.moveTo(q[0], q[1]);
  for (let i = 1; i < n; i++) ctx.lineTo(q[i * 2], q[i * 2 + 1]);
  ctx.strokeStyle = '#C98395'; ctx.lineWidth = LW * 0.9; ctx.stroke();
  // piezas de hebra a lo largo del camino
  const pad = LW * 3;
  let acc = 0, next = 0;
  for (let i = 1; i < n; i++) {
    const x0 = q[i * 2 - 2], y0 = q[i * 2 - 1], x1 = q[i * 2], y1 = q[i * 2 + 1];
    const d = Math.hypot(x1 - x0, y1 - y0);
    while (next <= acc + d) {
      const f = d ? (next - acc) / d : 0, x = x0 + (x1 - x0) * f, y = y0 + (y1 - y0) * f;
      if (x > -pad && x < W + pad && y > -pad && y < VH + pad) {
        // dirección: mira un poco hacia delante
        const j = Math.min(n - 1, i + 2), a = Math.atan2(q[j * 2 + 1] - y, q[j * 2] - x);
        ctx.setTransform(DPR * Math.cos(a), DPR * Math.sin(a), -DPR * Math.sin(a), DPR * Math.cos(a), x * DPR, y * DPR);
        ctx.drawImage(tile.c, 0, -tile.h / 2, tile.w, tile.h);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      }
      next += P;
    }
    acc += d;
  }
}

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.033, (now - last) / 1000 || 0.016); last = now; t += dt;
  if (!W || !VH) return;
  makeTile();
  const cr = ovCanvas.getBoundingClientRect();
  const cw = ovCanvas.clientWidth || W, ch = ovCanvas.clientHeight || VH;
  const pose = ballPose(dt, cw, ch);
  const bx = cr.left + pose.x, by = cr.top + pose.y, br = pose.r;
  state.ball = { x: pose.x, y: pose.y, r: br };
  // el hilo nace por debajo del ovillo, abajo a la derecha
  const A = [bx + br * 0.38, by + br * 0.78];
  // cae casi en vertical desde el ovillo; al bajar se va hacia el centro, donde sigue el camino
  const fall = Math.min(1, pose.p * 1.3);
  const B = [A[0] + br * 0.05 + (cr.left + cw * 0.5 - A[0] - br * 0.05) * fall, cr.top + ch];
  // hilo quieto: una curva suave fija del ovillo hacia abajo (sin balanceo ni física)
  for (let i = 0; i < N; i++) {
    const f = i / (N - 1);
    RX[i] = A[0] + (B[0] - A[0]) * (f * f * (3 - 2 * f)) + Math.sin(f * Math.PI) * br * 0.12;
    RY[i] = A[1] + (B[1] - A[1]) * f;
  }

  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, W, VH);
  if (DIBUJAR_HILO && state.ready && layout) {
    const sy = scrollY, mTop = main.getBoundingClientRect().top;
    const tr = layout.narrow ? null : track.getBoundingClientRect();
    const hero = [];
    for (let i = 0; i < N; i++) hero.push([RX[i], RY[i]]);
    const pts = hero.slice(), keys = hero.map(() => -Infinity);
    pts.push([layout.M[0], layout.M[1] + mTop]); keys.push(layout.mKey);
    layout.pts.forEach(([f, x, y], i) => { pts.push(f === 'p' || !tr ? [x, y + mTop] : [x + tr.left, y + tr.top]); keys.push(layout.keys[i]); });
    // ya tendido por toda la web desde el principio
    const lastSeg = pts.length - 2, frac = 1;
    const q = sampleCurve(pts, lastSeg, frac);
    drawYarn(q);
    state.hiloPath = { n: q.length / 2, lastSeg, frac, sy };
  }
  if (by + br > -60 && by - br < VH + 60) drawBall(bx, by, br);
}

// coger el hilo o girar el ovillo con el ratón o el dedo
const nearRope = (x, y) => { let bi = -1, bd = 1e9; for (let i = 1; i < N - 1; i++) { const d = Math.hypot(RX[i] - x, RY[i] - y); if (d < bd) { bd = d; bi = i; } } return { i: bi, d: bd }; };
const onBall = (x, y) => { const b = state.ball, cr = ovCanvas.getBoundingClientRect(); return b && Math.hypot(cr.left + b.x - x, cr.top + b.y - y) < b.r; };
const cursor = $('.cursor'), cursorLabel = $('.cursor__label');
let hinted = '', spinDrag = null;
addEventListener('pointerdown', e => {
  if (!state.ready || e.target.closest('a, button, input, .detalle')) return;
  pointer.x = e.clientX; pointer.y = e.clientY;
  if (onBall(e.clientX, e.clientY)) { spinDrag = e.clientX; document.body.classList.add('is-grabbing'); }
}, { passive: true });
addEventListener('pointermove', e => {
  if (spinDrag !== null) { spinV += (e.clientX - spinDrag) * 0.5; spinDrag = e.clientX; }
  pointer.x = e.clientX; pointer.y = e.clientY;
  if (e.pointerType !== 'mouse' || grab > 0 || spinDrag !== null || !cursor) return;
  const lbl = !state.ready ? '' : onBall(e.clientX, e.clientY) ? (window.t ? window.t('gíralo') : 'gíralo') : '';
  if (lbl !== hinted) {
    if (lbl) { cursorLabel.textContent = lbl; cursor.classList.add('is-big'); } else cursor.classList.remove('is-big');
    hinted = lbl;
  }
}, { passive: true });
const release = () => { grab = -1; spinDrag = null; document.body.classList.remove('is-grabbing'); };
addEventListener('pointerup', release);
addEventListener('pointercancel', release);

if (window.ScrollTrigger) ScrollTrigger.addEventListener('refresh', layoutPath);
addEventListener('load', () => setTimeout(layoutPath, 60));
setTimeout(layoutPath, 0);
requestAnimationFrame(frame);
})();
