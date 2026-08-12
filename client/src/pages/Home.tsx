import { ArrowUpRight, Github, Layers3, Orbit, Radio, Sparkles } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const recentWork = [
  {
    index: "01",
    kind: "MODEL",
    title: "Nexa_Mat2",
    description: "A materials-science model release with a qualified model card and evidence trail.",
    meta: "Updated 17 days ago",
    href: "https://huggingface.co/AethronPhantom/Nexa_Mat2",
    accent: "coral",
  },
  {
    index: "02",
    kind: "DATASET",
    title: "OpenSciTech-Reasoning-1M",
    description: "A million-example reasoning corpus spanning numerical methods, SciML workflows, CUDA, and scientific Python.",
    meta: "1M+ examples · CC BY 4.0",
    href: "https://huggingface.co/datasets/AethronPhantom/OpenSciTech-Reasoning-1M",
    accent: "blue",
  },
  {
    index: "03",
    kind: "DATASET",
    title: "Scientific Research Tokenized",
    description: "A 433k-row materials controller corpus built for grounded evidence cards, synthesis recipes, and structured decisions.",
    meta: "433k rows · Apache 2.0",
    href: "https://huggingface.co/datasets/AethronPhantom/Scientific_Research_Tokenized",
    accent: "yellow",
  },
  {
    index: "04",
    kind: "MODEL",
    title: "NexaMass-V3-Struct",
    description: "A compact MS/MS encoder for candidate narrowing, with honest uncertainty and benchmarked top-k retrieval.",
    meta: "14.1M params · Hit@20 0.3505",
    href: "https://huggingface.co/AethronPhantom/NexaMass-V3-Struct",
    accent: "green",
  },
];

const spaces = [
  ["SciML and AI for Science", "explainer", "https://huggingface.co/spaces/AethronPhantom"],
  ["Nexa Data Studio", "dataset generator", "https://huggingface.co/spaces/AethronPhantom/Nexa_Data_Studio"],
  ["NexaMat Crystal Viewer", "materials interface", "https://huggingface.co/spaces/AethronPhantom"],
];

function WorkCard({ item }: { item: (typeof recentWork)[number] }) {
  return (
    <a className={`research-card ${item.accent}`} href={item.href} target="_blank" rel="noreferrer">
      <div className="research-card-top">
        <span className="mono small-label">{item.index} / {item.kind}</span>
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <span className="mono card-meta">{item.meta}</span>
    </a>
  );
}

export default function Home() {
  return (
    <Layout>
      <section className="lab-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-mark" /> INDEPENDENT RESEARCH LAB · AETHRON LABS</div>
            <h1>Learning the<br /><em>structure</em> of<br />the physical world.</h1>
            <p className="hero-intro">I build scientific foundation models, datasets, and the systems around them — then test where they succeed, where they fail, and why.</p>
            <div className="hero-actions">
              <a className="ink-button" href="https://huggingface.co/AethronPhantom" target="_blank" rel="noreferrer">Explore the lab <ArrowUpRight size={16} /></a>
              <Link href="/projects"><span className="text-link">View the whole stack <span>↗</span></span></Link>
            </div>
          </div>
          <div className="hero-art" aria-label="Abstract diagram of connected scientific systems">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="core"><span>NEXA</span><strong>SCI</strong><small>systems / signal / structure</small></div>
            <div className="orbit-label label-top mono">DATA → REPRESENTATION</div>
            <div className="orbit-label label-right mono">MODEL → DECISION</div>
            <div className="orbit-label label-bottom mono">EVALUATION → LIMITS</div>
          </div>
        </div>
        <div className="container hero-foot mono"><span>01—04</span><span>SCIENTIFIC MACHINE LEARNING / SYSTEMS ENGINEERING</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>

      <section className="signal-strip">
        <div className="container signal-grid">
          <div><span className="mono signal-value">10B+</span><span className="signal-label">tokens in the<br />scientific reservoir</span></div>
          <div><span className="mono signal-value">433K</span><span className="signal-label">rows in the<br />NexaMat corpus</span></div>
          <div><span className="mono signal-value">201M</span><span className="signal-label">spectra in the<br />NexaMass campaign</span></div>
          <div><span className="mono signal-value">04</span><span className="signal-label">public research<br />interfaces</span></div>
        </div>
      </section>

      <section className="work-section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">RECENTLY RELEASED / 2026</span><h2>Research in public.</h2></div><p>Models are only one layer. The interesting work is the data, the contracts, and the evidence that makes their behavior legible.</p></div>
          <div className="research-grid">{recentWork.map((item) => <WorkCard key={item.title} item={item} />)}</div>
        </div>
      </section>

      <section className="materials-section">
        <div className="container materials-grid">
          <div className="materials-visual" aria-label="Materials research system diagram">
            <div className="material-cell cell-a">Li</div><div className="material-cell cell-b">O</div><div className="material-cell cell-c">P</div><div className="material-cell cell-d">Fe</div>
            <div className="material-line line-a" /><div className="material-line line-b" /><div className="material-line line-c" />
            <span className="mono material-caption">STRUCTURE → PROPERTY → CANDIDATE</span>
          </div>
          <div className="materials-copy"><span className="eyebrow">MATERIALS / NEXAMAT</span><h2>From crystal<br /><em>structure</em> to decision.</h2><p>NexaMat is the materials thread running through the lab: graph representations, property prediction, generative candidates, and evidence-aware controllers for battery and solid-state research.</p><div className="materials-stats"><div><strong>87K</strong><span>computed materials</span></div><div><strong>3</strong><span>model layers</span></div><div><strong>1</strong><span>crystal viewer</span></div></div><a className="text-link" href="https://huggingface.co/datasets/AethronPhantom/Materials" target="_blank" rel="noreferrer">Open the Materials dataset <span>↗</span></a></div>
        </div>
      </section>

      <section className="method-section">
        <div className="container method-grid">
          <div><span className="eyebrow">HOW I WORK</span><h2>Build vertically.<br /><em>Measure honestly.</em></h2></div>
          <div className="method-list">
            <div><Layers3 /><div><strong>Data before demos</strong><p>Deterministic pipelines and explicit provenance before a model gets a headline.</p></div></div>
            <div><Orbit /><div><strong>Systems over checkpoints</strong><p>Training, evaluation, retrieval, and infrastructure are one research surface.</p></div></div>
            <div><Radio /><div><strong>Failure is a result</strong><p>Every release should show what works, what does not, and what remains unknown.</p></div></div>
          </div>
        </div>
      </section>

      <section className="spaces-section">
        <div className="container"><div className="section-heading compact"><div><span className="eyebrow">OPEN INTERFACES</span><h2>Try the instruments.</h2></div><Sparkles size={26} /></div><div className="spaces-grid">{spaces.map(([name, type, href]) => <a key={name} href={href} target="_blank" rel="noreferrer"><span className="mono">↗ SPACE</span><strong>{name}</strong><small>{type}</small></a>)}</div></div>
      </section>

      <section className="closing-section"><div className="container closing-inner"><div><span className="eyebrow">THE NEXT EXPERIMENT</span><h2>Make the unknown<br /><em>measurable.</em></h2></div><div><p>Follow the work as it moves from raw scientific data to models, tools, and better questions.</p><a className="ink-button" href="https://github.com/DarkStarStrix" target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={16} /></a></div></div></section>
    </Layout>
  );
}
