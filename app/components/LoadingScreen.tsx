"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(screenRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete,
        });
      },
    });

    tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" })
      .to({}, { duration: 0.2 });

    // Animate counter
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(obj.val) + "%";
      },
    });

    gsap.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
  }, [onComplete]);

  return (
    <div ref={screenRef} className="loading-screen">
      <div ref={textRef}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem,6vw,3.5rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text)" }}>
          MAG<span className="gradient-text">.</span>
        </div>
        <div className="loading-bar-container" style={{ marginTop: "1.5rem" }}>
          <div ref={barRef} className="loading-bar" style={{ transformOrigin: "left" }} />
        </div>
        <div style={{ marginTop: "0.75rem", fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--text-muted)", display: "flex", justifyContent: "space-between" }}>
          <span>LOADING</span>
          <span ref={counterRef}>0%</span>
        </div>
      </div>
    </div>
  );
}
