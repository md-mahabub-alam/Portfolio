import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaGoogle, FaPalette, FaLanguage, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { navLinks } from "../data/content";
import AnimatedBackground from "./AnimatedBackground";

export default function Layout({ children, state }) {
  useEffect(() => {
    const onMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="layout">
      <AnimatedBackground />
      <div className="matrix-rain" aria-hidden="true" />
      <div className="parallax-layer layer-a" aria-hidden="true" />
      <div className="parallax-layer layer-b" aria-hidden="true" />
      <header className="topbar glass">
        <a href="#home" className="brand">Md Mahabub Alam</a>
        <nav>
          {navLinks.map(([to, label]) => (
            <a key={to} href={to}>{label}</a>
          ))}
        </nav>
        <div className="toolbar">
          <button onClick={state.cycleTheme} aria-label="Switch theme">
            <FaPalette /> {state.theme}
          </button>
          <button onClick={state.toggleLang} aria-label="Switch language"><FaLanguage /> {state.lang}</button>
          <button onClick={() => state.setSoundOn((v) => !v)} aria-label="Toggle sound">{state.soundOn ? <FaVolumeUp /> : <FaVolumeMute />}</button>
        </div>
      </header>
      <motion.main initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.main>
      <footer className="footer glass">
        <p>Let&apos;s build something meaningful.</p>
        <div className="socials">
          <a href="https://github.com/md-mahabub-alam" target="_blank" rel="noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/md-mahabub--alam" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alammahabub333@gmail.com&su=Portfolio%20Contact"
            target="_blank"
            rel="noreferrer"
            aria-label="Send message on Gmail"
          >
            <FaGoogle />
          </a>
        </div>
      </footer>
    </div>
  );
}
