import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { navigation } from "../data/profile";

export default function Navbar({ activeSection }) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark",
  );
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      let saved;
      try {
        saved = localStorage.getItem("ciao-theme");
      } catch {
        /* Storage can be unavailable. */
      }
      setTheme(
        saved === "light" || saved === "dark"
          ? saved
          : media.matches
            ? "dark"
            : "light",
      );
    };
    syncTheme();
    media.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      media.removeEventListener("change", syncTheme);
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#0b0e16" : "#f5f7fc");
  }, [theme]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);
  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("ciao-theme", next);
    } catch {
      /* Keep the session choice. */
    }
  }
  function keepMenuFocus(event) {
    if (event.key !== "Tab") return;
    const controls = [
      ...dialog.current.querySelectorAll("a[href], button:not([disabled])"),
    ];
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  const links = navigation.map(({ id, label }) => (
    <a
      key={id}
      href={`#${id}`}
      aria-current={activeSection === id ? "location" : undefined}
      className={activeSection === id ? "nav-link active" : "nav-link"}
      onClick={() => dialog.current?.close()}
    >
      {label}
    </a>
  ));
  return (
    <header className={`header${scrolled ? " header-scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="logo" href="#home" aria-label="Ciao — home">
          Ciao<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? (
              <Sun size={19} aria-hidden="true" />
            ) : (
              <Moon size={19} aria-hidden="true" />
            )}
          </button>
          <a className="header-contact" href="#contact">
            Let's talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            className="icon-button menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => {
              dialog.current.showModal();
              setMenuOpen(true);
            }}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Navigation menu"
        onClose={() => setMenuOpen(false)}
        onKeyDown={keepMenuFocus}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current.close();
        }}
      >
        <div className="mobile-menu-panel">
          <div className="mobile-menu-heading">
            <span className="logo">
              Ciao<span>.</span>
            </span>
            <button
              className="icon-button"
              aria-label="Close navigation menu"
              onClick={() => dialog.current.close()}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <p className="eyebrow">Explore the portfolio</p>
          <nav aria-label="Mobile navigation">{links}</nav>
          <p className="mobile-menu-note">
            A little curiosity. A lot of building.
          </p>
        </div>
      </dialog>
    </header>
  );
}
