// =============================================================================
// Nav — Sticky navigation
// Data Observatory × Cyberpunk: void-glass backdrop, electric active dot,
// IBM Plex Mono labels, neon hover states
// CSS tokens: --void, --electric, --neon, --text-primary, --text-secondary
// =============================================================================

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Terminal } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.10 0.025 280 / 0.92)"
          : "oklch(0.10 0.025 280 / 0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--void-border)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 30px oklch(0.72 0.22 255 / 0.06)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <span
              className="font-data font-medium text-base tracking-tight cursor-pointer transition-colors duration-200"
              style={{ color: "var(--text-primary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            >
              <span style={{ color: "var(--electric)" }}>▸</span>{" "}
              allanatrix
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const active = !link.external && isActive(link.href);
              const isTerminal = link.label === "Terminal";

              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-link px-3 py-1.5 rounded"
                    style={{ color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`nav-link px-3 py-1.5 rounded cursor-pointer block relative${active ? " active" : ""}`}
                    style={{ color: active ? "var(--electric)" : "var(--text-secondary)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = active ? "var(--electric)" : "var(--text-secondary)")}
                  >
                    {isTerminal ? (
                      <span className="flex items-center gap-1.5">
                        <Terminal size={12} />
                        {link.label}
                      </span>
                    ) : (
                      link.label
                    )}
                    {active && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "var(--electric)", boxShadow: "var(--glow-electric)" }}
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded transition-colors duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            style={{ color: "var(--text-secondary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "oklch(0.12 0.028 278 / 0.97)",
            backdropFilter: "blur(16px)",
            borderColor: "var(--void-border)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active = !link.external && isActive(link.href);
              if (link.external) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 font-data text-xs rounded"
                    style={{ color: "var(--text-secondary)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block px-3 py-2 font-data text-xs rounded cursor-pointer transition-colors duration-200"
                    style={{
                      color: active ? "var(--electric)" : "var(--text-secondary)",
                      background: active ? "oklch(0.72 0.22 255 / 0.08)" : "transparent",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
