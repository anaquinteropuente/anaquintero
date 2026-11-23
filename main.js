/* nudo · interacciones y scroll */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t = window.t || (x => x);
  window.__ovillo = window.__ovillo || { progress: 0, ready: false };

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    document.documentElement.classList.add('no-js');
    $('.loader')?.remove();
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  document.body.classList.add('is-loading');

  /* ---------- Lenis ---------- */
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  const scrollTo = target => {
    if (lenis) lenis.scrollTo(target, { offset: -20, duration: 1.6 });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
  };
  $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id?.startsWith('#')) return;
    e.preventDefault();
    scrollTo(id === '#top' ? 0 : id);
  }));

  /* ---------- Ovillo e hilo: los dibuja hilo2d.js (versión dibujo) ---------- */
  const hc = $('.hilo-canvas');
  const ovCanvas = $('#ovillo');
  const loaderTxt = $('.loader__txt');
  const placeLoaderTxt = () => {
    const st = window.__ovillo;
    if (!st.ball || !loaderTxt || st.ready) return;
    const cr = ovCanvas.getBoundingClientRect();
    loaderTxt.style.top = (cr.top + st.ball.y + st.ball.r + 26) + 'px';
  };

  /* ---------- Carga: el ovillo gira en el centro mientras "desenreda" ---------- */
  const loaderEl = $('.loader');
  gsap.set('.hero__title .line > span', { yPercent: 110 });
  gsap.set(['.hero__sub', '.bar', '.hero__hint-in'], { opacity: 0 });
  const intro = () => {
    window.__ovillo.ready = true;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to(loaderEl, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0)
      .to('.hero__title .line > span', { yPercent: 0, duration: 1.4, stagger: 0.12 }, 0.55)
      .fromTo('.hero__sub', { y: 24 }, { y: 0, opacity: 1, duration: 1 }, 0.9)
      .fromTo('.bar', { y: -30 }, { y: 0, opacity: 1, duration: 1 }, 0.9)
      .to('.hero__hint-in', { opacity: 1, duration: 1 }, 1.3)
      .add(() => { loaderEl.remove(); document.body.classList.remove('is-loading'); lenis?.start(); ScrollTrigger.refresh(); }, 0.6);
  };
  let quick = false;
  try { quick = sessionStorage.getItem('nudo-quick') === '1'; sessionStorage.removeItem('nudo-quick'); } catch (e) {}
  const t0 = performance.now(), minWait = reduce || quick ? 300 : 2200;
  let loaded = document.readyState === 'complete';
  addEventListener('load', () => { loaded = true; });
  (function wait() {
    const el = performance.now() - t0;
    if ((loaded && el > minWait) || el > 6000) intro(); else setTimeout(wait, 100);
  })();

  gsap.to('.bar__progress span', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* ---------- HERO ---------- */
  ScrollTrigger.create({ trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: true, onUpdate: s => { window.__ovillo.progress = s.progress; } });
  gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
    .to('.hero__hint', { opacity: 0, duration: 0.1 }, 0.05)
    .to('.hero__copy', { y: -60, opacity: 0, ease: 'power1.in', duration: 0.3 }, 0.4)
    .to({}, { duration: 0.01 }, 1);

  const mm = gsap.matchMedia();

  /* ---------- La historia del ovillo: lectura palabra a palabra ---------- */
  const text = $('[data-words]');
  $$(':scope > span', text).forEach(part => { part.innerHTML = part.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' '); });
  const words = $$('.w', text);
  mm.add({ desk: '(min-width: 901px)', mob: '(max-width: 900px)' }, ctx => {
    const desk = ctx.conditions.desk;
    gsap.timeline({ scrollTrigger: { trigger: '.manifiesto', start: desk ? 'top top' : 'top 75%', end: desk ? '+=110%' : 'bottom 55%', pin: desk ? '.manifiesto__pin' : false, scrub: 0.5 } })
      .to(words, { opacity: 1, stagger: 0.1, ease: 'none' })
      .to({}, { duration: 0.6 }); // pausa con el texto completo antes de soltar
  });

  /* ---------- Los 5 hilos: scroll horizontal ---------- */
  mm.add('(min-width: 768px)', () => {
    const track = $('.hilos__track');
    const head = $('.hilos__head');
    const dist = () => track.scrollWidth + head.offsetWidth - innerWidth + 40;
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.hilos', start: 'top top', end: () => '+=' + dist(), pin: '.hilos__pin', scrub: 0.6, invalidateOnRefresh: true } });
    tl.to(track, { x: () => -dist(), ease: 'none' }, 0)
      .to(head, { x: () => -(head.offsetWidth + 80), ease: 'none', duration: 0.16 }, 0);
  });
  mm.add('(max-width: 767px)', () => {
    $$('.hilo').forEach(card => gsap.from(card, { y: 80, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%' } }));
  });

  /* ---------- Reveals ---------- */
  $$('.reveal').forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

  /* ---------- Del hilo al nudo ---------- */
  $$('.step').forEach(s => ScrollTrigger.create({ trigger: s, start: 'top 70%', end: 'bottom 30%', toggleClass: 'is-on' }));

  /* ---------- Sobre mí: avatar con gestos ---------- */

  /* ---------- Contacto: el avatar se asoma por detrás de la barra solo al final ---------- */
  // siempre asomada; solo un leve balanceo (manos y cabeza se mueven juntas)
  if (!reduce) gsap.to('.peek__back img, .peek__hands img', { yPercent: 0.9, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  gsap.from('.contacto__title .line > span', { yPercent: 110, duration: 1.3, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.contacto__title', start: 'top 90%' } });

  const toast = $('.toast');
  const say = msg => { toast.textContent = msg; toast.classList.add('is-on'); setTimeout(() => toast.classList.remove('is-on'), 3600); };
  // copiar el email: portapapeles moderno y, si el navegador no lo deja, el método clásico
  const copyMail = async () => {
    const mail = $('[data-email]').dataset.email;
    try { await navigator.clipboard.writeText(mail); return true; } catch {}
    try {
      const ta = document.createElement('textarea'); ta.value = mail; ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;left:-9999px'; document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy'); ta.remove(); return ok;
    } catch { return false; }
  };
  $('[data-copy-email]').addEventListener('click', async () => {
    const mail = $('[data-email]').dataset.email;
    say((await copyMail()) ? t('Email copiado. Hablamos pronto.') : mail);
  });
  // «Hablar por email»: abre el correo y, por si no hay app de correo configurada, deja el email copiado
  $('[data-email]').addEventListener('click', async () => {
    const mail = $('[data-email]').dataset.email;
    say((await copyMail()) ? t('Abriendo tu correo. El email también está copiado: ') + mail : t('Escríbeme a ') + mail);
  });

  /* ---------- Detalle de cada hilo (pantalla completa) ---------- */
  const det = $('.detalle');
  const dets = $$('.det', det);
  const detN = $('[data-detalle-n]');
  let current = 0, lastFocus = null, origin = '50% 50%';
  const show = n => {
    current = n;
    dets.forEach(d => d.classList.toggle('is-on', +d.dataset.det === n));
    detN.textContent = `${String(n).padStart(2, '0')} / 05`;
    const on = dets[n - 1];
    on.querySelector('.det__title').id = 'detalle-title';
    dets.forEach(d => { if (d !== on) d.querySelector('.det__title').removeAttribute('id'); });
    det.scrollTop = 0;
    gsap.fromTo(on.querySelectorAll('.det__title, .det__lead, .det__list li, .det__block'), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.05, ease: 'expo.out', delay: 0.15 });
    if (n === 1) setPos(100);
    // vídeos: se sueltan los de los otros hilos (el navegador solo decodifica unos pocos a la vez)
    $$('.det video').forEach(v => { if (!on.contains(v)) soltarVideo(v); });
    on.querySelectorAll('img[loading="lazy"]').forEach(i => { i.loading = 'eager'; });
    requestAnimationFrame(() => on.querySelectorAll('.mosaico').forEach(justificar));
  };
  const soltarVideo = v => { if (!v.getAttribute('src')) return; v.pause(); v.removeAttribute('src'); v.load(); };
  const cargarVideo = v => {
    if (!v.getAttribute('src')) { v.src = v.dataset.src; v.load(); }
    if (!reduce) v.play().catch(() => {});
  };
  // si un vídeo falla al arrancar, se reintenta una vez
  $$('.det video').forEach(v => v.addEventListener('error', () => {
    if (v.dataset.reintento) return;
    v.dataset.reintento = '1';
    setTimeout(() => { if (det.hidden) return; v.removeAttribute('src'); v.load(); cargarVideo(v); }, 400);
  }));
  const open = (n, ev) => {
    lastFocus = document.activeElement;
    if (ev && ev.clientX) origin = `${ev.clientX}px ${ev.clientY}px`;
    det.hidden = false;
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    show(n);
    gsap.fromTo(det, { clipPath: `circle(0% at ${origin})` }, { clipPath: `circle(150% at ${origin})`, duration: reduce ? 0.01 : 0.9, ease: 'expo.inOut' });
    $('.detalle__close').focus({ preventScroll: true });
  };
  const close = after => {
    gsap.to(det, { clipPath: `circle(0% at ${origin})`, duration: reduce ? 0.01 : 0.7, ease: 'expo.inOut', onComplete: () => {
      det.hidden = true;
      $$('.det video').forEach(soltarVideo);
      document.documentElement.style.overflow = '';
      lenis?.start();
      lastFocus?.focus({ preventScroll: true });
      after?.();
    } });
  };
  $$('[data-open]').forEach(b => b.addEventListener('click', e => open(+b.dataset.open, e)));
  $$('[data-close]', det).forEach(b => b.addEventListener('click', () => close()));
  $$('[data-detalle-step]', det).forEach(b => b.addEventListener('click', () => show(((current - 1 + +b.dataset.detalleStep + 5) % 5) + 1)));
  $('[data-close-to]', det).addEventListener('click', e => { e.preventDefault(); close(() => scrollTo('#contacto')); });
  addEventListener('keydown', e => {
    if (det.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show((current % 5) + 1);
    if (e.key === 'ArrowLeft') show(((current + 3) % 5) + 1);
    if (e.key === 'Tab') { // mantener el foco dentro
      const f = $$('button, a, input, [tabindex]:not([tabindex="-1"])', det).filter(x => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  // Estrategia: ángulos
  const angles = [
    'Tu rutina, en un solo paso.',
    'Un sérum con resultados reales.',
    'Más de 4.000 mujeres ya confían en nosotros. ¿Cuándo nos pruebas tú?'
  ].map(t);
  const headline = $('.icp__headline');
  $$('.chip').forEach(chip => chip.addEventListener('click', () => {
    $$('.chip').forEach(c => { c.classList.toggle('is-on', c === chip); c.setAttribute('aria-selected', c === chip); });
    gsap.timeline()
      .to(headline, { y: -14, opacity: 0, duration: 0.25, ease: 'power2.in' })
      .add(() => { headline.textContent = angles[+chip.dataset.angle]; })
      .fromTo(headline, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
  }));

  // Copy: antes / después
  const copies = [
    ['Soluciones innovadoras para optimizar la gestión de tu negocio.', 'Cierra el mes en dos horas, no en dos días.'],
    ['¡Descubre nuestra nueva colección! Calidad y estilo al mejor precio.', 'El jersey que te vas a poner tres veces por semana.'],
    ['Hoy os queremos hablar de la importancia de cuidar tu piel.', 'Tu piel no necesita diez productos. Necesita dos que funcionen.']
  ].map(par => par.map(t));
  const stage = $('.copybox__stage'), range = $('.copybox__range');
  const setPos = v => { range.value = v; stage.style.setProperty('--pos', v + '%'); stage.classList.toggle('is-moved', v < 97); };
  range.addEventListener('input', () => setPos(range.value));
  $$('.copybox__tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.copybox__tabs button').forEach(x => x.classList.toggle('is-on', x === b));
    const [a, d] = copies[+b.dataset.copy];
    $('[data-before]').textContent = a; $('[data-after]').textContent = d;
    setPos(100);
  }));

  /* ---------- Vídeos: solo se reproducen si se ven ---------- */
  // cada vídeo se carga al acercarse a la pantalla y se suelta al alejarse: así nunca hay demasiados a la vez
  // mosaico en filas justificadas: cada fila llega a los dos bordes, así no queda ninguna crea coja.
  // En móvil, una pieza horizontal ocupa sola su fila y llega al ancho de la pantalla.
  function justificar(m) {
    const W = m.clientWidth; if (!W) return;
    const movil = innerWidth < 600, g = movil ? 8 : 14;
    m.style.setProperty('--mg', g + 'px');
    const H = movil ? W * 0.95 : Math.min(W * 0.38, 460);
    const items = [...m.children].filter(e => e.dataset.ar);
    const filas = []; let fila = [], suma = 0;
    const cerrar = () => { if (fila.length) filas.push(fila); fila = []; suma = 0; };
    items.forEach(it => {
      const ar = +it.dataset.ar;
      if (ar > 1.3) { cerrar(); filas.push([it]); return; }
      fila.push(it); suma += ar;
      if (suma * H + g * (fila.length - 1) >= W) cerrar();
    });
    if (fila.length) {
      const h = (W - g * (fila.length - 1)) / suma;
      if (h > H * 1.4 && filas.length && filas[filas.length - 1].length > 0 && +filas[filas.length - 1][0].dataset.ar <= 1.3) filas[filas.length - 1].push(...fila);
      else filas.push(fila);
    }
    filas.forEach(f => {
      const ars = f.map(e => +e.dataset.ar), tot = ars.reduce((a, b) => a + b, 0);
      const h = Math.floor((W - g * (f.length - 1)) / tot);
      let usado = 0;
      f.forEach((e, i) => {
        const w = i === f.length - 1 ? W - g * (f.length - 1) - usado : Math.floor(h * ars[i]);
        usado += w;
        e.style.width = w + 'px'; e.style.height = h + 'px'; e.style.marginLeft = ''; e.classList.remove('is-edge');
      });
      if (movil && f.length === 1 && ars[0] > 1.3) {
        const left = m.getBoundingClientRect().left;
        e0(f[0], left);
      }
    });
    m.classList.add('is-just');
  }
  function e0(e, left) {
    const w = innerWidth;
    e.style.width = w + 'px'; e.style.height = Math.round(w / +e.dataset.ar) + 'px';
    e.style.marginLeft = -left + 'px'; e.style.marginRight = -(w - left - e.parentElement.clientWidth) + 'px';
    e.classList.add('is-edge');
  }
  let tJust = 0;
  addEventListener('resize', () => { clearTimeout(tJust); tJust = setTimeout(() => $$('.det.is-on .mosaico').forEach(justificar), 150); });

  const vNear = new IntersectionObserver(entries => entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) { if (!v.getAttribute('src')) { v.src = v.dataset.src; v.load(); } }
    else if (v.getAttribute('src')) { v.pause(); v.removeAttribute('src'); v.load(); }
  }), { rootMargin: '500px 0px' });
  const vSee = new IntersectionObserver(entries => entries.forEach(({ target: v, isIntersecting }) => {
    v.dataset.vis = isIntersecting ? '1' : '';
    if (isIntersecting && v.getAttribute('src') && !reduce) v.play().catch(() => {});
    else v.pause();
  }), { threshold: 0.2 });
  $$('video[data-src]').forEach(v => {
    vNear.observe(v); vSee.observe(v);
    v.addEventListener('loadeddata', () => { if (v.dataset.vis && !reduce) v.play().catch(() => {}); });
    // al pulsar el vídeo: se pone en marcha o se para
    v.addEventListener('click', () => {
      if (!v.getAttribute('src')) { v.src = v.dataset.src; v.load(); }
      if (v.paused) v.play().catch(() => {}); else v.pause();
    });
    // si a los 4 s de verse sigue sin arrancar, se vuelve a pedir el archivo
    setInterval(() => {
      if (!v.dataset.vis || reduce || !v.getAttribute('src') || v.readyState >= 3) return;
      v.dataset.espera = (+v.dataset.espera || 0) + 1;
      if (v.dataset.espera > 4) { v.dataset.espera = 0; v.src = v.dataset.src + '&r=' + Date.now(); v.load(); v.play().catch(() => {}); }
    }, 1000);
  });

  // sonido del vídeo de anuncio
  $$('.ad__sound').forEach(b => b.addEventListener('click', () => {
    const v = b.parentElement.querySelector('video');
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    b.setAttribute('aria-pressed', String(!v.muted));
    b.textContent = v.muted ? t('Activar sonido') : t('Silenciar');
  }));

  /* ---------- Landings en vivo: miniatura a escala y visor a tamaño real ---------- */
  const fitThumb = f => {
    const view = f.parentElement, k = view.clientWidth / 1440;
    if (!k) return;
    f.style.transform = `scale(${k})`;
    f.style.height = (view.clientHeight / k) + 'px';
  };
  // las landings van dentro de la página (landings.js) y se pintan con srcdoc; si no están, se cargan por ruta
  const ponerLanding = (f, url) => {
    if (f.dataset.url === url) return;
    f.dataset.url = url;
    const html = window.__LANDINGS && window.__LANDINGS[url];
    if (!html) { f.src = url; return; }
    const base = new URL(url.replace(/[^/]*$/, ''), location.href).href;
    f.removeAttribute('src');
    f.srcdoc = html.replace(/<head([^>]*)>/i, `<head$1><base href="${base}">` + (window.__LANDING_GUARD || ''));
  };
  const thumbs = $$('.browser--live iframe');
  const tio = new IntersectionObserver(es => es.forEach(({ target: f, isIntersecting }) => {
    if (isIntersecting) { ponerLanding(f, f.dataset.src); fitThumb(f); }
  }), { rootMargin: '300px' });
  thumbs.forEach(f => tio.observe(f));
  addEventListener('resize', () => thumbs.forEach(fitThumb));
  // al pasar el cursor, la miniatura se recorre sola
  thumbs.forEach(f => {
    let raf = 0, dir = 0;
    const tick = () => {
      try {
        const w = f.contentWindow, d = w.document.documentElement;
        const max = d.scrollHeight - w.innerHeight;
        w.scrollTo(0, Math.max(0, Math.min(max, w.scrollY + dir * 6)));
        if ((dir > 0 && w.scrollY < max) || (dir < 0 && w.scrollY > 0)) raf = requestAnimationFrame(tick);
      } catch (e) {}
    };
    const fig = f.closest('.browser');
    fig.addEventListener('pointerenter', () => { dir = 1; cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
    fig.addEventListener('pointerleave', () => { dir = -3; cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); });
  });
  const visor = $('.visor'), vFrame = $('.visor iframe'), vMarco = $('.visor__marco');
  let vModo = 'desktop', vBack = null;
  const fitVisor = () => {
    if (visor.hidden) return;
    if (vModo === 'mobile') { vFrame.style.transform = ''; vFrame.style.width = '100%'; vFrame.style.height = '100%'; return; }
    const W = vMarco.clientWidth, H = vMarco.clientHeight, base = Math.max(W, 1280), k = W / base;
    vFrame.style.width = base + 'px'; vFrame.style.height = (H / k) + 'px'; vFrame.style.transform = `scale(${k})`;
  };
  const setModo = m => {
    vModo = m;
    visor.classList.toggle('is-mobile', m === 'mobile');
    $$('.visor__modos button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.modo === m)));
    requestAnimationFrame(fitVisor);
  };
  const abrirVisor = (url, titulo, modo, from) => {
    vBack = from;
    $('.visor__t').textContent = titulo;
    ponerLanding(vFrame, url);
    visor.hidden = false;
    setModo(modo);
    $('.visor__cerrar').focus({ preventScroll: true });
  };
  const cerrarVisor = () => { visor.hidden = true; vBack?.focus({ preventScroll: true }); };
  $$('[data-ver]').forEach(b => b.addEventListener('click', () => abrirVisor(b.dataset.ver, b.dataset.titulo, b.dataset.modo, b)));
  $$('.visor__modos button').forEach(b => b.addEventListener('click', () => setModo(b.dataset.modo)));
  $('.visor__cerrar').addEventListener('click', cerrarVisor);
  addEventListener('resize', fitVisor);
  addEventListener('keydown', e => { if (!visor.hidden && e.key === 'Escape') { e.stopImmediatePropagation(); cerrarVisor(); } }, true);

  /* ---------- Cursor ---------- */
  const cursor = $('.cursor');
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const label = $('.cursor__label');
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });
    addEventListener('pointermove', e => { xTo(e.clientX); yTo(e.clientY); window.__ovillo.mx = e.clientX / innerWidth - 0.5; window.__ovillo.my = e.clientY / innerHeight - 0.5; });
    const big = t => { label.textContent = t; cursor.classList.add('is-big'); };
    const small = () => cursor.classList.remove('is-big');
    $$('[data-cursor]').forEach(el => { el.addEventListener('pointerenter', () => big(el.dataset.cursor)); el.addEventListener('pointerleave', small); el.addEventListener('click', small); });
  }

  gsap.ticker.add(placeLoaderTxt);
  addEventListener('load', () => ScrollTrigger.refresh());
  ScrollTrigger.refresh();
})();
