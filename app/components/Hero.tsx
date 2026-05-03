"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dynamic from "next/dynamic";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const labelRef    = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.0 });
    tl.fromTo(labelRef.current, { opacity:0, x:-20 }, { opacity:1, x:0, duration:0.6, ease:"power2.out" })
      .fromTo(titleRef.current?.querySelectorAll(".word") ?? [],
        { y:"110%", opacity:0 }, { y:"0%", opacity:1, duration:0.9, ease:"power4.out", stagger:0.08 }, "-=0.2")
      .fromTo(subRef.current,   { opacity:0, y:20 }, { opacity:1, y:0, duration:0.7, ease:"power3.out" }, "-=0.3")
      .fromTo(ctaRef.current,   { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:"power3.out" }, "-=0.4")
      .fromTo(statsRef.current, { opacity:0, y:20 }, { opacity:1, y:0, duration:0.6, ease:"power3.out" }, "-=0.3")
      .fromTo(scrollRef.current,{ opacity:0 },       { opacity:1, duration:0.6 }, "-=0.2");
  }, []);

  return (
    <section id="home" style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", overflow:"hidden" }}>
      <HeroCanvas />

      {/* Orbs */}
      <div style={{ position:"absolute", top:"15%", left:"5%", width:"clamp(300px,40vw,500px)", height:"clamp(300px,40vw,500px)", borderRadius:"50%", background:"radial-gradient(circle, rgba(108,99,255,0.13) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"15%", right:"5%", width:"clamp(200px,30vw,400px)", height:"clamp(200px,30vw,400px)", borderRadius:"50%", background:"radial-gradient(circle, rgba(67,232,216,0.08) 0%, transparent 70%)", filter:"blur(40px)", pointerEvents:"none" }} />

      <div className="container" style={{ position:"relative", zIndex:1, padding:"120px 24px 80px" }}>
        <div ref={labelRef} className="section-label" style={{ marginBottom:"2rem", opacity:0 }}>
          Frontend Developer — React &amp; Next.js
        </div>

        <h1 ref={titleRef} className="hero-title" style={{ marginBottom:"1.5rem" }}>
          {["Mohamed","Ahmed","Galal"].map((word, i) => (
            <div key={i} style={{ overflow:"hidden", display:"block" }}>
              <span className={`word${i===2?" gradient-text":""}`} style={{ display:"inline-block" }}>
                {word}
              </span>
            </div>
          ))}
        </h1>

        <p ref={subRef} className="hero-sub" style={{ maxWidth:"540px", marginBottom:"2.5rem", opacity:0 }}>
          Crafting high-performance web experiences with React &amp; Next.js.
          Turning complex problems into elegant, scalable interfaces.
        </p>

        <div ref={ctaRef} className="hero-cta" style={{ opacity:0 }}>
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })} className="btn-glow">
            View Work
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })} className="btn-outline">
            Get In Touch
          </button>
        </div>

        <div ref={statsRef} className="hero-stats" style={{ opacity:0 }}>
          {[["4+","Projects Built"],["React","Specialist"],["Next.js","Expert"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.8rem", color:"var(--text)" }}>{n}</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", letterSpacing:"0.12em", color:"var(--text-muted)", textTransform:"uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} style={{ position:"absolute", bottom:"32px", left:"50%", transform:"translateX(-50%)", opacity:0, display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", letterSpacing:"0.2em", color:"var(--text-dim)", textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:"1px", height:"50px", background:"linear-gradient(to bottom, var(--accent), transparent)", animation:"scrollPulse 2s infinite" }} />
      </div>
    </section>
  );
}
