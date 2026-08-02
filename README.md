# Anil Paliwal — Portfolio

A modern, high-performance developer portfolio built with **vanilla HTML, CSS & JavaScript** — no frameworks, no dependencies. Designed with a **Bento Grid layout**, **glassmorphism**, and **terminal aesthetics** inspired by trending GitHub profile page designs.

![Portfolio Preview](images/profile.jpg)

---

## ✨ Design Features

| Feature | Description |
|---|---|
| **Bento Grid Layout** | Modular 4-column responsive grid with cards of varying sizes (2×2, 2×1, 1×2, 1×1) |
| **Terminal Typewriter** | Interactive `zsh` terminal with character-by-character typing animation that loops |
| **Glassmorphism Cards** | Frosted glass effect with `backdrop-filter: blur()`, subtle borders, and hover glow |
| **Scroll Reveal** | Cards fade in and slide up as you scroll using `IntersectionObserver` |
| **Bio Typewriter Loop** | Profile bio types out, holds, erases backwards, and restarts infinitely |
| **Micro-interactions** | Hover transforms, glow shadows, avatar scale-up, blinking status dot |
| **Monospace Terminal Font** | JetBrains Mono for tech pills and terminal — pure developer aesthetic |
| **Fully Responsive** | Adapts from 4-column → 2-column → 1-column across all screen sizes |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, `backdrop-filter`, animations
- **Vanilla JavaScript** — IntersectionObserver, async/await typewriter engine
- **Google Fonts** — Inter + JetBrains Mono

**Zero dependencies. Zero build tools. Pure frontend.**

---

## 📂 Project Structure

```
├── index.html          # Main portfolio page (Bento Grid)
├── about.html           # Research & background details
├── contact.html         # Contact form & social links
├── css/
│   └── style.css        # Complete design system
├── js/
│   └── script.js        # Typewriter engine, scroll reveal, form handler
├── images/
│   └── profile.jpg      # Profile photo
└── plan.md              # AWS EC2 deployment guide
```

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/akanil18/Portfolio.git
cd Portfolio

# Serve with any static server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

---

## ☁️ AWS EC2 Deployment

This portfolio is designed to be hosted on an **AWS EC2 Ubuntu instance** with Apache2. See [`plan.md`](plan.md) for the full step-by-step deployment guide covering:

- EC2 instance provisioning (Ubuntu 22.04 LTS)
- Security Group configuration (SSH, HTTP, HTTPS)
- Apache2 installation & configuration
- File deployment via SCP
- SSL setup with Let's Encrypt

---

## 👤 About

**Anil Paliwal** — AI/ML Developer | IIIT Bhubaneswar '27

- 🏆 LeetCode Guardian (Rating: 2145) | 700+ problems solved
- 🔬 Research Intern @ IIT Guwahati (Vision Transformers)
- 🤖 Building Agentic AI, fine-tuned LLMs (LoRA/QLoRA), and Voice AI pipelines
- 🏅 National Finalist — Meta × PyTorch × Hugging Face Hackathon (Top 800 / 31,000+)

---

## 📄 License

© 2026 Anil Paliwal. All rights reserved.
