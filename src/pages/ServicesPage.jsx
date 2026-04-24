export default function ServicesPage() {
  const services = ["Premium Portfolio Development", "SaaS Frontend Engineering", "UI Motion and Interactions", "API Integration and Optimization"];
  return (
    <section className="card-grid">
      {services.map((service, i) => (
        <article className="glass panel tilt" key={service}>
          <p className="eyebrow">Service {i + 1}</p>
          <h3>{service}</h3>
          <p>Built for startups, recruiters, and founders who need elegant products with measurable business impact.</p>
        </article>
      ))}
    </section>
  );
}
