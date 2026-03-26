// =============================================================================
// Home — Landing page
// Data Observatory × Cyberpunk: asymmetric hero, NexaMol spectrum image,
// scan-line overlay, metric count-ups, project cards, Aethron Labs section
// CSS tokens: --void, --electric, --neon, --cyan, --text-primary, --text-secondary
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Github, ExternalLink, ArrowRight, Mail } from "lucide-react";
import Layout from "@/components/Layout";
import { SITE, CURRENT_PROJECTS, GH_STATS, HF_STATS } from "@/lib/data";

const NEXAMOL_SPECTRUM_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663288203906/L2Xrod7JwZpu454UeVMAz9/nexamol-spectrum_37678466.png";
const BLUEPRINT_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663288203906/L2Xrod7JwZpu454UeVMAz9/hero-ml-blueprint_93f90089.png";

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ── Metric card ───────────────────────────────────────────────────────────────
function MetricCard({
  value,
  label,
  suffix = "",
  delay = 0,
  started,
  accent = "var(--electric)",
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
  started: boolean;
  accent?: string;
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(value, 1400, active);

  return (
    <div className="flex flex-col gap-1">
      <span
        className="font-data font-semibold"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: accent, lineHeight: 1 }}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <span
        className="font-data text-[10px] uppercase tracking-widest"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Social pill ───────────────────────────────────────────────────────────────
function SocialPill({ href, label, icon }: { href: string; label: string; icon: string }) {
  const iconEl = (() => {
    switch (icon) {
      case "github":
        return <Github size={13} />;
      case "x":
        return (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "huggingface":
        return (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 6.5a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm-1.5 4c-2.21 0-4 1.343-4 3h8c0-1.657-1.79-3-4-3z" />
          </svg>
        );
      case "linkedin":
        return (
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
          </svg>
        );
      case "mail":
        return <Mail size={13} />;
      default:
        return <ExternalLink size={13} />;
    }
  })();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border font-data text-xs transition-all duration-200"
      style={{ color: "var(--text-secondary)", borderColor: "var(--void-border)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--electric)";
        e.currentTarget.style.borderColor = "oklch(0.72 0.22 255 / 0.5)";
        e.currentTarget.style.boxShadow = "var(--glow-electric)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-secondary)";
        e.currentTarget.style.borderColor = "var(--void-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {iconEl}
      {label}
    </a>
  );
}

// ── Project card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof CURRENT_PROJECTS)[number];
  index: number;
}) {
  const accentColor = index === 0 ? "var(--neon)" : "var(--electric)";

  return (
    <article
      className="cyber-card bracket-corner p-5 flex flex-col gap-3 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mt-1">
        <div>
          <h3
            className="font-prose font-bold text-base leading-tight mb-0.5"
            style={{ color: "var(--text-primary)" }}
          >
            {project.title}
          </h3>
          <p className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
            {project.subtitle}
          </p>
        </div>
        <span
          className="status-badge status-active shrink-0 mt-0.5"
          style={{ color: accentColor, borderColor: `${accentColor}44`, background: `${accentColor}10` }}
        >
          {project.stage}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      {/* Metrics row */}
      <div className="grid grid-cols-4 gap-2 py-3 border-y" style={{ borderColor: "var(--void-border)" }}>
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-0.5">
            <span className="font-data text-sm font-semibold" style={{ color: accentColor }}>
              {m.value}
            </span>
            <span className="font-data text-[9px] uppercase tracking-wider" style={{ color: "var(--text-dim)" }}>
              {m.label}
            </span>
          </div>
        ))}
      </div>

      {/* Progress nodes */}
      <div className="flex flex-col gap-1.5">
        {project.progress.map((node) => {
          const nodeColor =
            node.status === "complete"
              ? "var(--green-signal)"
              : node.status === "active"
              ? accentColor
              : node.status === "next"
              ? "var(--cyan)"
              : "var(--text-dim)";
          return (
            <div key={node.id} className="flex items-center gap-2">
              <span style={{ color: nodeColor, fontSize: "0.6rem" }}>
                {node.status === "complete" ? "✓" : node.status === "active" ? "●" : node.status === "next" ? "◎" : "○"}
              </span>
              <span className="font-data text-[11px]" style={{ color: node.status === "active" ? "var(--text-primary)" : "var(--text-secondary)" }}>
                {node.label}
              </span>
              {node.note && (
                <span className="font-data text-[10px] ml-auto" style={{ color: "var(--text-dim)" }}>
                  {node.note}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Stack tags */}
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

      {/* Links */}
      <div className="flex gap-3 mt-auto pt-1">
        {project.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-data text-xs transition-colors duration-200"
            style={{ color: accentColor }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
            <ArrowRight size={11} />
          </a>
        ))}
      </div>
    </article>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsStarted, setMetricsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMetricsStarted(true); },
      { threshold: 0.3 }
    );
    if (metricsRef.current) observer.observe(metricsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "calc(100vh - 4rem)",
          borderBottom: "1px solid var(--void-border)",
        }}
      >
        <div className="container relative z-10 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[48%_52%] gap-12 lg:gap-16 items-center">

            {/* ── Left column ── */}
            <div className="flex flex-col gap-7 animate-fade-in">
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <div className="h-px w-8" style={{ background: "var(--electric)", boxShadow: "var(--glow-electric)" }} />
                <span className="font-data text-[11px] uppercase tracking-widest" style={{ color: "var(--electric)" }}>
                  ML Infrastructure Engineer
                </span>
              </div>

              {/* Headline */}
              <h1
                className="font-prose font-bold leading-tight"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Building{" "}
                <span className="text-glow-neon">foundation models</span>{" "}
                for scientific data interpretation.
              </h1>

              {/* Description */}
              <p className="text-base leading-relaxed max-w-md" style={{ color: "var(--text-secondary)" }}>
                {SITE.description}
              </p>

              {/* Company badge */}
              <a
                href="https://aethronlabs.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-3 rounded border w-fit transition-all duration-200"
                style={{
                  borderColor: "oklch(0.68 0.28 300 / 0.4)",
                  background: "oklch(0.68 0.28 300 / 0.06)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--neon)";
                  e.currentTarget.style.boxShadow = "var(--glow-neon)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "oklch(0.68 0.28 300 / 0.4)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon)" }} />
                <div>
                  <div className="font-data text-xs font-semibold" style={{ color: "var(--neon)" }}>
                    Aethron Labs
                  </div>
                  <div className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
                    Pre-Seed · Active Development
                  </div>
                </div>
                <ExternalLink size={12} style={{ color: "var(--text-dim)" }} />
              </a>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href="/projects">
                  <button className="btn-cyber">
                    <span>View Projects</span>
                  </button>
                </Link>
                <a
                  href="https://github.com/DarkStarStrix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber btn-cyber-neon"
                >
                  <span className="flex items-center gap-2">
                    <Github size={13} />
                    GitHub
                  </span>
                </a>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-2">
                <SocialPill href="https://github.com/DarkStarStrix" label="GitHub" icon="github" />
                <SocialPill href="https://huggingface.co/Allanatrix" label="HuggingFace" icon="huggingface" />
                <SocialPill href="https://x.com/AllanatrixQ" label="@AllanatrixQ" icon="x" />
                <SocialPill href={`mailto:${SITE.email}`} label={SITE.email} icon="mail" />
              </div>
            </div>

            {/* ── Right column: NexaMol spectrum image ── */}
            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              {/* Spectrum display */}
              <div className="spectrum-display" style={{ boxShadow: "var(--glow-electric)" }}>
                <img
                  src={NEXAMOL_SPECTRUM_URL}
                  alt="NexaMol — Mass Spectrometry ML Pipeline"
                  style={{ width: "100%", display: "block", borderRadius: "var(--radius)" }}
                />
              </div>

              {/* Floating label */}
              <div
                className="absolute bottom-4 left-4 right-4 flex items-center justify-between px-3 py-2 rounded"
                style={{
                  background: "oklch(0.07 0.020 280 / 0.9)",
                  border: "1px solid var(--void-border)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div>
                  <div className="font-data text-[10px] uppercase tracking-widest" style={{ color: "var(--electric)" }}>
                    NexaMol — MS/MS Pipeline
                  </div>
                  <div className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
                    GeMS v1 corpus · 579 GiB · 6.03M spectra
                  </div>
                </div>
                <span className="status-badge status-training">Training</span>
              </div>
            </div>
          </div>
        </div>

        {/* Blueprint background (subtle) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${BLUEPRINT_URL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.03,
          }}
        />
      </section>

      {/* ── METRICS ──────────────────────────────────────────────────────────── */}
      <section
        ref={metricsRef}
        className="border-b"
        style={{ borderColor: "var(--void-border)" }}
      >
        <div className="container py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            <MetricCard value={GH_STATS.repos} label="Repos" delay={0} started={metricsStarted} accent="var(--electric)" />
            <MetricCard value={GH_STATS.contributions} label="Contributions/yr" delay={100} started={metricsStarted} accent="var(--electric)" />
            <MetricCard value={GH_STATS.stars} label="PyC Stars" delay={200} started={metricsStarted} accent="var(--electric)" />
            <MetricCard value={HF_STATS.models} label="HF Models" delay={300} started={metricsStarted} accent="var(--neon)" />
            <MetricCard value={HF_STATS.datasets} label="HF Datasets" delay={400} started={metricsStarted} accent="var(--neon)" />
            <MetricCard value={HF_STATS.spaces} label="HF Spaces" delay={500} started={metricsStarted} accent="var(--neon)" />
          </div>
        </div>
      </section>

      {/* ── ACTIVE PROJECTS ──────────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: "var(--void-border)" }}>
        <div className="container py-16">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="section-label mb-3 block">Active Focus</span>
              <h2
                className="font-prose font-bold text-2xl"
                style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
              >
                Current Projects
              </h2>
            </div>
            <Link href="/projects">
              <button
                className="font-data text-xs flex items-center gap-1 transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--electric)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                All projects <ArrowRight size={12} />
              </button>
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {CURRENT_PROJECTS.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>



      {/* ── TERMINAL CTA ─────────────────────────────────────────────────────── */}
      <section>
        <div className="container py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-data text-sm" style={{ color: "var(--text-secondary)" }}>
                Want the full picture?
              </p>
              <p className="font-data text-xs" style={{ color: "var(--text-dim)" }}>
                Run <span style={{ color: "var(--electric)" }}>status</span> or{" "}
                <span style={{ color: "var(--neon)" }}>nexamol</span> in the terminal.
              </p>
            </div>
            <Link href="/terminal">
              <button className="btn-cyber">
                <span className="flex items-center gap-2">
                  Open Terminal
                  <ArrowRight size={12} />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
