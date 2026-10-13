// Zelalem Tesfaye - Main Portfolio Interactivity & Animations

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initTheme();
  initProjectFilters();
  initModals();
  initAIAssistantUI();
  if (window.initTerminal) window.initTerminal();
  initContactForm();
  initMobileMenu();
});

/* ============================================================
   1. Interactive Background Particle Canvas
   ============================================================ */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(50, Math.floor(width / 30));

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(129, 140, 248, '
    });
  }

  let mouse = { x: null, y: null, maxDist: 120 };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.45)';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // Mouse proximity interaction
      if (mouse.x !== null) {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.maxDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 * (1 - mdist / mouse.maxDist)})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(render);
  }
  render();
}

/* ============================================================
   2. Dynamic Typewriter Effect
   ============================================================ */
function initTypewriter() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = [
    'Software Engineer',
    'Data Annotator & AI Specialist',
    'UI/UX Designer (Figma)',
    'Web & Mobile App Developer',
    'Systems & Protocol Architect'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let speed = 90;

  function type() {
    const current = roles[roleIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 45;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 90;
    }

    if (!isDeleting && charIdx === current.length) {
      isDeleting = true;
      speed = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400; // Pause before typing new word
    }

    setTimeout(type, speed);
  }
  type();
}

/* ============================================================
   3. Theme Toggle (Dark / Light)
   ============================================================ */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('zt-theme') || 'dark';

  setTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('zt-theme', next);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.innerHTML = theme === 'dark' 
        ? `<svg class="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
        : `<svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    }
  }
}

/* ============================================================
   4. Project Filtering
   ============================================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active', 'bg-indigo-600', 'text-white'));
      filterBtns.forEach((b) => b.classList.add('bg-slate-800/80', 'text-slate-300'));

      btn.classList.add('active', 'bg-indigo-600', 'text-white');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');

      cards.forEach((card) => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease-in forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ============================================================
   5. Project Deep Dive Modal Dialogs
   ============================================================ */
const PROJECT_MODAL_DATA = {
  smartjob: {
    title: "Smart Job Portal",
    subtitle: "AI-Powered Recruitment & Monorepo Platform",
    badge: "Full-Stack & AI",
    stack: ["Python", "FastAPI", "React", "PostgreSQL", "ML Matching"],
    repo: "https://github.com/zedos62/smart-job-portal",
    overview: "A comprehensive recruitment platform designed to eliminate hiring friction. Features an intelligent resume parser and recommendation engine that matches candidate profile vectors with company requirements in real time.",
    architecture: [
      "Frontend: Component-driven web interface with applicant pipelines.",
      "Backend API: Fast REST microservices handling authenticated transactions.",
      "AI Engine: Python FastAPI microservice calculating similarity embeddings.",
      "Database: Relational PostgreSQL schema supporting multi-tenant queries."
    ]
  },
  jobhub: {
    title: "JobHub Enterprise",
    subtitle: "High-Volume COBOL Batch & Modern Recruitment Core",
    badge: "Enterprise & Systems",
    stack: ["COBOL", "Node.js", "Batch Processing", "RBAC", "Copybooks"],
    repo: "https://github.com/zedos62/Jobhub-enterprise",
    overview: "Engineered for high-volume enterprise operations where transactional accuracy and nightly batch reconciliation are critical. Bridges legacy COBOL performance with modern web dashboards.",
    architecture: [
      "Core Ledger: COBOL batch utilities for payroll and audit log processing.",
      "Data Mapping: Standardized copybooks converting data to JSON payloads.",
      "Web Layer: Node.js interface delivering real-time statistics and RBAC.",
      "Audit Pipeline: Continuous nightly runs with strict data integrity checks."
    ]
  },
  students: {
    title: "Students Portal",
    subtitle: "Modern Next.js 15 Academic Management System",
    badge: "Full-Stack Web",
    stack: ["Next.js 15", "Prisma ORM", "TypeScript", "Auth.js", "Tailwind CSS"],
    repo: "https://github.com/zedos62/Students-portal",
    overview: "Production-ready academic portal built with the latest Next.js 15 App Router. Empowers students to manage semester registrations, view enrolled credit totals, and interact with departmental catalogs seamlessly.",
    architecture: [
      "App Router: Server components with optimized client-side hydration.",
      "Security: Auth.js JWT session protection with Student/Admin role gates.",
      "Data Layer: Prisma ORM with automated migrations for PostgreSQL/Neon.",
      "UI: Clean responsive layout styled with Tailwind CSS."
    ]
  },
  libframeproto: {
    title: "libframeproto",
    subtitle: "Framed Binary Protocol Library & ClusterFuzzLite Harness",
    badge: "Systems & Security",
    stack: ["C", "ClusterFuzzLite", "libFuzzer", "TLV Streaming", "State Machine"],
    repo: "https://github.com/zedos62/libframeproto",
    overview: "Low-level binary protocol library engineered for ultra-fast, robust framed streaming. Designed specifically with defensive security in mind to guarantee zero crashes under hostile payloads.",
    architecture: [
      "TLV Engine: Streaming chunk parser handling Type-Length-Value records.",
      "State Machine: Deterministic session transitions preventing out-of-order state bugs.",
      "Fuzzing Integration: libFuzzer test harness with extensive seed corpus.",
      "CI Pipeline: Automated ClusterFuzzLite regression tests detecting ASan/UBSan issues."
    ]
  },
  minerva: {
    title: "Minerva Taskboard",
    subtitle: "Agile Task & Equipment Repair Tracking",
    badge: "Web Application",
    stack: ["React", "Node.js", "REST APIs", "Agile Workflow"],
    repo: "https://github.com/zedos62/minerva-taskboard",
    overview: "Intuitive task management app built for tracking equipment diagnostics, repair states, and team member assignments with drag-and-drop agility.",
    architecture: [
      "Client: Responsive React UI with optimistic UI updates.",
      "API: Express/Node.js REST service with audit timestamps.",
      "Workflow: Multi-column Kanban state progression."
    ]
  }
};

function initModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  document.querySelectorAll('.open-project-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = PROJECT_MODAL_DATA[key];
      if (!data) return;

      document.getElementById('modal-title').textContent = data.title;
      document.getElementById('modal-subtitle').textContent = data.subtitle;
      document.getElementById('modal-badge').textContent = data.badge;
      document.getElementById('modal-overview').textContent = data.overview;
      
      const repoBtn = document.getElementById('modal-repo-link');
      if (repoBtn) repoBtn.href = data.repo;

      const stackContainer = document.getElementById('modal-stack');
      stackContainer.innerHTML = data.stack
        .map((s) => `<span class="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-800 text-sky-300 border border-slate-700">${s}</span>`)
        .join('');

      const archContainer = document.getElementById('modal-architecture');
      archContainer.innerHTML = data.architecture
        .map((a) => `<li class="flex items-start gap-2 text-slate-300 text-sm"><span class="text-indigo-400 font-bold">•</span><span>${a}</span></li>`)
        .join('');

      modalOverlay.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  // Terminal Modal
  const termOverlay = document.getElementById('terminal-modal');
  const termToggleBtns = document.querySelectorAll('.toggle-terminal-btn');
  const termCloseBtn = document.getElementById('terminal-close-btn');

  termToggleBtns.forEach((b) => {
    b.addEventListener('click', () => {
      termOverlay.classList.toggle('active');
      if (termOverlay.classList.contains('active')) {
        setTimeout(() => document.getElementById('terminal-input')?.focus(), 100);
      }
    });
  });

  if (termCloseBtn) {
    termCloseBtn.addEventListener('click', () => termOverlay.classList.remove('active'));
  }
}

/* ============================================================
   6. AI Assistant UI Interactivity
   ============================================================ */
function initAIAssistantUI() {
  const panel = document.getElementById('ai-assistant-panel');
  const toggleBtns = document.querySelectorAll('.toggle-ai-btn');
  const closeBtn = document.getElementById('ai-close-btn');
  const sendBtn = document.getElementById('ai-send-btn');
  const input = document.getElementById('ai-input');
  const messagesScroll = document.getElementById('ai-messages-scroll');
  const chipBtns = document.querySelectorAll('.ai-chip-prompt');

  toggleBtns.forEach((b) => {
    b.addEventListener('click', () => {
      panel.classList.toggle('hidden');
      if (!panel.classList.contains('hidden')) {
        setTimeout(() => input?.focus(), 150);
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => panel.classList.add('hidden'));
  }

  async function handleSend(text) {
    const query = text || input.value.trim();
    if (!query || (window.ZelalemAI && window.ZelalemAI.isTyping)) return;

    // Add user message
    const userBubble = document.createElement('div');
    userBubble.className = 'flex justify-end';
    userBubble.innerHTML = `<div class="chat-bubble-user px-4 py-2.5 text-sm max-w-[85%] shadow-sm">${query}</div>`;
    messagesScroll.appendChild(userBubble);
    messagesScroll.scrollTop = messagesScroll.scrollHeight;

    input.value = '';

    // Create AI reply placeholder
    const aiContainer = document.createElement('div');
    aiContainer.className = 'flex items-start gap-2.5';
    aiContainer.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">AI</div>
      <div class="chat-bubble-ai px-4 py-3 text-sm max-w-[85%] shadow-sm ai-reply-content">
        <span class="inline-block w-2 h-2 rounded-full bg-sky-400 animate-ping"></span> Thinking...
      </div>
    `;
    messagesScroll.appendChild(aiContainer);
    messagesScroll.scrollTop = messagesScroll.scrollHeight;

    const replyBox = aiContainer.querySelector('.ai-reply-content');
    const answer = window.ZelalemAI.findResponse(query);

    setTimeout(() => {
      window.ZelalemAI.streamResponse(answer, replyBox);
    }, 250);
  }

  if (sendBtn) sendBtn.addEventListener('click', () => handleSend());
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  chipBtns.forEach((chip) => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) handleSend(prompt);
    });
  });
}

/* ============================================================
   7. Contact Form & Copy Email
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const copyBtn = document.getElementById('copy-email-btn');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('teszelalem6262@gmail.com').then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `✓ Copied to clipboard!`;
        copyBtn.classList.add('bg-emerald-600');
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
          copyBtn.classList.remove('bg-emerald-600');
        }, 2200);
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value;
      const email = document.getElementById('cf-email').value;
      const subject = document.getElementById('cf-subject').value;
      const message = document.getElementById('cf-message').value;

      const mailtoUrl = `mailto:teszelalem6262@gmail.com?subject=${encodeURIComponent(subject || 'Inquiry from Portfolio: ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;

      window.location.href = mailtoUrl;

      const successNotice = document.getElementById('form-feedback');
      if (successNotice) {
        successNotice.classList.remove('hidden');
        form.reset();
      }
    });
  }
}

/* ============================================================
   8. Mobile Navigation Menu
   ============================================================ */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }
}
