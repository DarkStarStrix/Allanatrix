// =============================================================================
// Skills — Cyberpunk data observatory
// Data Observatory × Cyberpunk: skill bars, tag cloud, category grid
// =============================================================================

import { useState } from "react";
import Layout from "@/components/Layout";
import { SKILL_CATEGORIES } from "@/lib/data";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const displayed = activeCategory
    ? SKILL_CATEGORIES.filter((c) => c.id === activeCategory)
    : SKILL_CATEGORIES;

  return <Layout compact><main className="tools-page"><div className="container tools-shell"><header className="tools-intro"><span className="eyebrow">TECHNICAL STACK</span><h1>Tools &amp; <em>technology.</em></h1><p>Languages, frameworks, GPU tooling, data systems, and infrastructure used to build the lab’s research stack.</p></header><div className="tools-filter"><button className={activeCategory === null ? "active" : ""} aria-pressed={activeCategory === null} onClick={() => setActiveCategory(null)}>All tools</button>{SKILL_CATEGORIES.map((category) => <button key={category.id} className={activeCategory === category.id ? "active" : ""} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}>{category.label}</button>)}</div><div className={`tools-grid${activeCategory ? " filtered" : ""}`}>{displayed.map((category) => <section className="tool-group" key={category.id}><div className="tool-group-heading"><span className="mono">{category.label}</span><i /></div><div className="tool-list">{category.skills.map((skill) => <span className="tool-chip" key={skill.name}>{skill.name}</span>)}</div></section>)}</div></div></main></Layout>;
}
