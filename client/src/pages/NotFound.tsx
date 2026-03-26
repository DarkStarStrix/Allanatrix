// =============================================================================
// NotFound — 404 page
// Data Observatory × Cyberpunk: void ground, electric accent, IBM Plex Mono
// =============================================================================

import { useLocation } from "wouter";
import Layout from "@/components/Layout";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="container py-32 flex flex-col items-center justify-center text-center gap-8">
        {/* Glitchy 404 */}
        <div className="relative inline-block">
          <span
            className="font-data font-bold select-none"
            style={{
              fontSize: "clamp(6rem, 20vw, 12rem)",
              color: "var(--void-border)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            404
          </span>
          <span
            className="font-data font-bold absolute inset-0 flex items-center justify-center animate-flicker"
            style={{
              fontSize: "clamp(6rem, 20vw, 12rem)",
              color: "var(--electric)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              textShadow: "var(--glow-electric)",
              clipPath: "inset(30% 0 50% 0)",
              transform: "translateX(4px)",
            }}
          >
            404
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-prose font-bold text-xl" style={{ color: "var(--text-primary)" }}>
            Page not found
          </h1>
          <p className="font-data text-xs" style={{ color: "var(--text-secondary)" }}>
            The route you requested does not exist in this system.
          </p>
        </div>

        <button
          className="btn-cyber"
          onClick={() => setLocation("/")}
        >
          <span>Return Home</span>
        </button>
      </div>
    </Layout>
  );
}
