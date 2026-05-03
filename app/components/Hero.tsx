"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.0 });

    tl.fromTo(labelRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" })
      .fromTo(
        titleRef.current?.querySelectorAll(".word") ?? [],
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, ease: "power4.out", stagger: 0.08 },
        "-=0.2"
      )
      .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.2");
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <HeroCanvas />

      {/* Gradient orbs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%",
        width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "10%",
        width: "400px", height: "400px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(67,232,216,0.08) 0%, transparent 70%)",
        filter: "blur(40px)", pointerEvents: "none",
      }} />

      <div ref={containerRef} style={{
        position: "relative", zIndex: 1,
        maxWidth: "1100px", width: "100%",
        padding: "0 40px",
        textAlign: "left",
      }}>
        <div ref={labelRef} className="section-label" style={{ marginBottom: "2rem", opacity: 0 }}>
          Frontend Developer
        </div>

        <h1 ref={titleRef} style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(3rem, 8vw, 7rem)",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          marginBottom: "1.5rem",
          overflow: "visible",
        }}>
          {["Mohamed", "Ahmed", "Galal"].map((word, i) => (
            <div key={i} style={{ overflow: "hidden", display: "block" }}>
              <span className="word" style={{
                display: "inline-block",
                color: i === 2 ? "transparent" : "var(--text)",
                background: i === 2 ? "linear-gradient(135deg, var(--accent), var(--accent-3))" : "none",
                WebkitBackgroundClip: i === 2 ? "text" : "unset",
                WebkitTextFillColor: i === 2 ? "transparent" : "unset",
                backgroundClip: i === 2 ? "text" : "unset",
              }}>
                {word}
              </span>
            </div>
          ))}
        </h1>

        <p ref={subtitleRef} style={{
          opacity: 0,
          maxWidth: "560px",
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "var(--text-muted)",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
          fontWeight: 300,
        }}>
          Crafting high-performance web experiences with React & Next.js.
          Turning complex problems into elegant, scalable interfaces.
        </p>

        <div ref={ctaRef} style={{ opacity: 0, display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button onClick={scrollToProjects} className="btn-glow">
            View Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </button>
          <a href="#contact" onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="btn-outline">
            Get In Touch
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
          {[["4+", "Projects Built"], ["2+", "Years Learning"], ["React", "& Next.js"]].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.8rem", color: "var(--text)" }}>{num}</div>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "'Space Mono', monospace" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{
        position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
        opacity: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--text-dim)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, var(--accent), transparent)", animation: "pulse 2s infinite" }} />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scaleY(1)} 50%{opacity:0.4;transform:scaleY(0.7)} }
        @media(max-width:768px){
          #home { padding-top: 80px; align-items: flex-start; padding-bottom: 100px; }
        }
      `}</style>
    </section>
  );
}
