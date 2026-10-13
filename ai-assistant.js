// Zelalem Tesfaye - Intelligent Portfolio AI Assistant Engine

const ZELALEM_KNOWLEDGE = [
  {
    triggers: ['who', 'about', 'bio', 'intro', 'background', 'zelalem'],
    title: "Who is Zelalem Tesfaye?",
    response: `**Zelalem Tesfaye** is a multi-disciplinary **Software Engineer, Data Annotator, UI/UX Designer, and Systems Developer**.

He specializes in bridging high-level modern web architectures (Next.js 15, Python FastAPI, React) with resilient low-level systems (C binary protocol engineering, ClusterFuzzLite fuzzing) and enterprise batch backends (COBOL).

He is also passionate about **human-in-the-loop AI data annotation** and designing intuitive user interfaces in **Figma**.`
  },
  {
    triggers: ['jobhub', 'cobol', 'enterprise', 'batch'],
    title: "JobHub Enterprise Architecture",
    response: `**JobHub Enterprise** is an enterprise-scale applicant tracking and recruitment platform:

• **Architecture**: Integrates a high-performance **COBOL batch backend** with a modern **Node.js & JavaScript** web interface.
• **Core Capability**: Executes nightly high-volume batch processing for payroll sync, applicant audits, and bulk application pipelines.
• **Data Integrity**: Uses structured copybook records mapping COBOL data structures to JSON payloads.
• **Security**: Features enterprise Role-Based Access Control (RBAC) across candidates, employers, and audit teams.`
  },
  {
    triggers: ['smart', 'portal', 'job portal', 'recommendation', 'fastapi'],
    title: "Smart Job Portal (AI-Powered)",
    response: `**Smart Job Portal** is a full-stack, AI-powered recruitment monorepo:

• **AI & Recommendation Engine**: Powered by **Python & FastAPI**, implementing automated resume parsing, skill extraction, and candidate-job matching algorithms.
• **Web Platform**: Responsive JavaScript client with low-latency REST API services.
• **Database**: Scalable **PostgreSQL** relational schema for applications and recruiter dashboards.
• **Repository**: [github.com/zedos62/smart-job-portal](https://github.com/zedos62/smart-job-portal)`
  },
  {
    triggers: ['libframeproto', 'protocol', 'binary', 'tlv', 'fuzz', 'fuzzing', 'clusterfuzz', 'c '],
    title: "libframeproto (C Binary Protocol & Fuzzing)",
    response: `**libframeproto** is a high-performance, framed binary protocol library designed in **C**:

• **Core Features**: Implements Type-Length-Value (TLV) framing, streaming chunked parsers, and a deterministic session state machine.
• **Security & Fuzzing**: Continuously tested using **libFuzzer** and integrated into **Google's ClusterFuzzLite** pipeline to detect memory leaks, buffer overruns, and undefined behavior.
• **Target Use**: Engineered for ultra-low latency, mission-critical binary networking.`
  },
  {
    triggers: ['students', 'prisma', 'nextjs', 'next.js', 'next 15', 'auth'],
    title: "Students Portal (Next.js 15)",
    response: `**Students Portal** is a production-ready academic dashboard built on the latest **Next.js 15 App Router**:

• **Tech Stack**: Next.js 15, **TypeScript**, **Prisma ORM**, **Tailwind CSS**, and **Auth.js (NextAuth v5)**.
• **Features**: Course catalog with dynamic Add/Drop subjects, automated credit hours calculation, and role-based permissions (Student & Admin).
• **Deployment**: Production database migration readiness for PostgreSQL / Neon.`
  },
  {
    triggers: ['ui', 'ux', 'design', 'figma', 'mobile', 'frontend'],
    title: "UI/UX Design & Frontend Capabilities",
    response: `Zelalem believes great engineering starts with great design:

• **UI/UX Tooling**: Proficient in **Figma** for wireframing, component-driven design systems, and clickable high-fidelity prototypes.
• **Frontend Implementation**: Translates Figma designs cleanly into pixel-perfect **Tailwind CSS**, **React**, and **Next.js** applications.
• **Design Philosophy**: High accessibility, clean typography, responsive mobile-first layouts, and micro-interactions.`
  },
  {
    triggers: ['data', 'annotation', 'ai', 'dataset', 'machine learning'],
    title: "Data Annotation & AI Experience",
    response: `Zelalem brings specialized expertise in **AI Data Annotation**:

• High-accuracy text classification, intent mapping, entity tagging, and audio/image metadata annotation.
• Deep understanding of dataset quality pipelines to minimize hallucinations and bias in machine learning models.
• Integration of AI microservices using **Python & FastAPI**.`
  },
  {
    triggers: ['skills', 'stack', 'languages', 'tech', 'technologies', 'rust'],
    title: "Tech Stack & Languages",
    response: `Here is a summary of Zelalem's technical proficiencies:

• **Languages**: Python, TypeScript, JavaScript, C, C++, Rust, COBOL, SQL, Bash / PowerShell
• **Backend & Web**: Next.js 15, Node.js, Express, FastAPI, Prisma ORM, REST APIs
• **Systems & DevOps**: Docker, Linux, Git, GitHub Actions, ClusterFuzzLite, libFuzzer
• **Databases**: PostgreSQL, SQLite
• **Design & Workflow**: Figma, Tailwind CSS, VS Code, Postman`
  },
  {
    triggers: ['hire', 'contact', 'email', 'linkedin', 'reach', 'job', 'available', 'work with'],
    title: "Contact & Collaboration",
    response: `Zelalem is **currently open to exciting engineering opportunities, contracts, and collaborations**!

• 📧 **Email**: [teszelalem6262@gmail.com](mailto:teszelalem6262@gmail.com)
• 💼 **LinkedIn**: [linkedin.com/in/zelalem-tesfaye-086569412/](https://www.linkedin.com/in/zelalem-tesfaye-086569412/)
• 🐙 **GitHub**: [github.com/zedos62](https://github.com/zedos62)

Feel free to send a message directly through the contact form below!`
  }
];

