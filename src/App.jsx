import { Suspense, lazy, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "./components/Layout";
import ChatWidget from "./components/ChatWidget";
import LoadingScreen from "./components/LoadingScreen";
import { usePortfolioState } from "./hooks/usePortfolioState";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function App() {
  const state = usePortfolioState();

  useEffect(() => {
    document.title = "Md Mahabub Alam | Portfolio";
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".page-section").forEach((section) => {
        const targets = section.querySelectorAll(".panel, .hero-card, .testimonial, .card-grid article");
        gsap.fromTo(
          targets,
          { y: 55, opacity: 0, rotateX: -8 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );
      });

      gsap.to(".parallax-layer.layer-a", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { scrub: 1.2 },
      });
      gsap.to(".parallax-layer.layer-b", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { scrub: 1.4 },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let code = "";
    const handler = (event) => {
      code += event.key.toLowerCase();
      code = code.slice(-2);
      if (code === "hi") {
        alert("Easter egg unlocked: Thanks for visiting!");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className={`app theme-${state.theme}`}>
      <LoadingScreen />
      <Layout state={state}>
        <div className="one-page-flow">
          <section id="home" className="page-section" data-label="Command Center">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <HomePage state={state} />
            </Suspense>
          </section>
          <section id="about" className="page-section" data-label="Experience Timeline">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <AboutPage />
            </Suspense>
          </section>
          <section id="projects" className="page-section" data-label="Project Galaxy">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <ProjectsPage />
            </Suspense>
          </section>
          <section id="skills" className="page-section" data-label="Skills Lab">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <SkillsPage />
            </Suspense>
          </section>
          <section id="services" className="page-section" data-label="Service Grid">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <ServicesPage />
            </Suspense>
          </section>
          <section id="testimonials" className="page-section" data-label="Reputation Vault">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <TestimonialsPage />
            </Suspense>
          </section>
          <section id="blog" className="page-section" data-label="Knowledge Stream">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <BlogPage />
            </Suspense>
          </section>
          <section id="contact" className="page-section" data-label="Contact Portal">
            <Suspense fallback={<div className="glass panel">Loading section...</div>}>
              <ContactPage />
            </Suspense>
          </section>
        </div>
      </Layout>
      <ChatWidget />
    </div>
  );
}
