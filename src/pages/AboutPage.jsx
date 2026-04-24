import { motion } from "framer-motion";

const timeline = ["2022: Started CS at BUBT", "2023: Built practical web apps", "2024: Focused on production-grade frontend", "2025: Delivered full-stack client projects"];

export default function AboutPage() {
  return (
    <section className="page-grid">
      <article className="glass panel image-card image-card-featured">
        <img src="/profile-photo.png" alt="Md Mahabub Alam profile photo" className="about-photo" />
        <div className="about-photo-copy">
          <p className="eyebrow">Profile Snapshot</p>
          <h3>Professional Coder & Tech Enthusiast</h3>
          <p>
            I love turning ideas into clean digital products with modern engineering standards,
            scalable architecture, and premium user experience.
          </p>
          <p>
            Focused on continuous learning, problem solving, and delivering meaningful software
            solutions for teams, founders, and clients.
          </p>
        </div>
      </article>

      <motion.article className="glass panel" whileInView={{ opacity: [0, 1], y: [24, 0] }}>
        <h2>About Me</h2>
        <p>Driven developer focused on building clean, fast, and meaningful digital products with a premium UX mindset.</p>
        <div className="stat-row"><div><strong>25+</strong><span>Projects</span></div><div><strong>3+</strong><span>Years Learning</span></div><div><strong>100%</strong><span>Commitment</span></div></div>
      </motion.article>
      <article className="glass panel">
        <h3>Experience Timeline</h3>
        {timeline.map((item) => <p key={item} className="timeline-item">{item}</p>)}
      </article>
      <article className="glass panel">
        <h3>Skills Progress</h3>
        {[95, 90, 88].map((v, i) => <div key={v} className="progress"><span>{["Frontend", "Backend", "Problem Solving"][i]}</span><div><i style={{ width: `${v}%` }} /></div></div>)}
      </article>
      <article className="glass panel">
        <h3>Project Highlights</h3>
        <p className="timeline-item">NeuraCommerce - AI-assisted commerce dashboard and analytics workflow.</p>
        <p className="timeline-item">PulseBoard - Realtime KPI interface with premium interaction design.</p>
        <p className="timeline-item">TalentLens - Resume intelligence engine for ranking and insights.</p>
        <p className="timeline-item">SkylinePay - Secure fintech onboarding with validation-first UX.</p>
      </article>
    </section>
  );
}