class ZelalemAIEngine {
  constructor() {
    this.history = [];
    this.isTyping = false;
  }

  findResponse(query) {
    const cleanQuery = query.toLowerCase().trim();

    // Direct match scoring
    let bestMatch = null;
    let highestScore = 0;

    for (const item of ZELALEM_KNOWLEDGE) {
      let score = 0;
      for (const trigger of item.triggers) {
        if (cleanQuery.includes(trigger)) {
          score += trigger.length;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch.response;
    }

    // Default intelligent fallback
    return `That's a great question! Zelalem is a versatile **Software Engineer & Systems Developer** skilled in:
• **Full-Stack & Web**: Next.js 15, React, Python FastAPI, Node.js
• **Low-Level & Systems**: C protocol design, ClusterFuzzLite fuzzing, COBOL batch processing
• **UI/UX & AI**: Figma design systems, AI data annotation

You can ask me about **his projects (Smart Job Portal, JobHub Enterprise, libframeproto, Students Portal)**, his **tech stack**, or how to **hire / contact him**!`;
  }

  async streamResponse(text, containerElement, onComplete) {
    this.isTyping = true;
    containerElement.innerHTML = '';
    
    // Parse basic markdown to HTML chunks or tokens
    const lines = text.split('\n');
    let formattedHtml = '';
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      // Convert markdown bold
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Convert markdown links
      line = line.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-sky-400 underline hover:text-sky-300 font-medium">$1</a>');
      // Convert list bullet
      if (line.startsWith('• ')) {
        line = `<div class="ml-2 flex items-start gap-1.5 my-1"><span class="text-indigo-400 font-bold">•</span><span>${line.substring(2)}</span></div>`;
      } else if (line.trim() === '') {
        line = '<div class="h-2"></div>';
      } else {
        line = `<p class="mb-1">${line}</p>`;
      }
      formattedHtml += line;
    }

    // Smooth reveal animation
    let currentIdx = 0;
    const totalLen = formattedHtml.length;
    const step = Math.max(3, Math.floor(totalLen / 45));

    const interval = setInterval(() => {
      currentIdx = Math.min(totalLen, currentIdx + step);
      containerElement.innerHTML = formattedHtml.substring(0, currentIdx) + '<span class="inline-block w-1.5 h-3.5 bg-sky-400 ml-1 animate-pulse"></span>';
      
      const chatContainer = document.getElementById('ai-messages-scroll');
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;

      if (currentIdx >= totalLen) {
        clearInterval(interval);
        containerElement.innerHTML = formattedHtml;
        this.isTyping = false;
        if (onComplete) onComplete();
      }
    }, 18);
  }
}

window.ZelalemAI = new ZelalemAIEngine();
