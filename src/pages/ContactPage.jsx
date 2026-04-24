import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (event) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message || !form.email.includes("@")) return;
    window.location.href = `mailto:alammahabub333@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message + "\n\n" + form.email)}`;
    setSent(true);
  };

  return (
    <section className="page-grid">
      <form className="glass panel" onSubmit={submit}>
        <h2>Contact Me</h2>
        <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <textarea placeholder="Your Message" rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        <button className="btn primary" type="submit">Send Message</button>
        {sent && <p className="success">Message prepared. Thank you!</p>}
        <div className="contact-connect">
          <p className="eyebrow">Connect with me</p>
          <div className="connect-row">
            <a
              className="btn connect-btn active-connect"
              href="https://www.linkedin.com/in/md-mahabub--alam/"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on LinkedIn"
            >
              <FaLinkedin /> LinkedIn
            </a>
            <a
              className="btn connect-btn active-connect"
              href="https://github.com/md-mahabub-alam/"
              target="_blank"
              rel="noreferrer"
              aria-label="Connect on GitHub"
            >
              <FaGithub /> GitHub
            </a>
            <a
              className="btn connect-btn active-connect"
              href="mailto:alammahabub333@gmail.com"
              aria-label="Email Md Mahabub Alam"
            >
              <FaEnvelope /> Email
            </a>
          </div>
        </div>
      </form>
      <article className="glass panel">
        <h3>Location</h3>
        <iframe title="map" src="https://maps.google.com/maps?q=Dhaka&t=&z=11&ie=UTF8&iwloc=&output=embed" loading="lazy" />
      </article>
    </section>
  );
}
