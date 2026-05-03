// ===== Particle Canvas =====
(function () {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');

  let W, H, particles;
  const COUNT = 80;
  const MAX_DIST = 130;
  const COLORS = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(129,140,248,'];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function randomBetween(a, b) { return a + Math.random() * (b - a); }

  function createParticle() {
    return {
      x: randomBetween(0, W),
      y: randomBetween(0, H),
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3),
      r: randomBetween(1.5, 3),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.3;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(99,102,241,' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', init);
})();

// ===== Typewriter =====
(function () {
  const el = document.getElementById('typewriter');
  const roles = [
    'Software Developer',
    'Data Scientist',
    'ML Engineer',
    'NLP Enthusiast',
    'Problem Solver',
  ];
  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  const SPEED_TYPE = 80;
  const SPEED_DELETE = 45;
  const PAUSE_END = 1800;
  const PAUSE_START = 400;

  function tick() {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
      setTimeout(tick, SPEED_TYPE);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
      setTimeout(tick, SPEED_DELETE);
    }
  }

  tick();
})();

// ===== Navbar scroll effect =====
(function () {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ===== Mobile hamburger =====
(function () {
  const btn = document.getElementById('navHamburger');
  const menu = document.getElementById('navRight');
  if (!btn) return;
  btn.addEventListener('click', function () {
    menu.classList.toggle('open');
  });
  document.addEventListener('click', function (e) {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
    }
  });
})();

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
