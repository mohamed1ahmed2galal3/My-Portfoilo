"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// 🔑  EmailJS config — fill these in after setup
// ─────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_5tmr2a8";
const EMAILJS_TEMPLATE_ID = "template_6uxn3r3";
const EMAILJS_PUBLIC_KEY  = "E7Y2SaOG6mjYXYvXm";
// ─────────────────────────────────────────────

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current?.children ?? [],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "14px 18px",
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: "8px", color: "var(--text)",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem",
    outline: "none", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: "120px 40px",
      background: "var(--bg-2)",
      position: "relative",
    }}>
      <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.3 }} />

      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: "600px", height: "400px",
        background: "radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        <div ref={contentRef} style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          <div>
            <div className="section-label" style={{ marginBottom: "1rem" }}>Let's Talk</div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 4rem)", lineHeight: 1.0, letterSpacing: "-0.02em",
            }}>
              Ready to build<br /><span className="gradient-text">something great?</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "60px", alignItems: "start" }}>
            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                I'm currently available for freelance work and exciting opportunities. Let's create something amazing together.
              </p>

              {[
                { icon: "✉", label: "Email", value: "mohamedahmedgalal246@gmail.com" },
                { icon: "📍", label: "Location", value: "Egypt" },
                { icon: "💼", label: "Status", value: "Available for Work" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "8px",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.9rem", flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--text-dim)", textTransform: "uppercase", marginBottom: "2px" }}>{item.label}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{item.value}</div>
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: "12px", marginTop: "0.5rem" }}>
                {[
                  { label: "GitHub", href: "https://github.com/mohamed1ahmed2galal3", icon: "GH" },
                  { label: "LinkedIn", href: "#", icon: "LI" },
                ].map(social => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                    className="btn-outline" style={{ padding: "10px 18px", fontSize: "0.75rem" }}>
                    {social.icon} — {social.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              {sent ? (
                <div className="glass" style={{ padding: "40px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>I'll get back to you soon.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <input
                    name="from_name"
                    type="text" placeholder="Your Name" required
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                  <input
                    name="from_email"
                    type="email" placeholder="Your Email" required
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message" required rows={5}
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical" } as React.CSSProperties}
                    onFocus={e => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={e => (e.target.style.borderColor = "var(--border)")}
                  />
                  {error && (
                    <p style={{ color: "#ff6584", fontSize: "0.8rem", fontFamily: "'Space Mono', monospace" }}>
                      ⚠ {error}
                    </p>
                  )}
                  <button type="submit" className="btn-glow" disabled={sending}
                    style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.7 : 1 }}>
                    {sending ? "Sending..." : "Send Message"}
                    {!sending && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:768px){
          #contact > div > div > div:last-child > div:last-child { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
