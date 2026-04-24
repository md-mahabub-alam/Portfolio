import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(7);
  const [phase, setPhase] = useState("Initializing AI Core");

  useEffect(() => {
    const stepper = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(stepper);
          setTimeout(() => setLoading(false), 180);
          return 100;
        }
        return prev + Math.ceil((100 - prev) * 0.28);
      });
    }, 110);
    const phases = ["Initializing AI Core", "Biometric Scan", "Mounting Metaverse Zones", "Compiling Command Center"];
    const phaseTimer = setInterval(() => {
      setPhase((prev) => phases[(phases.indexOf(prev) + 1) % phases.length]);
    }, 520);
    return () => {
      clearInterval(stepper);
      clearInterval(phaseTimer);
    };
  }, []);

  if (!loading) return null;
  return (
    <div className="loading-screen">
      <div className="compile-box">
        <p className="boot-title">NEURAL OS BOOT SEQUENCE</p>
        <p className="scan-line">{phase}</p>
        <p>Compiling portfolio.build.ts</p>
        <div className="compile-track">
          <i style={{ width: `${progress}%` }} />
        </div>
        <div className="biometric-grid" />
        <span>{progress}% complete</span>
      </div>
    </div>
  );
}
