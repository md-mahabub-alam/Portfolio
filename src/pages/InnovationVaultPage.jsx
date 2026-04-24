import { useMemo } from "react";

const lore = [
  "Origin Node: Started with small scripts and relentless curiosity.",
  "Quantum Shift: Evolved into product-thinking full-stack development.",
  "Mission Path: Build digital systems that are elegant, fast, and meaningful.",
];

export default function InnovationVaultPage() {
  const stream = useMemo(() => Array.from({ length: 18 }, (_, i) => ({ id: i, on: (i * 13) % 3 !== 0 })), []);

  return (
    <section className="page-grid">
      <article className="glass panel">
        <p className="eyebrow">Innovation Vault</p>
        <h2>Developer Lore Archive</h2>
        {lore.map((item) => <p key={item}>{item}</p>)}
      </article>
      <article className="glass panel">
        <p className="eyebrow">Neural Stream</p>
        <h3>Live Idea Reactor</h3>
        <div className="vault-stream">
          {stream.map((chip) => <i key={chip.id} className={chip.on ? "on" : "off"} />)}
        </div>
        <p>Unlocked systems: AI assistant, command terminal, project galaxy, immersive motion lab.</p>
      </article>
    </section>
  );
}
