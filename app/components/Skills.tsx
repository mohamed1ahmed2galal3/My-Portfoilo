"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", level: 90, color: "#61DAFB" },
  { name: "Next.js", level: 85, color: "#ffffff" },
  { name: "TypeScript", level: 80, color: "#3178C6" },
  { name: "Tailwind CSS", level: 90, color: "#38BDF8" },
  { name: "REST APIs", level: 85, color: "#43e8d8" },
  { name: "Authentication", level: 80, color: "#6c63ff" },
  { name: "State Management", level: 75, color: "#ff6584" },
  { name: "Git / GitHub", level: 85, color: "#f97316" },
];

const toolCategories = [
  {
    title: "Frontend",
    icon: "⚡",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML/CSS"],
    color: "#6c63ff",
  },
  {
    title: "Concepts",
    icon: "🧠",
    items: ["REST APIs", "Authentication", "State Management", "Responsive Design", "SSR / SSG", "WebSockets"],
    color: "#43e8d8",
  },
  {
    title: "Tools",
    icon: "🛠",
    items: ["Git", "GitHub", "Vercel", "VS Code", "npm", "Figma"],
    color: "#ff6584",
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      // Animate bars
      const bars = barsRef.current?.querySelectorAll(".skill-bar-fill");
      bars?.forEach(bar => {
        const target = bar.getAttribute("data-width");
        gsap.fromTo(bar,
          { width: "0%" },
          { width: target + "%", duration: 1.2, ease: "power2.out",
            scrollTrigger: { trigger: bar, start: "top 85%" }
          }
        );
      });

      gsap.fromTo(cardsRef.current?.children ?? [],
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 75%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} style={{ padding: "120px 40px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div ref={headRef} style={{ marginBottom: "70px" }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>Expertise</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
          {/* Skill bars */}
          <div ref={barsRef} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {skills.map(skill => (
              <div key={skill.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: "0.9rem" }}>{skill.name}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", color: "var(--text-muted)" }}>{skill.level}%</span>
                </div>
                <div style={{ height: "3px", background: "var(--surface-2)", borderRadius: "2px", overflow: "hidden" }}>
                  <div
                    className="skill-bar-fill"
                    data-width={skill.level}
                    style={{
                      height: "100%", width: "0%", borderRadius: "2px",
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`,
                      boxShadow: `0 0 10px ${skill.color}60`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Category cards */}
          <div ref={cardsRef} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {toolCategories.map(cat => (
              <div key={cat.title} className="glass" style={{
                padding: "24px", borderRadius: "12px",
                borderColor: cat.color + "20",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                  <span style={{ fontSize: "1.2rem" }}>{cat.icon}</span>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem",
                    color: cat.color, letterSpacing: "0.05em",
                  }}>
                    {cat.title}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {cat.items.map(item => (
                    <span key={item} style={{
                      fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
                      padding: "5px 12px", borderRadius: "20px",
                      background: cat.color + "12", border: `1px solid ${cat.color}25`,
                      color: "var(--text-muted)", letterSpacing: "0.05em",
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => {
                        (e.target as HTMLElement).style.color = cat.color;
                        (e.target as HTMLElement).style.background = cat.color + "25";
                      }}
                      onMouseLeave={e => {
                        (e.target as HTMLElement).style.color = "var(--text-muted)";
                        (e.target as HTMLElement).style.background = cat.color + "12";
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #skills > div > div:last-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
