import { useEffect, useState } from "react";
import { testimonials } from "../data/content";

export default function TestimonialsPage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((v) => (v + 1) % testimonials.length), 2600);
    return () => clearInterval(timer);
  }, []);
  const item = testimonials[index];

  return (
    <section className="glass panel testimonial">
      <p className="quote">“{item.quote}”</p>
      <h3>{item.name}</h3>
      <p>{item.role}</p>
      <p>{"★".repeat(item.stars)}</p>
    </section>
  );
}
