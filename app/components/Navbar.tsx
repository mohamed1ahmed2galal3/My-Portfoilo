"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.2 }
    );

    const handleScroll = () => {
      const scrolled = window.scrollY > 60;
      setScrolled(scrolled);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress((window.scrollY / total) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: progress + "%" }} />
      <nav
        ref={navRef}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: scrolled ? "16px 40px" : "24px 40px",
          transition: "padding 0.4s, background 0.4s, backdrop-filter 0.4s",
          background: scrolled ? "rgba(5,5,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.4rem", letterSpacing: "-0.02em", textDecoration: "none", color: "var(--text)" }}>
          MAG<span className="gradient-text">.</span>
        </a>

        {/* Desktop */}
        <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }} className="nav-desktop">
          {navLinks.map(link => (
            <li key={link.href}>
              <button onClick={() => scrollTo(link.href)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontFamily: "'Syne', sans-serif", fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "none", transition: "color 0.2s", padding: "4px 0" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
          className="btn-glow"
          style={{ padding: "10px 22px", fontSize: "0.75rem" }}>
          Hire Me
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "none", flexDirection: "column", gap: "5px", padding: "4px" }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: "block", width: "24px", height: "1px", background: "var(--text)", transition: "transform 0.3s" }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(5,5,8,0.97)", backdropFilter: "blur(30px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2rem",
        }}>
          {navLinks.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)}
              style={{ background: "none", border: "none", color: "var(--text)", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "2rem", cursor: "none" }}>
              {link.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
