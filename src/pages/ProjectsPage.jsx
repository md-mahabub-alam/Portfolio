import { useMemo, useState } from "react";
import { projects } from "../data/content";

const categories = ["All", "Full Stack", "Frontend", "Backend"];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const list = useMemo(() => (active === "All" ? projects : projects.filter((p) => p.category === active)), [active]);

  const onMove = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const px = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const py = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    card.style.setProperty("--rx", `${(-py * 8).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(px * 10).toFixed(2)}deg`);
  };

  const onLeave = (event) => {
    const card = event.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <section>
      <div className="filter-row">{categories.map((c) => <button key={c} className={active === c ? "active" : ""} onClick={() => setActive(c)}>{c}</button>)}</div>
      <div className="project-galaxy glass panel">
        <p className="eyebrow">Project Galaxy</p>
        <div className="planet-orbit">
          {list.map((p) => (
            <button key={`planet-${p.id}`} className={`planet p-${p.id}`} onClick={() => setSelected(p)}>{p.title}</button>
          ))}
        </div>
      </div>
      <div className="deployment-grid">
        <article className="glass panel">
          <p className="eyebrow">Deployment Status</p>
          <h3>Production Pipeline</h3>
          <p>All systems operational. Latest release pushed with zero downtime deployment.</p>
        </article>
        <article className="glass panel">
          <p className="eyebrow">Live Nodes</p>
          <h3>12 Active</h3>
          <p>Avg response: 38ms | Success rate: 99.4%</p>
        </article>
      </div>
      <div className="card-grid">
        {list.map((p) => (
          <article
            key={p.id}
            className="glass panel tilt project-3d"
            onClick={() => setSelected(p)}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <p className="eyebrow">{p.category}</p>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="row"><a href={p.demo}>Live Demo</a><a href={p.github} target="_blank" rel="noreferrer">GitHub</a></div>
          </article>
        ))}
      </div>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal glass" onClick={(e) => e.stopPropagation()}>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <p>Category: {selected.category}</p>
            <button onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}
