"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import About    from "./components/About";
import Projects from "./components/Projects";
import Skills   from "./components/Skills";
import Contact  from "./components/Contact";
import Footer   from "./components/Footer";

const LoadingScreen = dynamic(() => import("./components/LoadingScreen"), { ssr: false });
const Cursor        = dynamic(() => import("./components/Cursor"),        { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [theme,  setTheme]  = useState<"dark"|"light">("dark");

  // Persist theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark"|"light" | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <Cursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
