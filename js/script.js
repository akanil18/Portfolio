// Anil Paliwal Portfolio — Interactive Scripts
// Bento Grid + Terminal Typewriter + GitHub Contribution Graph

document.addEventListener('DOMContentLoaded', () => {

  // ========== TERMINAL TYPEWRITER ENGINE ==========
  const terminalEl = document.getElementById('terminal-output');

  if (terminalEl) {
    // Define the sequence of terminal commands and outputs
    const sequence = [
      { type: 'prompt', text: '$ ' },
      { type: 'cmd', text: 'whoami', speed: 80 },
      { type: 'pause', ms: 300 },
      { type: 'output', text: 'AI/ML Developer & Research Engineer', cls: 'terminal-string', speed: 25 },
      { type: 'pause', ms: 500 },
      { type: 'prompt', text: '$ ' },
      { type: 'cmd', text: 'cat skills.txt', speed: 65 },
      { type: 'pause', ms: 300 },
      { type: 'output', text: 'LoRA/QLoRA Fine-Tuning, Agentic AI, Vision Transformers', cls: 'terminal-string', speed: 18 },
      { type: 'pause', ms: 500 },
      { type: 'prompt', text: '$ ' },
      { type: 'cmd', text: 'echo $STATUS', speed: 70 },
      { type: 'pause', ms: 300 },
      { type: 'output', text: 'Building autonomous AI systems @ scale', cls: 'terminal-keyword', speed: 22 },
      { type: 'pause', ms: 600 },
      { type: 'prompt', text: '$ ' },
      { type: 'cursor' },
    ];

    let currentLine = null;
    let currentSpan = null;

    function createNewLine() {
      currentLine = document.createElement('div');
      currentLine.className = 'terminal-line';
      terminalEl.appendChild(currentLine);
      return currentLine;
    }

    async function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeText(text, speed, className) {
      if (!currentLine) createNewLine();
      currentSpan = document.createElement('span');
      if (className) currentSpan.className = className;
      currentLine.appendChild(currentSpan);

      for (let i = 0; i < text.length; i++) {
        currentSpan.textContent += text[i];
        // Add slight randomness to typing speed for realism
        const jitter = speed + (Math.random() * speed * 0.6 - speed * 0.3);
        await sleep(Math.max(10, jitter));
      }
    }

    async function runSequence() {
      for (const step of sequence) {
        switch (step.type) {
          case 'prompt':
            createNewLine();
            const promptSpan = document.createElement('span');
            promptSpan.className = 'terminal-prompt';
            promptSpan.textContent = step.text;
            currentLine.appendChild(promptSpan);
            break;

          case 'cmd':
            await typeText(step.text, step.speed || 70, 'terminal-cmd');
            await sleep(150);
            break;

          case 'output':
            createNewLine();
            await typeText(step.text, step.speed || 20, step.cls || 'terminal-string');
            break;

          case 'pause':
            await sleep(step.ms || 300);
            break;

          case 'cursor':
            if (!currentLine) createNewLine();
            const cursor = document.createElement('span');
            cursor.className = 'terminal-cursor';
            currentLine.appendChild(cursor);
            break;
        }
      }

      // After sequence finishes, wait then clear and loop
      await sleep(3000);
      terminalEl.innerHTML = '';
      currentLine = null;
      currentSpan = null;
      runSequence(); // restart
    }

    // Start typing when the terminal card scrolls into view
    const terminalCard = terminalEl.closest('.terminal-card');
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          terminalObserver.disconnect();
          setTimeout(() => runSequence(), 400);
        }
      });
    }, { threshold: 0.3 });

    terminalObserver.observe(terminalCard);
  }

  // ========== PROFILE BIO TYPEWRITER (Looping) ==========
  const bioEl = document.getElementById('profile-bio-text');
  if (bioEl) {
    const bioText = 'Building Agentic AI systems, fine-tuned LLMs, and low-latency voice pipelines. Specializing in autonomous agents, LoRA/QLoRA, and Vision Transformers.';

    const bioCursor = document.createElement('span');
    bioCursor.className = 'terminal-cursor';
    bioCursor.style.cssText = 'height:12px;width:6px;display:inline-block;vertical-align:baseline;';

    async function bioLoop() {
      while (true) {
        // Clear previous text, keep cursor
        bioEl.textContent = '';
        bioCursor.style.display = 'inline-block';
        bioEl.appendChild(bioCursor);

        // Type in
        for (let i = 0; i < bioText.length; i++) {
          bioCursor.before(bioText[i]);
          await sleep(28 + (Math.random() * 18 - 9));
        }

        // Hold the full text for 4 seconds
        await sleep(4000);

        // Erase character by character (faster)
        const textNodes = [];
        bioEl.childNodes.forEach(n => { if (n.nodeType === 3) textNodes.push(n); });
        let fullText = textNodes.map(n => n.textContent).join('');
        // Replace all text nodes with one
        textNodes.forEach(n => n.remove());
        const singleNode = document.createTextNode(fullText);
        bioEl.insertBefore(singleNode, bioCursor);

        for (let i = fullText.length; i > 0; i--) {
          singleNode.textContent = fullText.slice(0, i - 1);
          await sleep(12);
        }

        // Brief pause before retyping
        await sleep(800);
      }
    }

    function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

    setTimeout(bioLoop, 800);
  }

  // ========== GitHub-style Contribution Graph ==========
  const graphEl = document.getElementById('contrib-graph');
  if (graphEl) {
    const levels = ['', 'l1', 'l2', 'l3', 'l4'];
    for (let i = 0; i < 140; i++) {
      const cell = document.createElement('div');
      cell.className = 'contrib-cell';
      const rand = Math.random();
      if (rand > 0.75) cell.classList.add(levels[1]);
      if (rand > 0.85) cell.classList.add(levels[2]);
      if (rand > 0.92) cell.classList.add(levels[3]);
      if (rand > 0.97) cell.classList.add(levels[4]);
      graphEl.appendChild(cell);
    }
  }

  // ========== Contact Form Handler ==========
  const form = document.getElementById('contact-form');
  const resp = document.getElementById('form-response');
  if (form && resp) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      resp.innerHTML = `
        <div style="margin-top: 0.75rem; padding: 0.65rem 1rem; background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.25); border-radius: 8px; color: #4ade80; font-size: 0.85rem; font-weight: 500;">
          ✓ Thanks, ${name}! Message received.
        </div>
      `;
      form.reset();
    });
  }

  // ========== Scroll Reveal Animation ==========
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.bento-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(card);
  });

});
