import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, ArrowUp, Command, Menu, Moon, Sun, Sparkle, Download } from "lucide-react";
import portrait from "./assets/optimized/profile.webp";
import { navigation, profile } from "./data/profile";
import { projects } from "./data/projects";
import Modal from "./components/Modal";
import CommandPalette from "./components/CommandPalette";
import Work from "./pages/Work";
import { AboutAndSkills, BeyondCode, Journey, Resume } from "./components/PersonalSections";
import Contact from "./pages/Contact";
import "./App.css";

function goTo(id) {
  const element = document.getElementById(id);
  if (!element) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.history.replaceState(null, "", `#${id}`);
  element.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  element.setAttribute("tabindex", "-1");
  element.focus({ preventScroll: true });
}

function downloadCV() {
  const anchor = document.createElement("a");
  anchor.href = profile.cv;
  anchor.download = profile.cvFilename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

function Header({ theme, toggleTheme, active, onCommands }) {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1000px)");
    const close = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener("change", close);
    return () => media.removeEventListener("change", close);
  }, []);
  function links(mobile = false) {
    return navigation.map(({ id, label }, index) => <a key={id} href={`#${id}`}
      aria-current={active === id ? "location" : undefined}
      onClick={(event) => { event.preventDefault(); setMenuOpen(false); requestAnimationFrame(() => goTo(id)); }}>
      {mobile && <span className="mono">0{index + 1}</span>}{label}{mobile && <ArrowUpRight size={22} aria-hidden="true" />}
    </a>);
  }
  return <header className="site-header">
    <div className="header-inner">
      <a className="wordmark" href="#home" aria-label="Jebzter Catacutan — home"><span>jc<span className="wordmark-dot">.</span></span><span className="wordmark-caption mono">Developer's<br />fieldnotes</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{links()}</nav>
      <div className="header-tools">
        <button className="command-trigger" aria-label="Open command palette" aria-keyshortcuts="Control+k Meta+k" onClick={onCommands}><Command size={17} aria-hidden="true" /><kbd>K</kbd></button>
        <button className="icon-button theme-toggle" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`} onClick={toggleTheme}>{theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}</button>
        <button className="icon-button menu-trigger" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><Menu size={22} aria-hidden="true" /></button>
      </div>
    </div>
    {menuOpen && <Modal title="Navigation" onClose={() => setMenuOpen(false)} className="navigation-modal"><nav aria-label="Mobile navigation">{links(true)}</nav><p className="menu-note mono">Web, mobile & the systems in between.</p></Modal>}
  </header>;
}

function Hero() {
  return <section id="home" className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <p className="eyebrow hero-eyebrow"><Sparkle size={19} aria-hidden="true" />Web, mobile & the systems in between</p>
      <h1 id="hero-title">Jebzter<br /><span>Catacutan<span className="name-period">.</span></span></h1>
      <div className="hero-intro"><span className="hero-arrow" aria-hidden="true">↳</span><div><p className="hero-role">Aspiring full-stack developer.</p><p>I turn everyday problems into connected<br className="desktop-break" /> web and mobile experiences.</p></div></div>
      <div className="hero-actions"><a className="button primary-button" href="#projects">Explore my work<ArrowDown size={18} aria-hidden="true" /></a><a className="text-link" href={profile.cv} download={profile.cvFilename}>Download CV<Download size={17} aria-hidden="true" /></a></div>
    </div>
    <div className="hero-portrait">
      <div className="portrait-topline mono"><span>Meet the developer</span><span>↙</span></div>
      <div className="portrait-image"><img src={portrait} alt="Jebzter Catacutan wearing a dark suit and tie" width="640" height="854" fetchPriority="high" decoding="async" /><span className="portrait-side mono">Curiosity is a good starting point.</span></div>
      <div className="availability"><span className="availability-dot" aria-hidden="true" /><div><span className="mono">The next chapter</span><p>Open to IT internship<br />opportunities</p></div><ArrowUpRight size={25} aria-hidden="true" /></div>
    </div>
    <div className="hero-footnote mono"><span>Based in Cabanatuan, Philippines</span><span>Designed with intention. Built with curiosity.</span><a href="#projects" aria-label="Scroll to selected work"><ArrowDown size={18} aria-hidden="true" /></a></div>
  </section>;
}

export default function App() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "light");
  const [active, setActive] = useState("home");
  const [palette, setPalette] = useState(false);
  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      try { localStorage.setItem("ciao-theme", next); } catch { /* Session preference still works. */ }
      return next;
    });
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#181716" : "#f5f1e9");
  }, [theme]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    function syncTheme() {
      let saved;
      try { saved = localStorage.getItem("ciao-theme"); } catch { /* Storage is optional. */ }
      setTheme(saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light");
    }
    syncTheme();
    media.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => { media.removeEventListener("change", syncTheme); window.removeEventListener("storage", syncTheme); };
  }, []);
  useEffect(() => {
    function keyboard(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (document.querySelector("dialog[open]:not(.command-modal)")) return;
        setPalette((open) => !open);
      }
    }
    document.addEventListener("keydown", keyboard);
    return () => document.removeEventListener("keydown", keyboard);
  }, []);
  useEffect(() => {
    const legacy = { "/about": "about", "/project": "projects", "/projects": "projects", "/contact": "contact" };
    const target = legacy[window.location.pathname.replace(/\/$/, "")];
    if (target) {
      window.history.replaceState(null, "", `/#${target}`);
      requestAnimationFrame(() => goTo(target));
    }
    const sections = [...document.querySelectorAll("main > section[id]")];
    let frame;
    function update() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const current = sections.filter((section) => section.getBoundingClientRect().top <= 180).pop();
        setActive(current?.id || "home");
      });
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    if ("IntersectionObserver" in window && !reduced.matches) {
      observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      }), { threshold: 0.06 });
      document.querySelectorAll(".reveal").forEach((element) => { element.classList.add("reveal-ready"); observer.observe(element); });
    }
    return () => { observer?.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", update); };
  }, []);
  const commands = [
    ...navigation.map(({ id, label }) => ({ label: `Go to ${label}`, group: "Navigate", action: () => goTo(id) })),
    { label: "Explore skills", group: "Navigate", action: () => goTo("tech-stack") },
    { label: "Beyond code", group: "Navigate", action: () => goTo("beyond") },
    ...projects.map((project) => ({ label: project.title, group: "Project", action: () => {
      document.getElementById(`case-${project.id}`).open = true;
      goTo(`project-${project.id}`);
    } })),
    { label: "Download CV", group: "Résumé", keywords: "resume pdf", action: downloadCV },
    { label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, group: "Appearance", action: toggleTheme },
  ];
  return <div className="portfolio">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Header theme={theme} toggleTheme={toggleTheme} active={active} onCommands={() => setPalette(true)} />
    <main id="main-content" className="page-container" tabIndex={-1}>
      <Hero /><Work /><AboutAndSkills /><Journey /><BeyondCode /><Resume /><Contact />
    </main>
    <footer className="site-footer page-container"><a className="footer-signature" href="#home">Jebzter Catacutan<span>Made with care, in the Philippines.</span></a><span className="mono">© {new Date().getFullYear()} · Always a work in progress.</span><button className="text-link" onClick={() => goTo("home")}>Back to top<ArrowUp size={16} aria-hidden="true" /></button></footer>
    {palette && <CommandPalette commands={commands} onClose={() => setPalette(false)} />}
  </div>;
}
