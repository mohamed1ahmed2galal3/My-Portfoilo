"use client";
export default function Footer() {
  return (
    <footer style={{ padding:"32px 24px", borderTop:"1px solid var(--border)", background:"var(--bg)" }}>
      <div className="container footer-inner">
        <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:"1.2rem", color:"var(--text)" }}>
          MAG<span className="gradient-text">.</span>
        </div>
        <p style={{ fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", color:"var(--text-dim)", letterSpacing:"0.1em", textAlign:"center" }}>
          © 2025 Mohamed Ahmed Galal — Frontend Developer
        </p>
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={{ background:"var(--surface)", border:"1px solid var(--border)", color:"var(--text-muted)", padding:"9px 18px", borderRadius:"4px", fontFamily:"'Space Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.1em", cursor:"none", transition:"border-color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor="var(--accent)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor="var(--border)")}>
          ↑ TOP
        </button>
      </div>
    </footer>
  );
}
