import { useMemo, useState } from "react";
import { blogPosts } from "../data/content";

export default function BlogPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => blogPosts.filter((p) => `${p.title} ${p.tag}`.toLowerCase().includes(q.toLowerCase())), [q]);

  return (
    <section>
      <input className="search" placeholder="Search posts..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="card-grid">
        {filtered.map((post) => (
          <article className="glass panel" key={post.id}>
            <p className="eyebrow">{post.tag}</p>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <a href="/blog">Read more</a>
          </article>
        ))}
      </div>
    </section>
  );
}
