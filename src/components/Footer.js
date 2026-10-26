import { ArrowUp } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { navigation, profile } from "../data/profile";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <a className="logo" href="#home" aria-label="Ciao — home">
              Ciao<span>.</span>
            </a>
            <p>Thoughtful code. Meaningful experiences.</p>
            <p>BSIT Student · {profile.location}</p>
          </div>
          <nav aria-label="Footer navigation">
            {navigation.map(({ id, label }) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <SocialLinks />
        </div>
        <div className="footer-bottom">
          <p>© 2026 Jebzter Catacutan. All rights reserved.</p>
          <a className="back-to-top" href="#home">
            Back to top
            <span>
              <ArrowUp size={16} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
