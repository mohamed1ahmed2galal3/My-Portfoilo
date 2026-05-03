"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id:"01", title:"E-Commerce Platform", description:"Full-featured e-commerce with cart, wishlist & auth. Built with SSR for optimal performance and SEO.", tech:["Next.js","TypeScript","NextAuth","REST API"], link:"https://e-commerce-three-zeta-26.vercel.app/", color:"#6c63ff" },
  { id:"02", title:"Social Network App",  description:"Real-time social platform with posts, comments, likes and follow system via WebSocket updates.",   tech:["React","TypeScript","WebSockets","Auth"],    link:"https://social-app-theta-lovat.vercel.app/login", color:"#43e8d8" },
  { id:"03", title:"Movie Discovery",     description:"Browse and search thousands of movies with advanced filtering and rich API integration.",            tech:["React","API","Responsive"],                 link:"https://mohamed1ahmed2galal3.github.io/Movie/", color:"#ff6584" },
  { id:"04", title:"Yummy Recipe App",    description:"Dynamic food and recipe browsing with beautiful UI and smooth interactions.",                        tech:["JavaScript","API","Dynamic UI"],             link:"https://mohamed1ahmed2galal3.github.io/Yummy-Project/", color:"#f59e0b" },
];

function Card({ p }: { p: typeof projects[0] }) {
  const ref   = useRef<HTMLDivElement>(null);
  const glow  = useRef<HTMLDivElement>(null);
  const [hov, setHov] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !glow.current) return;
    const r  = ref.current.getBoundingClientRect();
    const x  = e.clientX - r.left, y = e.clientY - r.top;
    glow.current.style.left = x + "px";
    glow.current.style.top  = y + "px";
    const cx = r.width/2, cy = r.height/2;
    ref.current.style.transform = `perspective(900px) rotateX(${(y-cy)/22}deg) rotateY(${-(x-cx)/22}deg) translateZ(8px)`;
  };

  const onLeave = () => {
    ref.current!.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
    setHov(false);
  };

  return (
    <div ref={ref} className="project-card"
      onMouseMove={onMove} onMouseEnter={() => setHov(true)} onMouseLeave={onLeave}
      style={{ boxShadow: hov ? `0 24px 50px var(--shadow), 0 0 0 1px ${p.color}35` : `0 4px 20px var(--shadow)`, borderColor: hov ? p.color+"35" : "var(--border)" }}
    >
      {/* Glow spot */}
      <div ref={glow} style={{ position:"absolute", width:"180px", height:"180px", borderRadius:"50%", pointerEvents:"none", background:`radial-gradient(circle, ${p.color}18 0%, transparent 70%)`, transform:"translate(-50%,-50%)", opacity: hov ? 1 : 0, transition:"opacity 0.3s" }} />

      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"1.2rem" }}>
          <span style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.2em", color:p.color, opacity:0.65 }}>{p.id}</span>
          <a href={p.link} target="_blank" rel="noopener noreferrer"
            style={{ width:"34px", height:"34px", borderRadius:"50%", border:`1px solid ${p.color}35`, display:"flex", alignItems:"center", justifyContent:"center", color:p.color, transition:"all 0.3s", background: hov ? p.color+"15" : "transparent", textDecoration:"none" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
          </a>
        </div>

        <h3 style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"clamp(1.1rem,2.5vw,1.35rem)", marginBottom:"0.7rem", color:"var(--text)", letterSpacing:"-0.01em" }}>{p.title}</h3>
        <p style={{ color:"var(--text-muted)", lineHeight:1.7, fontSize:"0.88rem", fontWeight:300 }}>{p.description}</p>
      </div>

      <div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", margin:"1.2rem 0" }}>
          {p.tech.map(t => <span key={t} className="tech-tag" style={{ borderColor:p.color+"30", color:p.color }}>{t}</span>)}
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"'Syne',sans-serif", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.1em", textTransform:"uppercase", color:p.color, textDecoration:"none", display:"flex", alignItems:"center", gap:"5px", opacity: hov ? 1 : 0.5, transition:"opacity 0.3s" }}>
          Live Demo
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headRef.current?.children ?? [],
        { opacity:0, y:25 }, { opacity:1, y:0, duration:0.75, stagger:0.1, ease:"power3.out",
          scrollTrigger:{ trigger:sectionRef.current, start:"top 70%" } });
      gsap.fromTo(gridRef.current?.children ?? [],
        { opacity:0, y:40, scale:0.97 }, { opacity:1, y:0, scale:1, duration:0.75, stagger:0.12, ease:"power3.out",
          scrollTrigger:{ trigger:gridRef.current, start:"top 75%" } });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-pad" style={{ background:"var(--bg-2)", position:"relative" }}>
      <div className="grid-pattern" style={{ position:"absolute", inset:0 }} />
      <div className="container" style={{ position:"relative" }}>
        <div ref={headRef} style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"20px", marginBottom:"50px" }}>
          <div>
            <div className="section-label" style={{ marginBottom:"1rem" }}>Selected Work</div>
            <h2 className="section-heading">Projects that<br /><span className="gradient-text">speak volumes.</span></h2>
          </div>
          <p style={{ color:"var(--text-muted)", maxWidth:"280px", fontSize:"0.88rem", lineHeight:1.7 }}>
            Each project represents a unique challenge solved with clean code and thoughtful design.
          </p>
        </div>
        <div ref={gridRef} className="projects-grid">
          {projects.map(p => <Card key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
