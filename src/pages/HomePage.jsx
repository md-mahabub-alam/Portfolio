import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaCodeBranch, FaFolderOpen, FaTerminal } from "react-icons/fa";

const lines = ["Recruiter-ready", "Client-converting", "Company-grade"];
const fileTree = ["src/components", "src/pages", "src/hooks", "public/resume.pdf"];

export default function HomePage({ state }) {
  const [typed, setTyped] = useState("");
  const [cmd, setCmd] = useState("");
  const [history, setHistory] = useState(["Type `help` to view commands."]);
  const [count, setCount] = useState({ users: 12, commits: 180, uptime: 96 });
  const [achievements, setAchievements] = useState([]);
  const [githubLive, setGithubLive] = useState({ repos: "--", followers: "--" });
  const [activeTab, setActiveTab] = useState("portfolio.tsx");
  const headingRef = useRef(null);
  const terminalRef = useRef(null);

  const commandMap = useMemo(
    () => ({
      help: "Available: about, projects, skills, contact, status, clear, matrix, unlock",
      about:
        state.lang === "BN"
          ? "আমি ফুল-স্ট্যাক ডেভেলপার, পারফরম্যান্স ও ইউজার-ফার্স্ট প্রোডাক্টে ফোকাস করি।"
          : "I am a full-stack developer focused on performance and user-first products.",
      projects:
        state.lang === "BN"
          ? "বর্তমান স্ট্যাক: React, Node.js, GSAP, Three.js. ক্লায়েন্ট-রেডি প্রজেক্ট শিপ করি।"
          : "Current stack: React, Node.js, GSAP, Three.js. Shipping client-ready projects.",
      skills: "Core: React, JavaScript, APIs, UI Motion, Performance Optimization.",
      contact: "Email: alammahabub333@gmail.com | LinkedIn: md-mahabub--alam",
      status: "System Green | Build Stable | AI Assistant Online",
      matrix: "Matrix mode enabled. Wake up, developer.",
      unlock: "Easter egg unlocked: You found the hidden terminal command.",
    }),
    [state.lang]
  );

  useEffect(() => {
    let text = `${state.t.heroRole} • ${state.t.heroTitle}`;
    let i = 0;
    const interval = setInterval(() => {
      setTyped(text.slice(0, i));
      i += 1;
      if (i > text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [state.t]);

  useEffect(() => {
    gsap.fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
  }, []);

  useEffect(() => {
    fetch("https://api.github.com/users/md-mahabub-alam")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message) {
          setGithubLive({ repos: data.public_repos, followers: data.followers });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => ({
        users: prev.users + 1,
        commits: prev.commits + 2,
        uptime: Math.min(99.99, Number((prev.uptime + 0.01).toFixed(2))),
      }));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = () => {
    const input = cmd.trim().toLowerCase();
    if (!input) return;
    if (input === "clear") {
      setHistory(["Terminal cleared. Type `help` to continue."]);
      setCmd("");
      return;
    }
    const response = commandMap[input] || `Command not found: ${input}. Try 'help'.`;
    setHistory((prev) => [...prev, `$ ${input}`, response]);
    if (["unlock", "matrix", "status"].includes(input)) {
      setAchievements((prev) => Array.from(new Set([...prev, `Achievement: ${input.toUpperCase()} unlocked`])));
    }
    setCmd("");
  };

  const githubHeat = Array.from({ length: 35 }, (_, i) => (i * 7 + count.commits) % 5);
  const tabData = {
    "portfolio.tsx": {
      title: "Impact First Engineering",
      code: [
        "const engineer = {",
        '  name: "Md Mahabub Alam",',
        '  focus: "UX + Performance + Product",',
        '  status: "Open to opportunities",',
        "};",
      ],
    },
    "skills.json": {
      title: "Skill Matrix",
      code: ["{", '  \"frontend\": 95,', '  \"backend\": 90,', '  \"problemSolving\": 88,', "}"],
    },
    "deploy.yml": {
      title: "Deployment Pipeline",
      code: ["pipeline:", "  build: passed", "  tests: 92%", "  latency: 38ms", "  status: stable"],
    },
  };

  const renderCodeLine = (line, idx) => {
    if (activeTab === "portfolio.tsx") {
      if (line.startsWith("const")) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-keyword">const</span>
            {" engineer = "}
            <span className="token-punc">{"{"}</span>
          </p>
        );
      }
      if (line.includes('name:')) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-key">  name</span>
            <span className="token-punc">: </span>
            <span className="token-string">"Md Mahabub Alam"</span>
            <span className="token-punc">,</span>
          </p>
        );
      }
      if (line.includes('focus:')) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-key">  focus</span>
            <span className="token-punc">: </span>
            <span className="token-string">"UX + Performance + Product"</span>
            <span className="token-punc">,</span>
          </p>
        );
      }
      if (line.includes('status:')) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-key">  status</span>
            <span className="token-punc">: </span>
            <span className="token-string">"Open to opportunities"</span>
            <span className="token-punc">,</span>
          </p>
        );
      }
      if (line === "};") {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-punc">{"};"}</span>
          </p>
        );
      }
    }

    if (activeTab === "skills.json") {
      if (line === "{") return <p key={`${line}-${idx}`}><span className="token-punc">{"{"}</span></p>;
      if (line.includes('"frontend"')) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-key">  "frontend"</span>
            <span className="token-punc">: </span>
            <span className="token-number">95</span>
            <span className="token-punc">,</span>
          </p>
        );
      }
      if (line.includes('"backend"')) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-key">  "backend"</span>
            <span className="token-punc">: </span>
            <span className="token-number">90</span>
            <span className="token-punc">,</span>
          </p>
        );
      }
      if (line.includes('"problemSolving"')) {
        return (
          <p key={`${line}-${idx}`}>
            <span className="token-key">  "problemSolving"</span>
            <span className="token-punc">: </span>
            <span className="token-number">88</span>
            <span className="token-punc">,</span>
          </p>
        );
      }
      if (line === "}") return <p key={`${line}-${idx}`}><span className="token-punc">{"}"}</span></p>;
    }

    if (activeTab === "deploy.yml") {
      return (
        <p key={`${line}-${idx}`}>
          {line.split(":").length > 1 ? (
            <>
              <span className="token-key">{line.split(":")[0]}</span>
              <span className="token-punc">: </span>
              <span className="token-string">{line.split(":").slice(1).join(":").trim()}</span>
            </>
          ) : (
            <span className="token-keyword">{line}</span>
          )}
        </p>
      );
    }

    return <p key={`${line}-${idx}`}>{line}</p>;
  };

  return (
    <section className="hero-grid">
      <motion.div className="hero-card glass terminal-hero" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="terminal-top">
          <span />
          <span />
          <span />
          <p><FaTerminal /> integrated-terminal</p>
        </div>
        <p className="eyebrow">Developer Mode: Active</p>
        <h1 ref={headingRef}>Md Mahabub Alam</h1>
        <p className="typing">{typed}<span className="blink">|</span></p>
        <p className="hero-relatable">
          I am a builder who enjoys solving real problems with clean code, thoughtful UI, and
          consistent execution. If you are a recruiter, founder, or client, I would love to connect
          and discuss how I can add value to your team.
        </p>
        <div className="cta-row hero-quick-actions">
          <a className="btn primary" href="#contact">Hire Me</a>
          <a className="btn" href="/resume.pdf" download>Download Resume</a>
          <a className="btn" href="#contact">Contact</a>
        </div>
        <div className="terminal-feed" ref={terminalRef}>
          {history.map((log, idx) => (
            <p key={`${log}-${idx}`}>{log}</p>
          ))}
        </div>
        <div className="command-row">
          <span>&gt;</span>
          <input
            value={cmd}
            onChange={(event) => setCmd(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") runCommand();
            }}
            placeholder="run command: about / projects / skills / contact"
          />
          <button onClick={runCommand}>Run</button>
        </div>
        <div className="github-stats">
          <article><FaCodeBranch /><strong>{count.commits}+</strong><span>Code Commits</span></article>
          <article><FaFolderOpen /><strong>{count.users}K</strong><span>Live User Hits</span></article>
          <article><FaTerminal /><strong>{count.uptime}%</strong><span>System Uptime</span></article>
        </div>
        <div className="github-live">
          <p>GitHub Live Stream: Repos {githubLive.repos} | Followers {githubLive.followers}</p>
        </div>
        <div className="github-heatmap">
          {githubHeat.map((value, idx) => (
            <i key={idx} className={`lvl-${value}`} />
          ))}
        </div>
        {achievements.length > 0 && (
          <div className="achievements">
            {achievements.map((item) => <p key={item}>{item}</p>)}
          </div>
        )}
      </motion.div>
      <motion.div
        className="hero-card neumorph ide-panel draggable-window"
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="ide-tabs">
          {Object.keys(tabData).map((tab) => (
            <button key={tab} className={activeTab === tab ? "active-tab" : ""} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
        <h3 className="box-title">{tabData[activeTab].title}</h3>
        <div className="code-snippet">
          {tabData[activeTab].code.map((line, idx) => renderCodeLine(line, idx))}
        </div>
        <ul className="impact-list">
          {lines.map((line) => <li key={line}>{line}</li>)}
        </ul>
        <div className="file-tree">
          {fileTree.map((item) => <p key={item}>▸ {item}</p>)}
        </div>
        <div className="deploy-dashboard">
          <p>Deployment Dashboard</p>
          <div><span>Build</span><b>Passed</b></div>
          <div><span>Tests</span><b>92%</b></div>
          <div><span>Latency</span><b>38ms</b></div>
        </div>
        <div className="workspace-fill">
          <article className="workspace-card">
            <p className="eyebrow">System Modules</p>
            <div className="module-list">
              <div><span>UI Engine</span><b>Active</b></div>
              <div><span>API Layer</span><b>Stable</b></div>
              <div><span>Animations</span><b>Optimized</b></div>
              <div><span>Security Checks</span><b>Passed</b></div>
            </div>
          </article>
          <article className="workspace-card">
            <p className="eyebrow">Live Activity</p>
            <div className="activity-lines">
              <p>14:07 • Refactored hero interactions</p>
              <p>14:12 • Improved accessibility contrast</p>
              <p>14:18 • Added profile snapshot module</p>
              <p>14:24 • Optimized section transitions</p>
              <p>14:30 • Verified production build</p>
            </div>
          </article>
        </div>
      </motion.div>
    </section>
  );
}
