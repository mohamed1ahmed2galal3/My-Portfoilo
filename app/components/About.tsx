"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current,
        { opacity:0, x:-50, scale:0.95 },
        { opacity:1, x:0, scale:1, duration:1, ease:"power3.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 70%" } });

      gsap.fromTo(contentRef.current?.querySelectorAll(".ri") ?? [],
        { opacity:0, y:28 },
        { opacity:1, y:0, duration:0.75, ease:"power3.out", stagger:0.1,
          scrollTrigger:{ trigger:sectionRef.current, start:"top 65%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-pad" style={{ background:"var(--bg)" }}>
      <div className="container">
        <div className="about-grid">

          {/* Image */}
          <div ref={imgRef} style={{ position:"relative" }}>
            <div className="profile-img-wrap">
              <Image src="/profile.jpg" alt="Mohamed Ahmed Galal" fill style={{ objectFit:"cover", objectPosition:"top center" }} priority />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(5,5,8,0.55) 0%, transparent 55%)" }} />
              <div style={{ position:"absolute", bottom:"18px", left:"18px", fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.15em", color:"rgba(255,255,255,0.55)", textTransform:"uppercase" }}>
                Mohamed Ahmed Galal
              </div>
            </div>

            {/* Decorative corner */}
            <div style={{ position:"absolute", top:"-16px", right:"-16px", width:"80px", height:"80px", border:"1px solid rgba(108,99,255,0.2)", borderRadius:"4px", zIndex:-1, display:"block" }} className="hide-xs" />

            {/* Floating badge */}
            <div className="glass" style={{ position:"absolute", top:"24px", right:"-12px", padding:"10px 16px", borderRadius:"8px", display:"flex", flexDirection:"column", gap:"2px" }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"1.1rem", color:"var(--accent-3)" }}>React</span>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.55rem", color:"var(--text-muted)", letterSpacing:"0.1em" }}>SPECIALIST</span>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} style={{ display:"flex", flexDirection:"column", gap:"1.4rem" }}>
            <div className="section-label ri">About Me</div>

            <h2 className="section-heading ri">
              Building the web,<br />
              <span className="gradient-text">one pixel at a time.</span>
            </h2>

            <p className="ri" style={{ color:"var(--text-muted)", lineHeight:1.8, fontSize:"1rem", fontWeight:300 }}>
              Frontend Developer specializing in React and Next.js, experienced in building
              scalable web applications with authentication, API integration, and real-time features.
            </p>

            <p className="ri" style={{ color:"var(--text-muted)", lineHeight:1.8, fontSize:"1rem", fontWeight:300 }}>
              Passionate about creating high-performance, user-focused interfaces that deliver
              exceptional experiences. Based in Egypt, working globally.
            </p>

            <div className="ri" style={{ display:"flex", flexWrap:"wrap", gap:"0.6rem" }}>
              {["React","Next.js","TypeScript","Tailwind CSS","REST APIs","WebSockets"].map(t => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>

            <div className="ri">
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })} className="btn-glow">
                Let's Work Together
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:500px){.hide-xs{display:none!important}}`}</style>
    </section>
  );
}
