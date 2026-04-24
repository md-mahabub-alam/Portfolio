import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaFigma } from "react-icons/fa";
import { skills } from "../data/content";

export default function SkillsPage() {
  const icons = [FaReact, FaNodeJs, FaDatabase, FaJsSquare, FaFigma];

  return (
    <section className="page-grid">
      <article className="glass panel">
        <h2>Skill Radar</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={skills}><PolarGrid /><PolarAngleAxis dataKey="name" /><Radar dataKey="value" stroke="#6ec1ff" fill="#6ec1ff" fillOpacity={0.4} /></RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="orbit-icons">
          {icons.map((Icon, index) => (
            <motion.span
              key={index}
              className="orbit-item"
              animate={{ rotate: 360 }}
              transition={{ duration: 14 + index * 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon />
            </motion.span>
          ))}
        </div>
      </article>
      <article className="glass panel">
        <h2>Skill Bars</h2>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skills}><XAxis dataKey="name" hide /><YAxis /><Tooltip /><Bar dataKey="value" fill="#9f7aea" radius={[8, 8, 0, 0]} /></BarChart>
          </ResponsiveContainer>
        </div>
      </article>
    </section>
  );
}
