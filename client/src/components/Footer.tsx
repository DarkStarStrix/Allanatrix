// =============================================================================
// Footer — Minimal, data-dense footer
// Data Observatory × Cyberpunk: IBM Plex Mono, electric accent
// CSS tokens: --void-border, --electric, --text-primary, --text-secondary
// =============================================================================

import { Github, Linkedin } from "lucide-react";
import { SITE } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="mt-auto"
      style={{
        borderTop: "1px solid var(--void-border)",
        background: "oklch(0.09 0.022 280)",
      }}
    >
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Brand + copyright */}
          <div className="flex flex-col gap-1">
            <span className="font-data text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              <span style={{ color: "var(--electric)" }}>▸</span> allanatrix
            </span>
            <span className="font-data text-xs" style={{ color: "var(--text-dim)" }}>
              © {year} Allan Wanjohi · Aethron Labs
            </span>
          </div>

          {/* Domain */}
          <span className="font-data text-xs hidden sm:block" style={{ color: "var(--text-dim)" }}>
            {SITE.cname}
          </span>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/DarkStarStrix"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              aria-label="GitHub"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/technomancertrix/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              aria-label="LinkedIn"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--neon)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <Linkedin size={16} />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="font-data text-xs transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
