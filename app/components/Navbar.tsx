"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const navLinks = [
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills",   href: "#skills" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const navRef  = useRef<HTMLElement>(null);
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [progress, setProgress]   = useState(0);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.2 }
    );
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: progress + "%" }} />

      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "14px 24px" : "22px 24px",
        transition: "padding 0.4s, background 0.4s, backdrop-filter 0.4s, border-color 0.4s",
        background: scrolled ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ background: "none", border: "none", cursor: "none",
            fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.4rem",
            letterSpacing: "-0.02em", color: "var(--text)" }}>
          MAG<span className="gradient-text">.</span>
        </button>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
          {navLinks.map(l => (
            <li key={l.href}>
              <button onClick={() => scrollTo(l.href)} style={{
                background: "none", border: "none", color: "var(--text-muted)",
                fontFamily: "'Syne',sans-serif", fontWeight: 500, fontSize: "0.85rem",
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "none",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
              >{l.label}</button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Theme toggle */}
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <div className="theme-thumb">
              {theme === "dark" ? "🌙" : "☀️"}
            </div>
          </button>

          {/* Hire me — hidden on mobile */}
          <a href="#contact" onClick={e => { e.preventDefault(); scrollTo("#contact"); }}
            className="btn-glow nav-hire"
            style={{ padding: "10px 20px", fontSize: "0.75rem" }}>
            Hire Me
          </a>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger"
            style={{ display: "none", flexDirection: "column", gap: "5px",
              background: "none", border: "none", cursor: "none", padding: "4px" }}>
            {[0,1,2].map(i => (
              <span key={i} style={{ display: "block", width: "24px", height: "1.5px",
                background: "var(--text)", transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen ? (i===0?"rotate(45deg) translate(5px,5px)":i===2?"rotate(-45deg) translate(5px,-5px)":"none") : "none",
                opacity: menuOpen && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "var(--bg)", backdropFilter: "blur(30px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2.5rem",
        }}>
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              style={{ background: "none", border: "none", color: "var(--text)",
                fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "2.2rem",
                cursor: "none", letterSpacing: "-0.02em",
              }}>
              {l.label}
            </button>
          ))}
          <button className="theme-toggle" onClick={toggleTheme} style={{ marginTop: "1rem" }}>
            <div className="theme-thumb">{theme === "dark" ? "🌙" : "☀️"}</div>
          </button>
        </div>
      )}
    </>
  );
}
