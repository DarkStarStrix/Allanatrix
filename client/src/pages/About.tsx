// =============================================================================
// About — Origin story and identity
// Data Observatory × Cyberpunk: vertical timeline, identity card, credentials
// CSS tokens: --void-raised, --electric, --neon, --cyan, --text-primary
// =============================================================================

import { ExternalLink, Github } from "lucide-react";
import Layout from "@/components/Layout";
import { SITE, STORY_TIMELINE, STORY_NARRATIVE, GH_STATS, HF_STATS } from "@/lib/data";

export default function About() {
  return (
    <Layout>
      <div className="container py-16">
        {/* Header */}
        <header className="mb-12">
          <span className="section-label mb-4 block">Origin</span>
          <h1
            className="font-prose font-bold text-4xl mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            The{" "}
            <span className="text-glow-neon">Technomancer</span>{" "}
            of Systems
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "var(--text-secondary)" }}>
            {SITE.tagline}
          </p>
        </header>

        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-start">
          {/* ── Left: Timeline ── */}
          <div>
            <div className="flex flex-col">
              {STORY_TIMELINE.map((entry, i) => (
                <div key={entry.year} className="flex gap-5 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                  {/* Year node */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-10 h-10 rounded border flex items-center justify-center shrink-0"
                      style={{
                        borderColor: i === STORY_TIMELINE.length - 1 ? "var(--neon)" : "var(--void-border)",
                        background: i === STORY_TIMELINE.length - 1 ? "oklch(0.68 0.28 300 / 0.1)" : "var(--void-raised)",
                      }}
                    >
                      <span
                        className="font-data text-[10px] font-semibold"
                        style={{ color: i === STORY_TIMELINE.length - 1 ? "var(--neon)" : "var(--text-dim)" }}
                      >
                        {entry.year}
                      </span>
                    </div>
                    {i < STORY_TIMELINE.length - 1 && (
                      <div
                        className="w-px flex-1 my-2"
                        style={{ background: "var(--void-border)", minHeight: "2rem" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8 flex-1 min-w-0">
                    <h3
                      className="font-prose font-semibold text-base mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {entry.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {entry.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Original narrative */}
            <div className="mt-8 mb-8 flex flex-col gap-6">
              {STORY_NARRATIVE.map((section) => (
                <div key={section.id}>
                  <h4
                    className="font-data text-[10px] uppercase tracking-widest mb-2"
                    style={{ color: "var(--electric)" }}
                  >
                    {section.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href="https://github.com/DarkStarStrix"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber"
              >
                <span className="flex items-center gap-2">
                  <Github size={13} />
                  GitHub
                </span>
              </a>
              <a
                href="https://aethronlabs.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber btn-cyber-neon"
              >
                <span className="flex items-center gap-2">
                  Aethron Labs
                  <ExternalLink size={12} />
                </span>
              </a>
            </div>
          </div>

          {/* ── Right: Identity card + credentials ── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-24">
            {/* Identity card */}
            <div className="cyber-card bracket-corner p-5">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, var(--electric), transparent)" }}
              />
              <div className="font-data text-[10px] uppercase tracking-widest mb-4 mt-1" style={{ color: "var(--electric)" }}>
                Identity
              </div>
              {[
                { label: "Handle", value: "Allanatrix / DarkStarStrix" },
                { label: "Role", value: "ML Infrastructure Engineer" },
                { label: "Company", value: "Aethron Labs" },
                { label: "Focus", value: "AI4Science · Mass Spectrometry" },
                { label: "Location", value: "Washington DC" },
                { label: "Blog", value: "allanatrix.bearblog.dev" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 py-2 border-b"
                  style={{ borderColor: "var(--void-border)" }}
                >
                  <span className="font-data text-[10px] uppercase tracking-wider w-16 shrink-0 mt-0.5" style={{ color: "var(--text-dim)" }}>
                    {item.label}
                  </span>
                  <span className="font-data text-xs" style={{ color: "var(--text-secondary)" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* GitHub stats */}
            <div className="cyber-card p-5">
              <div className="font-data text-[10px] uppercase tracking-widest mb-4" style={{ color: "var(--electric)" }}>
                GitHub — DarkStarStrix
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Repos", value: GH_STATS.repos, accent: "var(--electric)" },
                  { label: "Contributions/yr", value: GH_STATS.contributions, accent: "var(--electric)" },
                  { label: "Stars", value: GH_STATS.stars, accent: "var(--cyan)" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span className="font-data text-lg font-bold" style={{ color: stat.accent }}>
                      {stat.value}
                    </span>
                    <span className="font-data text-[9px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* HuggingFace stats */}
            <div className="cyber-card cyber-card-neon p-5">
              <div className="font-data text-[10px] uppercase tracking-widest mb-4" style={{ color: "var(--neon)" }}>
                HuggingFace — Allanatrix
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Models", value: HF_STATS.models, accent: "var(--neon)" },
                  { label: "Datasets", value: HF_STATS.datasets, accent: "var(--neon)" },
                  { label: "Spaces", value: HF_STATS.spaces, accent: "var(--cyan)" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <span className="font-data text-lg font-bold" style={{ color: stat.accent }}>
                      {stat.value}
                    </span>
                    <span className="font-data text-[9px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
