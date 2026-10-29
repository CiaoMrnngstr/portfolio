import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  MapPin,
  Sparkles,
} from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import { profile } from "../data/profile";
import profileImage from "../assets/optimized/profile.webp";
import "./Home.css";

function TypingTagline() {
  const [text, setText] = useState(profile.tagline);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    const start = () => {
      clearInterval(timer);
      if (media.matches) {
        setText(profile.tagline);
        return;
      }
      let index = 0;
      setText("");
      timer = setInterval(() => {
        index += 1;
        setText(profile.tagline.slice(0, index));
        if (index >= profile.tagline.length) clearInterval(timer);
      }, 38);
    };
    start();
    media.addEventListener("change", start);
    return () => {
      clearInterval(timer);
      media.removeEventListener("change", start);
    };
  }, []);
  return (
    <p className="role-line">
      <span className="sr-only">{profile.tagline}</span>
      <span className="role-reserved" aria-hidden="true">
        {profile.tagline}
      </span>
      <span className="role-typed" aria-hidden="true">
        {text}
        <span className="typing-cursor">|</span>
      </span>
    </p>
  );
}
export default function Home() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-mesh" aria-hidden="true" />
      <div className="container">
        <div className="hero-topline">
          <span>
            <span className="status-dot" />
            Open to IT internship opportunities
          </span>
          <span className="mono">PORTFOLIO / 2026</span>
        </div>
        <div className="hero-grid">
          <div className="portrait-stage">
            <div className="portrait-orbit" aria-hidden="true" />
            <div className="portrait-ring">
              <img
                src={profileImage}
                width="640"
                height="854"
                alt="Jebzter Catacutan"
                fetchPriority="high"
              />
            </div>
            <div className="portrait-label label-code">
              <Code2 size={21} aria-hidden="true" />
              <span>
                Turning ideas
                <br />
                <strong>into experiences.</strong>
              </span>
            </div>
            <div className="portrait-label label-student">
              <Sparkles size={17} aria-hidden="true" />
              Always a student.
            </div>
            <span className="portrait-plus plus-one" aria-hidden="true">
              +
            </span>
            <span className="portrait-plus plus-two" aria-hidden="true">
              +
            </span>
            <div className="portrait-location">
              <MapPin size={13} aria-hidden="true" />
              {profile.location}
            </div>
          </div>
          <div className="hero-copy">
            <p className="hero-greeting">Hi, I'm</p>
            <h1 id="hero-title">
              Jebzter
              <br />
              <span className="gradient-text">Catacutan</span>
              <span className="hero-period">.</span>
            </h1>
            <TypingTagline />
            <p className="hero-intro">
              I build thoughtful web and mobile experiences with React,
              React Native, and Firebase. A fourth-year IT student ready to
              contribute, learn, and turn real problems into working software.
            </p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">
                View Projects
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a className="button button-secondary" href="#contact">
                Contact Me
              </a>
              <a className="button button-outline" href={profile.cv} download>
                Download CV
                <Download size={16} aria-hidden="true" />
              </a>
            </div>
            <SocialLinks compact />
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-cue">
            <span>
              <ArrowDown size={15} aria-hidden="true" />
            </span>
            Scroll to explore
          </a>
          <span className="mono">IDEAS → CODE → IMPACT</span>
        </div>
      </div>
    </section>
  );
}
