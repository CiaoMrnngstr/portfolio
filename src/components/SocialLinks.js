import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { Mail, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";

export default function SocialLinks({ compact = false }) {
  const links = [
    { label: "GitHub", href: profile.github, Icon: FaGithub },
    { label: "LinkedIn", href: profile.linkedin, Icon: FaLinkedinIn },
    ...(!compact
      ? [
          { label: "Facebook", href: profile.facebook, Icon: FaFacebookF },
          { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
        ]
      : []),
  ];
  return (
    <div className="social-links">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("https:") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={`${label}${href.startsWith("https:") ? " (opens in a new tab)" : ""}`}
          title={label}
        >
          <Icon size={18} aria-hidden="true" />
          {compact && (
            <>
              <span>{label}</span>
              <ArrowUpRight size={13} aria-hidden="true" />
            </>
          )}
        </a>
      ))}
    </div>
  );
}
