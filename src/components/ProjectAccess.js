import {
  ArrowUpRight,
  Bike,
  Download,
  ShieldCheck,
  Smartphone,
  Store,
} from "lucide-react";
import { useId } from "react";
import "./ProjectAccess.css";

const icons = {
  admin: ShieldCheck,
  restaurant: Store,
  customer: Smartphone,
  rider: Bike,
};

export function formatFileSize(bytes) {
  return Number.isFinite(bytes) && bytes > 0
    ? `${(bytes / 1000000).toFixed(2)} MB`
    : null;
}

export default function ProjectAccess({ project, detail = false }) {
  const headingId = useId();
  if (!project.links?.length) return null;
  return (
    <section
      id={detail ? undefined : `try-${project.id}`}
      className={`project-access${detail ? " project-access-detail" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="access-heading">
        <h4 id={headingId}>Try {project.title}</h4>
        <span>Choose your experience</span>
      </div>
      <div className="access-grid">
        {project.links.map((link) => {
          const Icon = icons[link.id] || Smartphone;
          const isApk = link.type === "apk";
          const size = isApk ? formatFileSize(link.sizeBytes) : null;
          const action = isApk ? "Download APK" : "Open";
          return (
            <div
              className={`access-tile${link.url ? "" : " access-unavailable"}`}
              key={link.id}
            >
              <div className="access-tile-title">
                <span className="access-icon">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <div>
                  <h5>{link.label}</h5>
                  <p>{isApk ? "Android app" : "Web dashboard"}</p>
                </div>
              </div>
              {link.url ? (
                <a
                  className="access-button"
                  href={link.url}
                  target={
                    isApk && link.url.startsWith("/") ? undefined : "_blank"
                  }
                  rel="noopener noreferrer"
                  download={isApk ? link.downloadName : undefined}
                  aria-label={`${isApk ? "Download" : "Open"} ${link.label}${size ? `, ${size}` : ""}${isApk ? ", Android APK" : " (opens in a new tab)"}`}
                >
                  {isApk ? (
                    <Download size={14} aria-hidden="true" />
                  ) : (
                    <ArrowUpRight size={14} aria-hidden="true" />
                  )}
                  {action}
                  {size && <span>{size}</span>}
                </a>
              ) : (
                <button
                  className="access-button"
                  type="button"
                  disabled
                  aria-label={`${link.label}: coming soon${size ? `, ${size}` : ""}`}
                >
                  {isApk && <Download size={14} aria-hidden="true" />}
                  Coming soon{size && <span>{size}</span>}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {project.links.some((link) => link.type === "apk") && (
        <p className="access-note">
          Android only. You may need to allow installs from unknown sources.
        </p>
      )}
    </section>
  );
}
