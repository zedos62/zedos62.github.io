// Developer Terminal CLI Console for Zelalem Tesfaye Portfolio

(function () {
  const COMMANDS = {
    help: () => `
<div class="text-sky-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
  <span class="text-emerald-400">whoami</span>       - Display engineer profile & philosophy
  <span class="text-emerald-400">skills</span>       - List categorized tech stack & proficiencies
  <span class="text-emerald-400">projects</span>     - Browse featured systems & enterprise applications
  <span class="text-emerald-400">banner</span>       - Render ASCII banner & core motto
  <span class="text-emerald-400">fuzz</span>         - Run simulated fuzzing harness on libframeproto
  <span class="text-emerald-400">contact</span>      - Output verified contact & social channels
  <span class="text-emerald-400">clear</span>        - Clear terminal screen
  <span class="text-emerald-400">sudo hire</span>    - Authorize high-priority job offer
`,

    whoami: () => `
<div class="text-indigo-300">
<strong>Zelalem Tesfaye</strong> (@zedos62)
Software Engineer | Systems & Protocol Developer | UI/UX Designer | Data Annotator
Based in: Addis Ababa & Remote
Focus: High-concurrency backends, Next.js 15, C protocols, COBOL enterprise pipelines, and Figma UI.
</div>
`,

    skills: () => `
<div class="space-y-1">
  <div><span class="text-cyan-400 font-semibold">[Languages]</span> Python, TypeScript, JavaScript, C, C++, Rust, COBOL, SQL, Bash</div>
  <div><span class="text-indigo-400 font-semibold">[Frameworks]</span> Next.js 15, React, FastAPI, Node.js, Express, Prisma ORM, Tailwind</div>
  <div><span class="text-purple-400 font-semibold">[Systems/DevOps]</span> Docker, Linux, GitHub Actions, ClusterFuzzLite, PostgreSQL, SQLite</div>
  <div><span class="text-amber-400 font-semibold">[Design/Data]</span> Figma (UI/UX), Data Annotation Pipelines, Postman, VS Code</div>
</div>
`,

    projects: () => `
<div class="space-y-1">
  <div>• <span class="text-emerald-400 font-semibold">Smart Job Portal:</span> AI-powered matching, FastAPI & PostgreSQL (<a href="https://github.com/zedos62/smart-job-portal" target="_blank" class="underline text-sky-400">repo</a>)</div>
  <div>• <span class="text-emerald-400 font-semibold">JobHub Enterprise:</span> COBOL batch core + Node.js recruitment engine</div>
  <div>• <span class="text-emerald-400 font-semibold">Students Portal:</span> Next.js 15 App Router, Prisma ORM, Auth.js</div>
  <div>• <span class="text-emerald-400 font-semibold">libframeproto:</span> C framed binary protocol with TLV parser & ClusterFuzzLite</div>
  <div>• <span class="text-emerald-400 font-semibold">Minerva Taskboard:</span> Agile task & repair tracking web application</div>
</div>
`,

    banner: () => `
<pre class="text-cyan-400 text-xs leading-none">
███████╗███████╗██╗      █████╗ ██╗     ███████╗███╗   ███╗
╚══███╔╝██╔════╝██║     ██╔══██╗██║     ██╔════╝████╗ ████║
  ███╔╝ █████╗  ██║     ███████║██║     █████╗  ██╔████╔██║
 ███╔╝  ██╔══╝  ██║     ██╔══██║██║     ██╔══╝  ██║╚██╔╝██║
███████╗███████╗███████╗██║  ██║███████╗███████╗██║ ╚═╝ ██║
╚══════╝╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚═╝
</pre>
<div class="text-indigo-300 text-xs mt-1">BUILDING SOLUTIONS • ANNOTATING INTELLIGENCE • DESIGNING EXPERIENCES</div>
`,

    fuzz: () => `
<div class="text-sky-300 font-mono text-xs">
[libframeproto] Running ClusterFuzzLite regression suite...
[INFO] Corpus size: 1,420 valid TLV seeds loaded.
[INFO] Sanitizers active: AddressSanitizer (ASan), UndefinedBehaviorSanitizer (UBSan).
... 250,000 executions completed (avg 42,000 exec/s).
<span class="text-emerald-400 font-bold">[SUCCESS] 0 CRASHES | 0 LEAKS | PROTOCOL STATE MACHINE VERIFIED SAFE</span>
</div>
`,

    contact: () => `
<div class="space-y-0.5">
  <div>📧 Email: <a href="mailto:teszelalem6262@gmail.com" class="text-sky-400 underline">teszelalem6262@gmail.com</a></div>
  <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/zelalem-tesfaye-086569412/" target="_blank" class="text-sky-400 underline">zelalem-tesfaye-086569412</a></div>
  <div>🐙 GitHub: <a href="https://github.com/zedos62" target="_blank" class="text-sky-400 underline">github.com/zedos62</a></div>
</div>
`,

    'sudo hire': () => `
<div class="text-emerald-400 font-bold p-2 bg-emerald-950/40 rounded border border-emerald-800">
🚀 PERMISSION GRANTED! Zelalem is open for engineering contracts and full-time opportunities.
Please send your inquiry to <a href="mailto:teszelalem6262@gmail.com" class="underline text-emerald-200">teszelalem6262@gmail.com</a>.
</div>
`,

    sudo: () => `<div class="text-amber-400">Try running: 'sudo hire'</div>`,
  };

  window.initTerminal = function () {
    const termBody = document.getElementById('terminal-output');
    const termInput = document.getElementById('terminal-input');
    if (!termInput || !termBody) return;

    let history = [];
    let historyIdx = -1;

    termInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        termInput.value = '';

        if (!rawCmd) return;
        history.push(rawCmd);
        historyIdx = history.length;

        // Print user command line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'flex items-center gap-2 text-slate-400 my-1 font-mono text-sm';
        cmdLine.innerHTML = `<span class="text-sky-400 font-bold">visitor@zedos62:~$</span> <span class="text-white">${rawCmd}</span>`;
        termBody.appendChild(cmdLine);

        if (cmd === 'clear') {
          termBody.innerHTML = '';
          return;
        }

        const out = document.createElement('div');
        out.className = 'text-slate-300 font-mono text-sm mb-2 pl-4';

        if (COMMANDS[cmd]) {
          out.innerHTML = COMMANDS[cmd]();
        } else {
          out.innerHTML = `<span class="text-rose-400">Command not found: "${rawCmd}". Type <span class="text-sky-400 font-bold">help</span> for available commands.</span>`;
        }

        termBody.appendChild(out);
        termBody.scrollTop = termBody.scrollHeight;
      } else if (e.key === 'ArrowUp') {
        if (history.length > 0 && historyIdx > 0) {
          historyIdx--;
          termInput.value = history[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        if (historyIdx < history.length - 1) {
          historyIdx++;
          termInput.value = history[historyIdx];
        } else {
          historyIdx = history.length;
          termInput.value = '';
        }
      }
    });
  };
})();
