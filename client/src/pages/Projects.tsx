// =============================================================================
// Projects — Active work + archived systems
// Data Observatory × Cyberpunk: dense project cards, progress timeline
// CSS tokens: --void-raised, --electric, --neon, --cyan, --text-primary
// =============================================================================

import { ArrowRight, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";
import { CURRENT_PROJECTS, ARCHIVED_PROJECTS, type ProgressNode } from "@/lib/data";

const NEXAMOL_SPECTRUM_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663288203906/L2Xrod7JwZpu454UeVMAz9/nexamol-spectrum_37678466.png";

// ── Progress timeline ─────────────────────────────────────────────────────────
function ProgressTimeline({ nodes }: { nodes: ProgressNode[] }) {
  return (
    <div
      className="mt-4 p-4 rounded border"
      style={{ background: "oklch(0.08 0.020 280)", borderColor: "var(--void-border)" }}
    >
      <div className="flex flex-col gap-2">
        {nodes.map((node) => {
          const color =
            node.status === "complete"
              ? "var(--green-signal)"
              : node.status === "active"
              ? "var(--electric)"
              : node.status === "next"
              ? "var(--cyan)"
              : "var(--text-dim)";
          const icon =
            node.status === "complete" ? "✓" : node.status === "active" ? "●" : node.status === "next" ? "◎" : "○";
          return (
            <div key={node.id} className="flex items-start gap-3">
              <span className="font-data text-xs shrink-0 w-4 text-center mt-0.5" style={{ color }}>
                {icon}
              </span>
              <div className="flex-1 min-w-0">
                <span
                  className="font-data text-xs"
                  style={{ color: node.status === "active" ? "var(--text-primary)" : "var(--text-secondary)" }}
                >
                  {node.label}
                </span>
                {node.note && (
                  <span className="font-data text-[10px] ml-2" style={{ color: "var(--text-dim)" }}>
                    — {node.note}
                  </span>
                )}
              </div>
              {node.status === "active" && (
                <span className="status-badge status-active shrink-0">Active</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <Layout>
      <div className="container py-16">
        {/* Header */}
        <header className="mb-12">
          <span className="section-label mb-4 block">Worklog</span>
          <h1
            className="font-prose font-bold text-4xl mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Active Systems &amp;{" "}
            <span className="text-glow-electric">Archived Infrastructure</span>
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Two active projects in production today — NexaMol and PyC — followed by the
            archived models and datasets that built toward them.
          </p>
        </header>

        {/* ── ACTIVE PROJECTS ──────────────────────────────────────────────── */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--green-signal)" }} />
            <h2 className="font-data text-xs uppercase tracking-widest" style={{ color: "var(--green-signal)" }}>
              Active — In Progress
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            {CURRENT_PROJECTS.map((project, i) => {
              const accentColor = i === 0 ? "var(--neon)" : "var(--electric)";
              const isNexaMol = project.id === "nexamol";

              return (
                <article
                  key={project.id}
                  className="cyber-card overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
                  />

                  {/* NexaMol: full-width spectrum image */}
                  {isNexaMol && (
                    <div className="relative overflow-hidden" style={{ maxHeight: "260px" }}>
                      <img
                        src={NEXAMOL_SPECTRUM_URL}
                        alt="NexaMol — Mass Spectrometry ML Pipeline"
                        style={{ width: "100%", display: "block", objectFit: "cover" }}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(to bottom, transparent 40%, var(--void-raised) 100%)",
                        }}
                      />
                      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between">
                        <div>
                          <div className="font-data text-[10px] uppercase tracking-widest" style={{ color: accentColor }}>
                            NexaMol — MS/MS Prediction Pipeline
                          </div>
                          <div className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
                            GeMS v1 corpus · 579 GiB · 6.03M spectra
                          </div>
                        </div>
                        <span className="status-badge status-training">Training</span>
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3
                          className="font-prose font-bold text-xl mb-0.5"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {project.title}
                        </h3>
                        <p className="font-data text-xs" style={{ color: "var(--text-dim)" }}>
                          {project.subtitle}
                          {project.company && (
                            <span style={{ color: accentColor }}> · {project.company}</span>
                          )}
                        </p>
                      </div>
                      <span
                        className="font-data text-[10px] px-2 py-1 rounded border shrink-0"
                        style={{ color: accentColor, borderColor: `${accentColor}44`, background: `${accentColor}10` }}
                      >
                        {project.stage}
                      </span>
                    </div>

                    {/* Content grid */}
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      <div>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
                          {project.description}
                        </p>
                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-3">
                          {project.metrics.map((m) => (
                            <div
                              key={m.label}
                              className="p-3 rounded border"
                              style={{ borderColor: "var(--void-border)", background: "oklch(0.08 0.020 280)" }}
                            >
                              <div className="font-data text-sm font-semibold" style={{ color: accentColor }}>
                                {m.value}
                              </div>
                              <div className="font-data text-[9px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        {/* Highlights */}
                        <ul className="flex flex-col gap-2 mb-4">
                          {project.highlights.map((h, j) => (
                            <li key={j} className="flex gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                              <span className="font-data shrink-0 mt-0.5" style={{ color: accentColor }}>▸</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                        {/* Stack */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.stack.map((s) => (
                            <span
                              key={s}
                              className="font-data text-[10px] px-2 py-0.5 rounded border"
                              style={{ color: "var(--text-secondary)", borderColor: "var(--void-border)" }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <ProgressTimeline nodes={project.progress} />

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {project.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded border font-data text-xs transition-all duration-200"
                          style={{ color: accentColor, borderColor: `${accentColor}44` }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accentColor;
                            e.currentTarget.style.boxShadow = i === 0 ? "var(--glow-neon)" : "var(--glow-electric)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = `${accentColor}44`;
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <ExternalLink size={12} />
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── ARCHIVED SYSTEMS ─────────────────────────────────────────────── */}
        <div className="divider-label mb-8">Archived Systems</div>

        <section>
          <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
            Past models, datasets, and infrastructure that remain available on HuggingFace and
            GitHub but are no longer actively maintained.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ARCHIVED_PROJECTS.map((project, i) => (
              <article
                key={project.id}
                className="cyber-card p-4 animate-fade-in"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-data text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>
                  <span
                    className="font-data text-[9px] px-1.5 py-0.5 rounded border shrink-0"
                    style={{ color: "var(--text-dim)", borderColor: "var(--void-border)" }}
                  >
                    {project.year}
                  </span>
                </div>
                <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="font-data text-[9px] px-1.5 py-0.5 rounded border"
                      style={{ color: "var(--text-dim)", borderColor: "var(--void-border)" }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-data text-[10px] transition-colors duration-200"
                    style={{ color: "var(--text-dim)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
                  >
                    View <ArrowRight size={10} />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
