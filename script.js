/* ================================================
   CURSOR PERSONALIZADO
================================================ */
const cursorEl = document.getElementById('cursor');
const cursorEmojis = ['💗','💕','💖','❤️','💓','💞','🌹'];
let cursorIdx = 0;

document.addEventListener('mousemove', e => {
  cursorEl.style.left = e.clientX + 'px';
  cursorEl.style.top  = e.clientY + 'px';
  actualizarBarra();
  spawnGlitter(e);
});

document.addEventListener('click', () => {
  cursorIdx = (cursorIdx + 1) % cursorEmojis.length;
  cursorEl.innerHTML = cursorEmojis[cursorIdx];
  cursorEl.style.transform = 'translate(-50%,-50%) scale(1.5)';
  setTimeout(() => { cursorEl.style.transform = 'translate(-50%,-50%) scale(1)'; }, 200);
});

/* ================================================
   BARRA DE PROGRESO AL HACER SCROLL
================================================ */
const barraAmor = document.getElementById('barra-amor');

function actualizarBarra() {
  const scrollTop    = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const porcentaje   = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  barraAmor.style.width = porcentaje + '%';
}

window.addEventListener('scroll', actualizarBarra);

/* ================================================
   GLITTER EN CURSOR
================================================ */
let glitterCooldown = 0;

function spawnGlitter(e) {
  if (Date.now() - glitterCooldown < 80) return;
  glitterCooldown = Date.now();
  const g = document.createElement('div');
  g.classList.add('glitter');
  const size = Math.random() * 8 + 4;
  const hue  = Math.random() * 40 + 320;
  g.style.cssText = `
    width:${size}px; height:${size}px;
    left:${e.clientX + (Math.random()-0.5)*30}px;
    top:${e.clientY  + (Math.random()-0.5)*30}px;
    background:hsl(${hue},100%,70%);
    box-shadow:0 0 ${size*2}px hsl(${hue},100%,70%);
  `;
  document.body.appendChild(g);
  setTimeout(() => g.remove(), 800);
}

