"use client";
export default function Footer() {
  return (
    <footer style={{
      padding: "40px",
      borderTop: "1px solid var(--border)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem" }}>
        MAG<span className="gradient-text">.</span>
      </div>
      <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.65rem", color: "var(--text-dim)", letterSpacing: "0.1em" }}>
        © 2025 Mohamed Ahmed Galal — Frontend Developer
      </p>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          color: "var(--text-muted)", padding: "10px 20px", borderRadius: "4px",
          fontFamily: "'Space Mono', monospace", fontSize: "0.65rem",
          letterSpacing: "0.1em", cursor: "none", transition: "all 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        ↑ BACK TO TOP
      </button>
    </footer>
  );
}
