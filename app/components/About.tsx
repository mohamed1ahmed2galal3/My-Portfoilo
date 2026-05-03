"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );

      gsap.fromTo(contentRef.current?.querySelectorAll(".reveal-item") ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "120px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        
        {/* Image */}
        <div ref={imageRef} style={{ position: "relative" }}>
          <div style={{
            position: "relative", borderRadius: "12px", overflow: "hidden",
            aspectRatio: "3/4", maxWidth: "420px",
            background: "var(--surface)",
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--border)",
          }}>
            <Image
              src="/profile.jpg"
              alt="Mohamed Ahmed Galal"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
            />
            {/* Overlay gradient */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to top, rgba(5,5,8,0.6) 0%, transparent 50%)",
            }} />
            {/* Corner accent */}
            <div style={{
              position: "absolute", bottom: "20px", left: "20px",
              fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
            }}>
              Mohamed Ahmed Galal
            </div>
          </div>

          {/* Decorative elements */}
          <div style={{
            position: "absolute", top: "-20px", right: "-20px",
            width: "100px", height: "100px",
            border: "1px solid rgba(108,99,255,0.2)",
            borderRadius: "4px",
            zIndex: -1,
          }} />
          <div style={{
            position: "absolute", bottom: "-20px", left: "-20px",
            width: "60px", height: "60px",
            background: "var(--accent)",
            opacity: 0.15,
            borderRadius: "50%",
            filter: "blur(20px)",
          }} />

          {/* Floating badge */}
          <div className="glass" style={{
            position: "absolute", top: "30px", right: "-20px",
            padding: "12px 20px", borderRadius: "8px",
            display: "flex", flexDirection: "column", gap: "2px",
          }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "var(--accent-3)" }}>React</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", color: "var(--text-muted)", letterSpacing: "0.1em" }}>SPECIALIST</span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div className="section-label reveal-item">About Me</div>

          <h2 className="reveal-item" style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, letterSpacing: "-0.02em",
          }}>
            Building the web,<br />
            <span className="gradient-text">one pixel at a time.</span>
          </h2>

          <p className="reveal-item" style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", fontWeight: 300 }}>
            Frontend Developer specializing in React and Next.js, experienced in building 
            scalable web applications with authentication, API integration, and real-time features.
          </p>

          <p className="reveal-item" style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "1rem", fontWeight: 300 }}>
            Passionate about creating high-performance, user-focused interfaces that deliver 
            exceptional experiences. Based in Egypt, working globally.
          </p>

          <div className="reveal-item" style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "0.5rem" }}>
            {["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "WebSockets"].map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>

          <div className="reveal-item" style={{ marginTop: "0.5rem" }}>
            <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="btn-glow" style={{ width: "fit-content" }}>
              Let's Work Together
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:900px){
          #about > div { grid-template-columns: 1fr !important; gap: 50px !important; }
          #about > div > div:first-child { max-width: 320px !important; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
