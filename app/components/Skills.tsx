"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name:"React",            level:90, color:"#61DAFB" },
  { name:"Next.js",          level:85, color:"#a78bfa" },
  { name:"TypeScript",       level:80, color:"#3178C6" },
  { name:"Tailwind CSS",     level:90, color:"#38BDF8" },
  { name:"REST APIs",        level:85, color:"#43e8d8" },
  { name:"Authentication",   level:80, color:"#6c63ff" },
  { name:"State Management", level:75, color:"#ff6584" },
  { name:"Git / GitHub",     level:85, color:"#f97316" },
];

const cats = [
  { title:"Frontend", icon:"⚡", items:["React","Next.js","TypeScript","Tailwind CSS","JavaScript","HTML & CSS"], color:"#6c63ff" },
  { title:"Concepts",  icon:"🧠", items:["REST APIs","Authentication","State Management","Responsive Design","SSR / SSG","WebSockets"], color:"#43e8d8" },
  { title:"Tools",     icon:"🛠", items:["Git","GitHub","Vercel","VS Code","npm","Figma"], color:"#ff6584" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const barsRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current?.children ?? [],
        { opacity:0, y:20 }, { opacity:1, y:0, stagger:0.1, duration:0.7, ease:"power3.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 70%" } });

      barsRef.current?.querySelectorAll<HTMLElement>(".skill-fill").forEach(bar => {
        const w = bar.dataset.width;
        gsap.fromTo(bar, { width:"0%" }, { width:w+"%", duration:1.2, ease:"power2.out",
          scrollTrigger:{ trigger:bar, start:"top 88%" } });
      });

      gsap.fromTo(cardsRef.current?.children ?? [],
        { opacity:0, y:35, scale:0.96 }, { opacity:1, y:0, scale:1, stagger:0.1, duration:0.7, ease:"power3.out",
          scrollTrigger:{ trigger:cardsRef.current, start:"top 75%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section-pad" style={{ background:"var(--bg)" }}>
      <div className="container">
        <div ref={headRef} style={{ marginBottom:"60px" }}>
          <div className="section-label" style={{ marginBottom:"1rem" }}>Expertise</div>
          <h2 className="section-heading">Skills &amp; <span className="gradient-text">Technologies</span></h2>
        </div>

        <div className="skills-grid">
          {/* Bars */}
          <div ref={barsRef} style={{ display:"flex", flexDirection:"column", gap:"22px" }}>
            {skills.map(s => (
              <div key={s.name}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"7px" }}>
                  <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:"0.88rem", color:"var(--text)" }}>{s.name}</span>
                  <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.65rem", color:"var(--text-muted)" }}>{s.level}%</span>
                </div>
                <div style={{ height:"2px", background:"var(--surface-2)", borderRadius:"2px", overflow:"hidden" }}>
                  <div className="skill-fill" data-width={s.level}
                    style={{ height:"100%", width:"0%", borderRadius:"2px",
                      background:`linear-gradient(90deg, ${s.color}, ${s.color}70)`,
                      boxShadow:`0 0 8px ${s.color}50` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Category cards */}
          <div ref={cardsRef} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>
            {cats.map(c => (
              <div key={c.title} className="glass" style={{ padding:"22px", borderRadius:"12px", borderColor:c.color+"20" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                  <span style={{ fontSize:"1.1rem" }}>{c.icon}</span>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:c.color, letterSpacing:"0.05em" }}>{c.title}</h3>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                  {c.items.map(item => (
                    <span key={item} style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.62rem", padding:"4px 11px", borderRadius:"20px", background:c.color+"10", border:`1px solid ${c.color}22`, color:"var(--text-muted)", letterSpacing:"0.04em", transition:"all 0.2s", cursor:"default" }}
                      onMouseEnter={e => { const el = e.target as HTMLElement; el.style.color=c.color; el.style.background=c.color+"22"; }}
                      onMouseLeave={e => { const el = e.target as HTMLElement; el.style.color="var(--text-muted)"; el.style.background=c.color+"10"; }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