/* ================================================
   CANVAS DE ESTRELLAS / PARTÍCULAS
================================================ */
const canvas = document.getElementById('canvas-estrellas');
const ctx    = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particula {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * canvas.width;
    this.y     = Math.random() * canvas.height;
    this.r     = Math.random() * 1.5 + 0.3;
    this.vx    = (Math.random() - 0.5) * 0.3;
    this.vy    = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.6 + 0.1;
    this.pulso = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.pulso += 0.02;
    this.alpha = 0.2 + Math.sin(this.pulso) * 0.3;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle   = `hsl(${330 + Math.sin(this.pulso)*20}, 80%, 75%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

const particulas = [];
for (let i = 0; i < 180; i++) particulas.push(new Particula());

function animarParticulas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particulas.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animarParticulas);
}
animarParticulas();

/* ================================================
   CORAZONES FLOTANTES CONTINUOS
================================================ */
const emojisCorazon = ['❤️','💕','💖','💗','💓','🌹','💞','✨','💝'];

function crearCorazonFlotante() {
  const c        = document.createElement('div');
  c.classList.add('corazon-flotante');
  const emoji    = emojisCorazon[Math.floor(Math.random() * emojisCorazon.length)];
  const size     = Math.random() * 18 + 12;
  const duracion = Math.random() * 6 + 6;
  c.innerHTML    = emoji;
  c.style.cssText = `
    left:${Math.random() * 100}vw;
    bottom:-60px;
    font-size:${size}px;
    animation-duration:${duracion}s;
    animation-delay:${Math.random() * 2}s;
  `;
  document.body.appendChild(c);
  setTimeout(() => c.remove(), (duracion + 2) * 1000);
}

setInterval(crearCorazonFlotante, 600);

/* ================================================
   FUNCIÓN ANIMAR NÚMERO (CONTADOR)
================================================ */
function animarNumero(id, valor) {
  const el = document.getElementById(id);
  if (!el) return;
  const actual = parseInt(el.textContent) || 0;
  if (actual !== valor) {
    el.style.transform = 'scale(1.3)';
    el.style.color     = '#ff4d6d';
    el.textContent     = String(valor).padStart(2, '0');
    setTimeout(() => {
      el.style.transform = 'scale(1)';
      el.style.color     = '';
    }, 200);
  }
}

/* ================================================
   CONTADOR REGRESIVO: 20 → 0
================================================ */
let cuentaRegresiva   = 20;
let intervaloContador = null;

function actualizarContador() {
  animarNumero('cnt-dias',     0);
  animarNumero('cnt-horas',    0);
  animarNumero('cnt-minutos',  0);
  animarNumero('cnt-segundos', cuentaRegresiva);

  if (cuentaRegresiva > 0) {
    cuentaRegresiva--;
  } else {
    clearInterval(intervaloContador);
  }
}

actualizarContador();
intervaloContador = setInterval(actualizarContador, 1000);

/* ================================================
   BOTÓN REVELAR SECRETO
================================================ */
function revelarSecreto() {
  const btn = document.getElementById('btn-secreto');
  btn.textContent         = '💗 Ya lo sabes…';
  btn.style.borderColor   = 'rgba(255,77,109,0.8)';
  btn.style.boxShadow     = '0 0 50px rgba(255,77,109,0.5)';
  btn.style.letterSpacing = '3px';
  for (let i = 0; i < 30; i++) setTimeout(crearCorazonFlotante, i * 80);
  document.getElementById('seccion-cartas').scrollIntoView({ behavior: 'smooth' });
}

/* ================================================
   ABRIR SOBRE
================================================ */
let sobreAbierto = false;

function abrirSobre() {
  if (sobreAbierto) return;
  sobreAbierto = true;
  const sobre = document.getElementById('sobre-envelope');
  sobre.style.transform  = 'scale(0) rotate(20deg)';
  sobre.style.opacity    = '0';
  sobre.style.transition = 'all 0.5s ease';
  setTimeout(() => {
    document.getElementById('carta-mensaje').style.display = 'block';
    for (let i = 0; i < 20; i++) setTimeout(crearCorazonFlotante, i * 120);
  }, 400);
}

/* ================================================
   RAZONES PARA AMARTE
================================================ */
const razones = [
  { num: '01', texto: '"Porque tu sonrisa ilumina hasta los días más grises."' },
  { num: '02', texto: '"Porque me haces reír cuando más lo necesito."' },
  { num: '03', texto: '"Porque me aceptas exactamente como soy."' },
  { num: '04', texto: '"Porque tu voz es mi canción favorita."' },
  { num: '05', texto: '"Porque contigo el tiempo siempre es poco."' },
  { num: '06', texto: '"Porque me enseñas algo nuevo cada día."' },
  { num: '07', texto: '"Porque cuando te miro, sé que estoy en casa."' },
  { num: '08', texto: '"Porque eres la respuesta que no sabía que buscaba."' },
  { num: '09', texto: '"Porque me haces querer ser mejor persona."' },
  { num: '10', texto: '"Porque te quiero. Simplemente, te quiero."' },
];

let razonActual = 0;

function siguienteRazon() {
  razonActual = (razonActual + 1) % razones.length;
  const { num, texto } = razones[razonActual];
  const numEl = document.getElementById('numero-razon');
  const txtEl = document.getElementById('texto-razon');
  const btn   = document.getElementById('btn-razon');

  numEl.style.opacity = '0';
  txtEl.style.opacity = '0';

  setTimeout(() => {
    numEl.textContent   = num;
    txtEl.textContent   = texto;
    numEl.style.opacity = '1';
    txtEl.style.opacity = '1';
  }, 300);

  btn.textContent = razonActual === razones.length - 1
    ? 'Volver al principio 💕'
    : 'Ver siguiente razón →';
}

/* ================================================
   ANIMACIONES AL HACER SCROLL
================================================ */
const observador = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in-scroll').forEach(el => observador.observe(el));

/* ================================================
   PARALLAX EN HERO
================================================ */
window.addEventListener('scroll', () => {
  const hero = document.getElementById('hero');
  hero.style.transform = `translateY(${window.scrollY * 0.3}px)`;
});

/* ================================================
   EFECTO 3D EN CARTAS
================================================ */
document.querySelectorAll('.carta').forEach(carta => {
  carta.addEventListener('mousemove', e => {
    const rect = carta.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 20;
    carta.style.transform = `translateY(-8px) rotateX(${-y}deg) rotateY(${x}deg)`;
  });
  carta.addEventListener('mouseleave', () => {
    carta.style.transform = '';
  });
});
