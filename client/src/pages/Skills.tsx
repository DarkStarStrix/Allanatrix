// =============================================================================
// Skills — Cyberpunk data observatory
// Data Observatory × Cyberpunk: skill bars, tag cloud, category grid
// =============================================================================

import { useState } from "react";
import Layout from "@/components/Layout";
import { SKILL_CATEGORIES } from "@/lib/data";

function SkillBar({ name, level }: { name: string; level: number }) {
  const barColor =
    level >= 85 ? "var(--electric)" : level >= 70 ? "var(--neon)" : "var(--cyan)";
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-data text-xs" style={{ color: "var(--text-primary)" }}>
          {name}
        </span>
        <span className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
          {level}%
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${level}%`,
            background: `linear-gradient(90deg, ${barColor}, ${barColor}cc)`,
            boxShadow: `0 0 8px ${barColor}66`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const displayed = activeCategory
    ? SKILL_CATEGORIES.filter((c) => c.id === activeCategory)
    : SKILL_CATEGORIES;

  return (
    <Layout>
      <div className="container py-16">
        <header className="mb-12">
          <span className="section-label mb-4 block">Technical Proficiency</span>
          <h1
            className="font-prose font-bold text-4xl mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Skills &amp; <span className="text-glow-neon">Stack</span>
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Building across the full ML stack — from CUDA kernels to foundation model
            training, compiler toolchains to scientific datasets.
          </p>
        </header>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className="font-data text-[11px] px-3 py-1.5 rounded border transition-all duration-200"
            style={{
              color: activeCategory === null ? "oklch(0.08 0.02 280)" : "var(--text-secondary)",
              borderColor: activeCategory === null ? "var(--electric)" : "var(--void-border)",
              background: activeCategory === null ? "var(--electric)" : "transparent",
              boxShadow: activeCategory === null ? "var(--glow-electric)" : "none",
            }}
          >
            All
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className="font-data text-[11px] px-3 py-1.5 rounded border transition-all duration-200"
              style={{
                color: activeCategory === cat.id ? "oklch(0.08 0.02 280)" : "var(--text-secondary)",
                borderColor: activeCategory === cat.id ? "var(--neon)" : "var(--void-border)",
                background: activeCategory === cat.id ? "var(--neon)" : "transparent",
                boxShadow: activeCategory === cat.id ? "var(--glow-neon)" : "none",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayed.map((category) => (
            <div key={category.id} className="cyber-card p-5 bracket-corner">
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="font-data text-[10px] uppercase tracking-widest"
                  style={{ color: "var(--electric)" }}
                >
                  {category.label}
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--void-border)" }} />
                <span className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
                  {category.skills.length}
                </span>
              </div>
              {category.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div className="mt-16">
          <div className="divider-label mb-8">All Technologies</div>
          <div className="flex flex-wrap gap-2">
            {SKILL_CATEGORIES.flatMap((cat) =>
              cat.skills.map((skill) => ({ name: skill.name, level: skill.level }))
            )
              .sort((a, b) => b.level - a.level)
              .map((skill) => {
                const size =
                  skill.level >= 90 ? "text-sm" : skill.level >= 75 ? "text-xs" : "text-[11px]";
                const color =
                  skill.level >= 85
                    ? "var(--electric)"
                    : skill.level >= 70
                    ? "var(--neon)"
                    : "var(--text-secondary)";
                return (
                  <span
                    key={skill.name}
                    className={`font-data ${size} px-2 py-1 rounded border`}
                    style={{
                      color,
                      borderColor: `${color}44`,
                      background: `${color}0a`,
                    }}
                  >
                    {skill.name}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
