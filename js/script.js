// ============================================================================
// ANIL PALIWAL PORTFOLIO — Interactive Scripts
// Terminal typewriter, orbital animation, scroll reveals, active nav tracking
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {

  // ========== UTILITY: Sleep ==========
  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ========== 1. TERMINAL TYPEWRITER ENGINE ==========
  const terminalEl = document.getElementById('terminal-output');

  if (terminalEl) {
    const sequence = [
      { type: 'prompt', text: '→ ~ ' },
      { type: 'cmd', text: 'whoami', speed: 70 },
      { type: 'newline' },
      { type: 'output', text: '  AI/ML Developer @ Ankpal Technologies', cls: 'terminal-string', speed: 22 },
      { type: 'newline' },
      { type: 'output', text: '  Research: IIT Guwahati · Vision Transformers', cls: 'terminal-dim', speed: 18 },
      { type: 'newline' },
      { type: 'output', text: '  IIIT BBSR · LC Guardian 2145 · CF Specialist', cls: 'terminal-dim', speed: 18 },
      { type: 'pause', ms: 600 },
      { type: 'newline' },
      { type: 'prompt', text: '→ ' },
      { type: 'cmd', text: 'stack — ', speed: 60 },
      { type: 'output', text: 'pytorch · fastapi · vllm · crewai · docker', cls: 'terminal-string', speed: 16 },
      { type: 'output', text: ' _', cls: 'terminal-accent', speed: 0 },
    ];

    let currentLine = null;

    function createNewLine() {
      currentLine = document.createElement('div');
      currentLine.className = 'terminal-line';
      terminalEl.appendChild(currentLine);
      return currentLine;
    }

    async function typeText(text, speed, className) {
      if (!currentLine) createNewLine();
      const span = document.createElement('span');
      if (className) span.className = className;
      currentLine.appendChild(span);

      if (speed === 0) {
        span.textContent = text;
        return;
      }

      for (let i = 0; i < text.length; i++) {
        span.textContent += text[i];
        const jitter = speed + (Math.random() * speed * 0.5 - speed * 0.25);
        await sleep(Math.max(8, jitter));
      }
    }

    async function runTerminalSequence() {
      for (const step of sequence) {
        switch (step.type) {
          case 'prompt':
            createNewLine();
            await typeText(step.text, 0, 'terminal-prompt');
            break;
          case 'cmd':
            await typeText(step.text, step.speed || 70, 'terminal-cmd');
            await sleep(100);
            break;
          case 'output':
            await typeText(step.text, step.speed || 20, step.cls || 'terminal-string');
            break;
          case 'newline':
            createNewLine();
            break;
          case 'pause':
            await sleep(step.ms || 300);
            break;
        }
      }

      // Add blinking cursor at the end
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      if (currentLine) currentLine.appendChild(cursor);

      // Loop after delay
      await sleep(5000);
      terminalEl.innerHTML = '';
      currentLine = null;
      runTerminalSequence();
    }

    // Start after a short delay
    const terminalCard = terminalEl.closest('.terminal-card');
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          termObserver.disconnect();
          setTimeout(() => runTerminalSequence(), 500);
        }
      });
    }, { threshold: 0.2 });

    termObserver.observe(terminalCard);
  }

  // ========== 2. ORBITAL CANVAS ANIMATION ==========
  const canvas = document.getElementById('orbital-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animId;

    function resizeCanvas() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const orbits = [
      { rx: 160, ry: 80, angle: 0, speed: 0.003, tilt: -0.3, color: 'rgba(212, 165, 116, 0.3)' },
      { rx: 200, ry: 100, angle: 1.5, speed: 0.004, tilt: 0.2, color: 'rgba(212, 165, 116, 0.2)' },
      { rx: 130, ry: 130, angle: 3, speed: 0.002, tilt: -0.5, color: 'rgba(96, 165, 250, 0.15)' },
      { rx: 240, ry: 60, angle: 4.5, speed: 0.0025, tilt: 0.4, color: 'rgba(212, 165, 116, 0.15)' },
    ];

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.0003 + 0.0001,
      });
    }

    // Floating math equations
    const equations = [
      'e^(iωt)=cos(ωt)+i·sin(ωt)',
      'sin(x)=sin(nπ/n)',
      'ℱ(f)(ξ)= ∫ f(t)e^(-2πi ξt)',
      'Σ cₙ e^(2πint/T)',
      'X₀= Σ xₙ e^(-2πink/N)',
    ];

    function drawOrbital(time) {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw floating particles
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -0.05) p.y = 1.05;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 165, 116, ${p.alpha})`;
        ctx.fill();
      });

      // Draw equations
      ctx.font = '10px "JetBrains Mono", monospace';
      equations.forEach((eq, i) => {
        const ex = (0.1 + i * 0.2) * w;
        const ey = (0.15 + (i % 3) * 0.3) * h;
        ctx.fillStyle = `rgba(212, 165, 116, ${0.08 + Math.sin(time * 0.001 + i) * 0.04})`;
        ctx.fillText(eq, ex, ey);
      });

      // Draw central sphere
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
      gradient.addColorStop(0, 'rgba(212, 165, 116, 0.15)');
      gradient.addColorStop(0.5, 'rgba(212, 165, 116, 0.05)');
      gradient.addColorStop(1, 'rgba(212, 165, 116, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner sphere
      ctx.beginPath();
      ctx.arc(cx, cy, 25, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(212, 165, 116, 0.08)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 165, 116, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw orbits
      orbits.forEach(orbit => {
        orbit.angle += orbit.speed;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(orbit.tilt);

        // Draw orbit path
        ctx.beginPath();
        ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Draw orbiting dot
        const dotX = Math.cos(orbit.angle) * orbit.rx;
        const dotY = Math.sin(orbit.angle) * orbit.ry;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = orbit.color.replace(/[\d.]+\)$/, '0.8)');
        ctx.fill();

        // Glow
        const glow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 12);
        glow.addColorStop(0, orbit.color.replace(/[\d.]+\)$/, '0.3)'));
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(dotX, dotY, 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.restore();
      });

      animId = requestAnimationFrame(() => drawOrbital(performance.now()));
    }

    // Start when visible
    const orbitalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          drawOrbital(performance.now());
          orbitalObserver.disconnect();
        }
      });
    }, { threshold: 0.1 });

    orbitalObserver.observe(canvas.parentElement);
  }

  // ========== 3. SCROLL REVEAL ANIMATION ==========
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger reveals within the same viewport
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.revealDelay = (i % 6) * 80; // stagger within each set
    revealObserver.observe(el);
  });

  // ========== 4. ACTIVE NAVIGATION TRACKING ==========
  const sections = document.querySelectorAll('section[id], .contact-section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sectionDots = document.querySelectorAll('.section-dot[data-target]');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        // Update nav links
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });

        // Update sidebar dots
        sectionDots.forEach(dot => {
          dot.classList.toggle('active', dot.dataset.target === id);
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-80px 0px -40% 0px' });

  sections.forEach(section => navObserver.observe(section));

  // ========== 5. SMOOTH SCROLL FOR NAV LINKS ==========
  document.querySelectorAll('.nav-link[href^="#"], .section-dot[data-target]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const target = el.getAttribute('href')?.replace('#', '') || el.dataset.target;
      const section = document.getElementById(target);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ========== 6. DECORATIVE BAR GRAPH ==========
  const barGraph = document.getElementById('bar-graph');
  if (barGraph) {
    const barCount = 80;
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'bar';
      const h = Math.random() * 35 + 5;
      bar.style.height = h + 'px';
      bar.style.opacity = 0.2 + Math.random() * 0.4;
      barGraph.appendChild(bar);
    }
  }

  // ========== 7. NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      navbar.style.background = 'rgba(13, 15, 20, 0.95)';
      navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(13, 15, 20, 0.85)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  }, { passive: true });

  // ========== 8. HERO BADGE COUNTER ANIMATION ==========
  const badges = document.querySelectorAll('.hero-badge .badge-value');
  const badgeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const finalText = el.textContent;

        // Only animate numeric values
        const numMatch = finalText.match(/^(\d+)/);
        if (numMatch) {
          const target = parseInt(numMatch[1]);
          const suffix = finalText.replace(numMatch[1], '');
          let current = 0;
          const duration = 1500;
          const startTime = performance.now();

          function animate(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }

          requestAnimationFrame(animate);
        }

        badgeObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  badges.forEach(badge => badgeObserver.observe(badge));

  // ========== 9. THEME SWITCHER ==========
  const themeSwitcher = document.getElementById('theme-switcher');
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-current-label');
  const themeOptions = document.querySelectorAll('.theme-option');

  // Theme names for display
  const themeNames = {
    warm: 'Warm',
    signal: 'Signal',
    paper: 'Paper',
    forest: 'Forest',
    rose: 'Rose',
    amber: 'Amber',
    violet: 'Violet',
  };

  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'warm';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'warm') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }

    // Update label
    if (themeLabel) themeLabel.textContent = themeNames[theme] || theme;

    // Update active state
    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.themeValue === theme);
    });

    // Save to localStorage
    localStorage.setItem('portfolio-theme', theme);
  }

  // Toggle panel
  if (themeToggle) {
    themeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      themeSwitcher.classList.toggle('open');
    });
  }

  // Theme option click
  themeOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = opt.dataset.themeValue;
      applyTheme(theme);
    });
  });

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (themeSwitcher && !themeSwitcher.contains(e.target)) {
      themeSwitcher.classList.remove('open');
    }
  });

});
