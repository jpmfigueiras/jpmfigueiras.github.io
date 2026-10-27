/* Theme: saved choice, otherwise dark */
(function () {
  var root = document.documentElement, t = null;
  try { t = localStorage.getItem('jf-theme'); } catch (e) {}
  root.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  document.getElementById('theme-btn').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('jf-theme', next); } catch (e) {}
  });
})();

/* i18n */
var EN = {};
document.querySelectorAll('[data-i18n]').forEach(function (el) {
  var k = el.getAttribute('data-i18n');
  if (!(k in EN)) EN[k] = el.innerHTML;
});
var current = 'en';
function setLang(lang) {
  current = lang;
  var dict = lang === 'pt' ? PT : EN;
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (dict[k] != null) el.innerHTML = dict[k];
  });
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
  });
  try { localStorage.setItem('jf-lang', lang); } catch (e) {}
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}
document.querySelectorAll('.lang button').forEach(function (b) {
  b.addEventListener('click', function () {
    if (b.dataset.lang === current) return;
    if (window.gsap && !reduce) {
      gsap.to('main, footer', { opacity: 0, duration: .18, onComplete: function () {
        setLang(b.dataset.lang);
        gsap.to('main, footer', { opacity: 1, duration: .3 });
      }});
    } else setLang(b.dataset.lang);
  });
});
var saved = null;
try { saved = localStorage.getItem('jf-lang'); } catch (e) {}
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
setLang(saved || ((navigator.language || '').toLowerCase().indexOf('pt') === 0 ? 'pt' : 'en'));

/* Copy email */
document.getElementById('copy').addEventListener('click', function () {
  var btn = this, text = document.getElementById('mail').textContent;
  function done() { btn.textContent = current === 'pt' ? 'Copiado ✓' : 'Copied ✓'; setTimeout(function () { btn.innerHTML = (current === 'pt' ? PT : EN)['ct.copy']; }, 1600); }
  function fallback() {
    var r = document.createRange(); r.selectNodeContents(document.getElementById('mail'));
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }
  try { navigator.clipboard.writeText(text).then(done, fallback); } catch (e) { fallback(); }
});

/* Animations */
if (window.gsap && !reduce) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero intro
  var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.hero h1 .inner', { yPercent: 105, duration: 1.1, stagger: .1 })
    .from('.h-fade', { y: 24, opacity: 0, duration: .8, stagger: .08 }, '-=.75');

  // Progress bar
  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });

  // Marquee, speeds up with scroll velocity
  var marquee = gsap.to('.track-m', { xPercent: -50, ease: 'none', duration: 32, repeat: -1 });
  ScrollTrigger.create({
    onUpdate: function (self) {
      var v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
      gsap.to(marquee, { timeScale: (self.direction === 1 ? 1 : -1) * (1 + v), duration: .3, overwrite: true });
      gsap.to(marquee, { timeScale: self.direction === 1 ? 1 : -1, duration: 1.2, delay: .3 });
    }
  });

  // Section reveals (content stays readable before triggering)
  gsap.utils.toArray('.reveal').forEach(function (el) {
    gsap.from(el, {
      y: 48, opacity: .25, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true }
    });
  });

  // Counters count up when seen (show final value at rest)
  gsap.utils.toArray('.count').forEach(function (el) {
    var to = +el.dataset.to, suffix = el.dataset.suffix || '', o = { v: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: function () {
        gsap.fromTo(o, { v: 0 }, { v: to, duration: 1.4, ease: 'power2.out',
          onUpdate: function () { el.textContent = Math.round(o.v) + suffix; } });
      }
    });
  });

  // Trust boundary draws across
  gsap.from('#boundary', { scaleX: 0, ease: 'none',
    scrollTrigger: { trigger: '.stack', start: 'top 80%', end: 'center 50%', scrub: .6 } });

  // Timeline rail fill
  gsap.to('#tl .tl-fill', { scaleY: 1, ease: 'none',
    scrollTrigger: { trigger: '#tl', start: 'top 70%', end: 'bottom 60%', scrub: .5 } });

  // Hero parallax
  gsap.to('.hero h1', { yPercent: -12, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Magnetic buttons (mouse only)
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.magnetic').forEach(function (btn) {
      var xTo = gsap.quickTo(btn, 'x', { duration: .5, ease: 'power3.out' });
      var yTo = gsap.quickTo(btn, 'y', { duration: .5, ease: 'power3.out' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * .3);
        yTo((e.clientY - r.top - r.height / 2) * .4);
      });
      btn.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });
  }
}

/* Position the trust boundary between Client and API rows */
function placeBoundary() {
  var api = document.querySelector('.stack .bnd'), b = document.getElementById('boundary');
  if (api && b) b.style.top = (api.offsetTop - 1) + 'px';
}
placeBoundary();
window.addEventListener('resize', placeBoundary);
document.fonts && document.fonts.ready.then(placeBoundary);
