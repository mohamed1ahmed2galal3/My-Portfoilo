"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce application with cart, wishlist, and authentication. Built with SSR for optimal performance and SEO.",
    tech: ["Next.js", "TypeScript", "NextAuth", "REST API"],
    link: "https://e-commerce-three-zeta-26.vercel.app/",
    color: "#6c63ff",
    size: "large",
  },
  {
    id: "02",
    title: "Social Network App",
    description: "Real-time social platform featuring posts, comments, likes, and follow system with live WebSocket updates.",
    tech: ["React", "TypeScript", "WebSockets", "Auth"],
    link: "https://social-app-theta-lovat.vercel.app/login",
    color: "#43e8d8",
    size: "large",
  },
  {
    id: "03",
    title: "Movie Discovery",
    description: "Browse and search thousands of movies with advanced filtering, responsive design, and rich API integration.",
    tech: ["React", "API", "Responsive"],
    link: "https://mohamed1ahmed2galal3.github.io/Movie/",
    color: "#ff6584",
    size: "small",
  },
  {
    id: "04",
    title: "Yummy Recipe App",
    description: "Dynamic food and recipe browsing application with beautiful UI and smooth interactions.",
    tech: ["JavaScript", "API", "Dynamic UI"],
    link: "https://mohamed1ahmed2galal3.github.io/Yummy-Project/",
    color: "#f59e0b",
    size: "small",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.left = x + "px";
    glowRef.current.style.top = y + "px";

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = -(x - centerX) / 20;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    setHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      data-cursor="true"
      style={{
        position: "relative", borderRadius: "16px", overflow: "hidden",
        background: "var(--surface)", border: "1px solid var(--border)",
        padding: "2.5rem", cursor: "none",
        transition: "box-shadow 0.3s, border-color 0.3s",
        transformStyle: "preserve-3d",
        boxShadow: hovered ? `0 30px 60px rgba(0,0,0,0.4), 0 0 0 1px ${project.color}40` : "0 4px 20px rgba(0,0,0,0.2)",
        borderColor: hovered ? project.color + "40" : "var(--border)",
        gridColumn: project.size === "large" ? "span 1" : "span 1",
        minHeight: project.size === "large" ? "340px" : "260px",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
      }}
    >
      {/* Mouse glow */}
      <div ref={glowRef} style={{
        position: "absolute", width: "200px", height: "200px",
        borderRadius: "50%", pointerEvents: "none",
        background: `radial-gradient(circle, ${project.color}20 0%, transparent 70%)`,
        transform: "translate(-50%, -50%)",
        transition: "opacity 0.3s",
        opacity: hovered ? 1 : 0,
      }} />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
            letterSpacing: "0.2em", color: project.color, opacity: 0.7,
          }}>
            {project.id}
          </span>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              border: `1px solid ${project.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: project.color, transition: "all 0.3s",
              background: hovered ? project.color + "15" : "transparent",
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>

        <h3 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700,
          fontSize: "1.4rem", marginBottom: "0.8rem", letterSpacing: "-0.01em",
          color: "var(--text)",
        }}>
          {project.title}
        </h3>

        <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.9rem", fontWeight: 300 }}>
          {project.description}
        </p>
      </div>

      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
          {project.tech.map(t => (
            <span key={t} className="tech-tag" style={{ borderColor: project.color + "35", color: project.color }}>{t}</span>
          ))}
        </div>

        <a href={project.link} target="_blank" rel="noopener noreferrer"
          style={{
            fontFamily: "'Syne', sans-serif", fontSize: "0.8rem", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: project.color, textDecoration: "none",
            display: "flex", alignItems: "center", gap: "6px",
            opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s",
          }}
        >
          Live Demo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      gsap.fromTo(gridRef.current?.children ?? [],
        { opacity: 0, y: 50, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 75%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} style={{
      padding: "120px 40px",
      background: "var(--bg-2)",
      position: "relative",
    }}>
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
      
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <div ref={headRef} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "60px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Selected Work</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em",
            }}>
              Projects that<br /><span className="gradient-text">speak volumes.</span>
            </h2>
          </div>
          <p style={{ color: "var(--text-muted)", maxWidth: "300px", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Each project represents a unique challenge, solved with clean code and thoughtful design.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #projects > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
