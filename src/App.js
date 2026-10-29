import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import TechStack from "./components/TechStack";
import Projects from "./pages/Project";
import Contact from "./pages/Contact";
import Certifications from "./components/Certifications";
import "./App.css";
import "./Portfolio.css";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  useEffect(() => {
    // Preserve incoming links to the original pages.
    const legacy = {
      "/about": "about",
      "/project": "projects",
      "/projects": "projects",
      "/contact": "contact",
    };
    const target = legacy[window.location.pathname.replace(/\/$/, "")];
    if (target) {
      window.history.replaceState(null, "", `/#${target}`);
      document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
    }
    const sections = [...document.querySelectorAll("main > section[id]")];
    let frame;
    const updateSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = sections
          .filter((section) => section.getBoundingClientRect().top <= 180)
          .pop();
        setActiveSection(
          current?.id || "home",
        );
      });
    };
    window.addEventListener("scroll", updateSection, { passive: true });
    updateSection();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateSection);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div className="App">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar activeSection={activeSection} />
      <main id="main-content" tabIndex={-1}>
        <Home />
        <About />
        <TechStack />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
