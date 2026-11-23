/* nudo · versión en inglés.
   Se elige con el botón ES / EN de la cabecera (se guarda en el navegador y recarga la página).
   En inglés, además, los colores de marca se invierten: lo rosa pasa a azul y lo azul a rosa. */
(() => {
const EN = {
  // cabecera, hero y manifiesto
  'nudo — Ana Quintero · Estrategia, copy, ads, landings y vídeo': 'nudo — Ana Quintero · Strategy, copy, ads, landing pages and video',
  'desenredando': 'untangling',
  'nudo, volver arriba': 'nudo, back to top',
  'Principal': 'Main',
  'Hilos': 'Threads',
  'Cómo trabajo': 'How I work',
  'Sobre mí': 'About me',
  'Hablemos': "Let's talk",
  'Inicio': 'Home',
  'Del anuncio': 'From the ad',
  'a la conversión,': 'to the conversion,',
  'sin perder el': 'without losing the',
  'hilo.': 'thread.',
  'Estrategia, copy, diseño de ads, landings y vídeo para marcas que saben que necesitan más, pero no por dónde empezar.': 'Strategy, copy, ad design, landing pages and video for brands that know they need more, but not where to start.',
  'Tira del hilo': 'Pull the thread',
  'La idea': 'The idea',
  'Cada producto empieza siendo un ovillo enredado.': 'Every product starts as a tangled ball of yarn.',
  'Si tiras de los diferentes hilos, tu producto funciona.': 'Pull the right threads and your product works.',
  // hilos
  'Servicios': 'Services',
  'Elige': 'Pick',
  'tu hilo.': 'your thread.',
  'Cada uno resuelve una parte. Pulsa el que te interese para ver cómo lo trabajo y algunos ejemplos.': 'Each one solves a part. Tap the one you need to see how I work it and some examples.',
  'Estrategia y copy': 'Strategy & copy',
  'ICP, ángulos y mensajes': 'ICP, angles and messaging',
  'Transformo tus clientes ideales y sus puntos de ataque en mensajes.': 'I turn your ideal customers and their pain points into messages.',
  'Tirar del hilo': 'Pull the thread',
  'Diseño de ads': 'Ad design',
  'Creatividades para paid social': 'Creatives for paid social',
  'Estáticas, vídeos y carruseles que aumentan el CTR y terminan cerrando ventas.': 'Statics, videos and carousels that lift CTR and end up closing sales.',
  'Landings': 'Landing pages',
  'Páginas que convierten': 'Pages that convert',
  'Una landing no es bonita o fea: convierte o no. Diseño y monto páginas con una estructura pensada para que quien llega, entienda y actúe.': "A landing page isn't pretty or ugly: it converts or it doesn't. I design and build pages structured so whoever lands there understands and acts.",
  'Generaciones': 'AI',
  'con IA': 'generations',
  'Imágenes o vídeos individuales': 'Single images or videos',
  'Piezas sueltas para campaña, producto o redes. Un mismo personaje, una misma luz y un mismo universo en cada una.': 'One-off pieces for campaigns, products or social. Same character, same light and same world in every one.',
  'Edición de vídeo': 'Video editing',
  'Reels, ads y vídeo para redes': 'Reels, ads and social video',
  'Adapto tu contenido grabado a vídeos que enganchan y convierten.': 'I turn your recorded footage into videos that hook and convert.',
  // proceso
  'Del hilo': 'From thread',
  'al nudo.': 'to knot.',
  'Tiro del hilo': 'I pull the thread',
  'Una llamada para entender tu negocio, a quién vendes y qué está fallando. Sin formularios de veinte preguntas.': "A call to understand your business, who you sell to and what's not working. No twenty-question forms.",
  'Desenredo': 'I untangle',
  'Te propongo por dónde empezar y por qué. Un plan concreto, con piezas y plazos. No un PDF de cuarenta páginas.': 'I tell you where to start and why. A concrete plan, with deliverables and deadlines. Not a forty-page PDF.',
  'Hago el nudo': 'I tie the knot',
  'Entrego todo listo para usar y lo ajustamos hasta que funcione.': 'I deliver everything ready to use and we fine-tune it until it works.',
  // sobre mí
  'Detrás': 'Behind',
  'de nudo.': 'nudo.',
  'Ana, creative strategist.': 'Ana, creative strategist.',
  'Trabajo entre la estrategia y la ejecución: pienso el mensaje, lo escribo, lo diseño y lo produzco. Menos intermediarios, menos briefings que se pierden por el camino y más coherencia entre lo que dices y cómo se ve.': 'I work between strategy and execution: I think the message through, write it, design it and produce it. Fewer middlemen, fewer briefs lost along the way, and more consistency between what you say and how it looks.',
  'Puedes empezar por un hilo suelto o encargarme el ovillo entero.': 'You can start with a single thread or hand me the whole ball.',
  'Trabajo con': 'I work with',
  // contacto
  'Contacto': 'Contact',
  '¿Por qué hilo': 'Which thread',
  'empezamos?': 'shall we pull?',
  'Cuéntame qué tienes entre manos.': "Tell me what you're working on.",
  'Avatar de fieltro de Ana asomándose por encima de la barra': "Ana's felt avatar peeking over the bar",
  'Hablar por email': 'Email me',
  'Copiar email': 'Copy email',
  // detalle
  'Hilo anterior': 'Previous thread',
  'Hilo siguiente': 'Next thread',
  'Cerrar': 'Close',
  'Antes de escribir una palabra, sé a quién le hablo. Defino tu cliente ideal, qué le frena a comprar y desde qué ángulos conviene entrarle. Con eso escribo los mensajes de tus ads y el copy para tu web o tu contenido orgánico.': "Before writing a word, I know who I'm talking to. I define your ideal customer, what stops them from buying and which angles work best. Then I write your ad messaging and the copy for your website or organic content.",
  'Análisis de ICP': 'ICP analysis',
  'Mapa de objeciones': 'Objection map',
  'Ángulos para ads': 'Ad angles',
  'Copy para paid': 'Paid copy',
  'Contenido orgánico': 'Organic content',
  'Un producto, tres ángulos': 'One product, three angles',
  'Ejemplo · marca ficticia': 'Example · fictional brand',
  'Madrid · trabaja en remoto': 'Madrid · works remotely',
  'Quiere': 'Wants',
  'Cuidarse la piel sin una rutina de diez pasos.': 'To look after her skin without a ten-step routine.',
  'Le frena': 'Holds her back',
  'Ha probado mil cosas y desconfía de las promesas.': "She's tried everything and doesn't trust promises.",
  'Compra cuando': 'Buys when',
  'Ve resultados reales en alguien como ella.': 'She sees real results on someone like her.',
  'Sérum de rutina corta · marca ficticia': 'Short-routine serum · fictional brand',
  'Ángulos': 'Angles',
  'Tiempo': 'Time',
  'Desconfianza': 'Distrust',
  'Prueba social': 'Social proof',
  'Tu rutina, en un solo paso.': 'Your routine, in one step.',
  'Un sérum con resultados reales.': 'A serum with real results.',
  'Más de 4.000 mujeres ya confían en nosotros. ¿Cuándo nos pruebas tú?': 'Over 4,000 women already trust us. When will you try us?',
  'Antes y después': 'Before and after',
  'Ejemplos': 'Examples',
  'Titular web': 'Website headline',
  'Anuncio': 'Ad',
  'Post orgánico': 'Organic post',
  'Antes': 'Before',
  'Después': 'After',
  'Soluciones innovadoras para optimizar la gestión de tu negocio.': 'Innovative solutions to optimise the management of your business.',
  'Cierra el mes en dos horas, no en dos días.': 'Close the month in two hours, not two days.',
  '¡Descubre nuestra nueva colección! Calidad y estilo al mejor precio.': 'Discover our new collection! Quality and style at the best price.',
  'El jersey que te vas a poner tres veces por semana.': "The jumper you'll wear three times a week.",
  'Hoy os queremos hablar de la importancia de cuidar tu piel.': "Today we'd like to talk about the importance of skincare.",
  'Tu piel no necesita diez productos. Necesita dos que funcionen.': "Your skin doesn't need ten products. It needs two that work.",
  'Comparar antes y después': 'Compare before and after',
  'Desliza para ver el después': 'Slide to see the after',
  'Estáticas, vídeos y carruseles que aumentan el CTR y terminan cerrando ventas. Pensados desde el ángulo, no desde la plantilla, y con variantes para testear qué funciona.': 'Statics, videos and carousels that lift CTR and end up closing sales. Built from the angle, not from a template, with variants to test what works.',
  'Estáticas': 'Statics',
  'Vídeos': 'Videos',
  'Carruseles': 'Carousels',
  'Formatos 1:1, 4:5 y 9:16': '1:1, 4:5 and 9:16 formats',
  'Variantes para test': 'Test variants',
  'Piezas para tuzona': 'Pieces for tuzona',
  'Trabajo real': 'Real work',
  'Anuncio de tuzona: un coche amarillo iluminado por un foco entre coches grises. Aparca a la primera mientras el resto sigue conduciendo': 'tuzona ad: a yellow car under a spotlight among grey cars. Park first time while everyone else keeps driving',
  'tuzona · Estático 4:5': 'tuzona · Static 4:5',
  'Anuncio de tuzona: la mascota señala el móvil con la app. Aparca en Madrid sin dar vueltas': 'tuzona ad: the mascot points at the phone with the app. Park in Madrid without driving around',
  'Vídeo de anuncio de tuzona': 'tuzona video ad',
  'Anuncio de Olistic: ¿qué pasa si tomo Olistic? Mayor brillo, densidad, fortaleza y menos caída': 'Olistic ad: what happens if I take Olistic? More shine, density, strength and less hair loss',
  'Anuncio de Olistic: caída capilar, pelo seco, falta de brillo, uñas débiles y poca densidad tachados. Gracias a Olistic Women': 'Olistic ad: hair loss, dry hair, dullness, weak nails and low density crossed out. Thanks to Olistic Women',
  'Anuncio de Olistic: te ayuda a tener pelazo, pero también reduce el estrés, apoya el sistema inmune, fortalece las uñas y nutre la piel': 'Olistic ad: great hair, plus less stress, immune support, stronger nails and nourished skin',
  'Vídeo de Mogu: el empleado del mes en una oficina': 'Mogu video: employee of the month in an office',
  'Vídeo animado de una agencia de viajes: un agente rodeado de pantallas y post-its': 'Animated travel agency video: an agent surrounded by screens and sticky notes',
  'Vídeo UGC: una chica cuenta su historia a cámara': 'UGC video: a woman tells her story to camera',
  'Vídeo de Hogar Esencial: contratación online paso a paso': 'Hogar Esencial video: step-by-step online sign-up',
  'Anuncio de Olistic con objeciones tachadas': 'Olistic ad with objections crossed out',
  'Anuncio de tuzona': 'tuzona ad',
  'Landing de rhode': 'rhode landing page',
  'Perfume Rare sobre mármol rosa': 'Rare perfume on pink marble',
  'Vídeo de Mogu': 'Mogu video',
  'Activar sonido': 'Sound on',
  'Silenciar': 'Mute',
  'tuzona · Vídeo 9:16': 'tuzona · Video 9:16',
  'Anuncio de tuzona: vista cenital de un aparcamiento con un hueco señalado. Madrid es terrible para conducir. ¿Y para aparcar?': 'tuzona ad: top view of a car park with one free spot. Madrid is terrible to drive in. And to park?',
  'Más marcas': 'More brands',
  'Anuncio de La Dehesa Club de Golf: una pelota y un peluche en el hoyo. El único sitio donde no escucharás «Mamá, vámonos ya»': 'La Dehesa Golf Club ad: a ball and a teddy bear in the hole. The only place you won\'t hear "Mum, let\'s go"',
  'La Dehesa · Estático 4:5': 'La Dehesa · Static 4:5',
  'Anuncio de Olistic: si has puesto tener pelazo en tu Vision Board, Olistic Women es para ti': 'Olistic ad: if great hair is on your vision board, Olistic Women is for you',
  'Olistic · Estático 1:1': 'Olistic · Static 1:1',
  'Anuncio de Olistic: ¿el tinte hizo que perdieras densidad en tu cabello?': 'Olistic ad: did hair dye leave your hair thinner?',
  'Anuncio de elha laser center: ¿juegas al baloncesto? Primera sesión láser gratis': 'elha laser center ad: do you play basketball? First laser session free',
  'elha laser center · Estático 4:5': 'elha laser center · Static 4:5',
  'Anuncio de Olistic: además de mejorar tu pelo, aporta energía, refuerza la inmunidad y mejora tu piel': 'Olistic ad: besides improving your hair, it boosts energy, immunity and your skin',
  'Anuncio de Olistic: ¿tu peluquera cortó demasiado?': 'Olistic ad: did your hairdresser cut too much?',
  'Anuncio de elha laser center: esto y que el vello no te moleste. Depilarme gratis': "elha laser center ad: this, and hair that doesn't bother you. Free hair removal",
  'Estructura primero, estética después. Diseño y monto la página completa, responsive y lista para conectar con tus campañas. Pasa el cursor para recorrerlas o ábrelas en grande, en escritorio o en móvil.': 'Structure first, looks second. I design and build the whole page, responsive and ready to plug into your campaigns. Hover to scroll through them or open them full size, on desktop or mobile.',
  'Estructura y wireframe': 'Structure and wireframe',
  'Diseño': 'Design',
  'Montaje responsive': 'Responsive build',
  'Variantes A/B': 'A/B variants',
  'Páginas': 'Pages',
  'Landing de tuzona': 'tuzona landing page',
  'tuzona · Landing de conversión': 'tuzona · Conversion landing page',
  'Escritorio': 'Desktop',
  'Móvil': 'Mobile',
  'Landing de rhode': 'rhode landing page',
  'rhode · proyecto personal': 'rhode · personal project',
  'Imágenes o vídeos sueltos para campaña, producto o redes. Lo difícil no es generar una imagen bonita: es que la décima se parezca a la primera. Mismo personaje, misma luz, mismo universo.': "One-off images or videos for campaigns, products or social. The hard part isn't making one pretty image: it's making the tenth look like the first. Same character, same light, same world.",
  'Imagen de producto': 'Product imagery',
  'Imagen de campaña': 'Campaign imagery',
  'Personajes y mundos propios': 'Original characters and worlds',
  'Clips de vídeo': 'Video clips',
  'Producto, personajes y mundos': 'Products, characters and worlds',
  'Perfume Rare sobre una bandeja dorada y mármol rosa': 'Rare perfume on a gold tray and pink marble',
  'Rare Beauty · proyecto personal': 'Rare Beauty · personal project',
  'Escena de fieltro: escritorio': 'Felt scene: desk',
  'Tres manos sostienen el perfume Rare': 'Three hands holding the Rare perfume',
  'Escena de fieltro: fiesta': 'Felt scene: party',
  'Modelo tumbada riendo con dos frascos de Rare sobre los ojos': 'Model lying down laughing with two Rare bottles over her eyes',
  'Escena de fieltro: sofá': 'Felt scene: sofa',
  'Perfume Rare con gotas de miel y bayas, reflejado sobre una superficie oscura': 'Rare perfume with honey drops and berries, reflected on a dark surface',
  'Escena de fieltro: espejo': 'Felt scene: mirror',
  'Dos manos a contraluz alrededor del perfume Rare': 'Two backlit hands around the Rare perfume',
  'Personaje de cuerpo entero': 'Full-body character',
  'Modelo sonriendo en la cama con el perfume Rare en la mano': 'Model smiling in bed holding the Rare perfume',
  'Escena de fieltro: portátil': 'Felt scene: laptop',
  'Vídeo con IA': 'AI video',
  'Vídeo de tuzona: hay huecos': 'tuzona video: there are free spots',
  'tuzona · ¿Y si aparcas a la primera?': 'tuzona · What if you park first time?',
  'Vídeo de Xcape: dos chicos y un bate': 'Xcape video: two guys and a bat',
  'Xcape · Vídeo con IA': 'Xcape · AI video',
  'Perfume Rare con un brillo cálido de fondo': 'Rare perfume with a warm glow behind',
  'Mi avatar de fieltro cruza un pasillo de láseres': 'My felt avatar crossing a laser corridor',
  'Mi avatar · Vídeo con IA': 'My avatar · AI video',
  'Mi avatar de fieltro trabaja en el portátil': 'My felt avatar working on her laptop',
  'Adapto tu contenido grabado a vídeos que enganchan y convierten. Reels, stories, TikTok y anuncios, con ritmo, subtítulos y un gancho desde el primer segundo.': 'I turn your recorded footage into videos that hook and convert. Reels, stories, TikTok and ads, with pace, subtitles and a hook from the very first second.',
  'Reels y TikTok': 'Reels and TikTok',
  'Vídeo para ads': 'Video for ads',
  'Subtítulos': 'Subtitles',
  'Versiones por formato': 'Versions per format',
  'Clips verticales': 'Vertical clips',
  'Mi avatar de fieltro en el sofá, con subtítulos': 'My felt avatar on the sofa, with subtitles',
  'Mi avatar · Reel con subtítulos': 'My avatar · Reel with subtitles',
  '¿Te encaja este hilo?': 'Is this your thread?',
  'Vista de la landing': 'Landing page view',
  'Tamaño': 'Size',
  'Landing a tamaño real': 'Full-size landing page',
  'Preply · Landing B2B': 'Preply · B2B landing page',
  'preply · cursos de inglés para empresas': 'preply · English courses for companies',
  'Landing de Preply': 'Preply landing page',
  'Vídeo de Nationale-Nederlanden sobre ahorro con garantía': 'Nationale-Nederlanden video about guaranteed savings',
  'Nationale-Nederlanden · Vídeo 4:5': 'Nationale-Nederlanden · Video 4:5',
  'Vídeo de Mogu: pídeselo a Mogu': 'Mogu video: just ask Mogu',
  'Mogu · Vídeo 16:9': 'Mogu · Video 16:9',
  'Vídeo de plastilina en inglés': 'Plasticine video in English',
  'Plastilina · Vídeo en inglés': 'Plasticine · Video in English',
  'Clip vertical': 'Vertical clip',
  // mensajes que pone el código
  'Email copiado. Hablamos pronto.': 'Email copied. Talk soon.',
  'Abriendo tu correo. El email también está copiado: ': "Opening your mail app. The email's copied too: ",
  'Escríbeme a ': 'Write to me at ',
  // etiquetas del cursor
  'tira': 'pull', 'gíralo': 'spin it', 'recorre': 'scroll', 'arrastra': 'drag', 'escríbeme': 'write me', 'hola': 'hi'
};

const KEY = 'nudo-lang';
let lang = 'es';
try { lang = localStorage.getItem(KEY) === 'en' ? 'en' : 'es'; } catch (e) {}
const t = s => (lang === 'en' && EN[s] !== undefined ? EN[s] : s);
window.nudoLang = lang;
window.t = t;

if (lang === 'en') {
  const html = document.documentElement;
  html.lang = 'en';
  html.classList.add('lang-en');
  document.title = t(document.title);
  const md = document.querySelector('meta[name="description"]');
  if (md) md.content = 'Strategy, copy, ad design, landing pages, AI generations and video editing for brands that know they need more, but not where to start.';
  // textos
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: n => (n.parentElement && n.parentElement.closest('script, style, svg, iframe') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const n of nodes) {
    const raw = n.nodeValue, key = raw.split(/\s+/).join(' ').trim();
    if (!key || EN[key] === undefined) continue;
    const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    n.nodeValue = lead + EN[key] + trail;
  }
  // atributos
  for (const a of ['alt', 'aria-label', 'title', 'data-titulo', 'data-cursor']) {
    document.querySelectorAll('[' + a + ']').forEach(el => { const v = el.getAttribute(a); if (EN[v] !== undefined) el.setAttribute(a, EN[v]); });
  }
}

// botón ES / EN
const btn = document.querySelector('[data-lang]');
if (btn) {
  btn.textContent = lang === 'en' ? 'ES' : 'EN';
  btn.setAttribute('aria-label', lang === 'en' ? 'Ver en español' : 'View in English');
  btn.addEventListener('click', () => {
    try { localStorage.setItem(KEY, lang === 'en' ? 'es' : 'en'); sessionStorage.setItem('nudo-quick', '1'); } catch (e) {}
    location.reload();
  });
}
})();
