import { useEffect, useMemo, useState } from "react";

const themes = [
  "dark",
  "light",
  "navy",
  "sunset",
  "forest",
  "rose",
  "mono",
  "cyber",
  "aurora",
  "midnight",
  "lava",
  "ocean",
  "amethyst",
  "sand",
  "matrix",
];
const langs = ["EN", "BN"];

export function usePortfolioState() {
  const initialTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(themes.includes(initialTheme) ? initialTheme : "dark");
  const [soundOn, setSoundOn] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "EN");
  const [visits, setVisits] = useState(Number(localStorage.getItem("visits") || 0));

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    const next = visits + 1;
    setVisits(next);
    localStorage.setItem("visits", String(next));
    // only run once at first load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let audioContext;
    let oscillator;
    let gain;
    if (soundOn) {
      audioContext = new window.AudioContext();
      oscillator = audioContext.createOscillator();
      const secondary = audioContext.createOscillator();
      gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 680;
      oscillator.type = "sawtooth";
      secondary.type = "triangle";
      oscillator.frequency.value = 56;
      secondary.frequency.value = 112;
      gain.gain.value = 0.012;
      oscillator.connect(filter);
      secondary.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      secondary.start();
      return () => {
        oscillator.stop();
        secondary.stop();
        audioContext.close();
      };
    }
    return undefined;
  }, [soundOn]);

  useEffect(() => {
    const handler = (event) => {
      const trail = document.createElement("span");
      trail.className = "cursor-trail";
      trail.style.left = `${event.clientX}px`;
      trail.style.top = `${event.clientY}px`;
      document.body.appendChild(trail);
      setTimeout(() => trail.remove(), 620);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const cycleTheme = () => setTheme((prev) => themes[(themes.indexOf(prev) + 1) % themes.length]);
  const toggleLang = () => setLang((prev) => langs[(langs.indexOf(prev) + 1) % langs.length]);

  const dictionary = useMemo(
    () => ({
      EN: { heroTitle: "I craft premium digital experiences.", heroRole: "Full-Stack Developer" },
      BN: { heroTitle: "আমি প্রিমিয়াম ডিজিটাল এক্সপেরিয়েন্স তৈরি করি।", heroRole: "ফুল-স্ট্যাক ডেভেলপার" },
    }),
    []
  );

  return {
    theme,
    cycleTheme,
    availableThemes: themes,
    soundOn,
    setSoundOn,
    lang,
    toggleLang,
    visits,
    t: dictionary[lang],
  };
}
