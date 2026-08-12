import { ArrowUpRight, Layers3, Orbit, Radio, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

type WorkItem = {
  index: string;
  kind: string;
  title: string;
  description: string;
  meta: string;
  accent: string;
  detail: string;
  evidence: string;
  group: "models" | "datasets" | "systems";
  href?: string;
};

const recentWork: WorkItem[] = [
  { index: "00", kind: "SYSTEM", title: "Vecalx", description: "An experimental runtime and compiler for differentiable dynamical programs.", meta: "NO DEFINED RELEASE DATE · LNN / SNN / EBM", accent: "violet", group: "systems", detail: "Vecalx preserves the semantics of continuous, hybrid, and energy-based programs through an explicit execution runtime. The architecture includes fixed-step RK4 continuous cells, recurrent LIF spiking cells, energy models with Langevin sampling, a validated intermediate representation, reference reverse-mode autodiff, and device-aware execution paths. It is an experimental project with no defined release date.", evidence: "Vecalx architecture brief" },
  { index: "01", kind: "MODEL", title: "Nexa_Mat2", description: "A materials-science model release with a qualified model card and evidence trail.", meta: "Updated recently · materials", href: "https://huggingface.co/AethronPhantom/Nexa_Mat2", accent: "coral", group: "models", detail: "The current NexaMat line connects crystal-graph representations to property prediction, candidate generation, and evidence-aware control. The public materials surface is built around battery and solid-state research questions.", evidence: "Model card / Hugging Face" },
  { index: "02", kind: "DATASET", title: "OpenSciTech-Reasoning-1M", description: "A million-example reasoning corpus spanning numerical methods, SciML workflows, CUDA, and scientific Python.", meta: "1M+ examples · CC BY 4.0", href: "https://huggingface.co/datasets/AethronPhantom/OpenSciTech-Reasoning-1M", accent: "blue", group: "datasets", detail: "The dataset covers scientific Python debugging, numerical methods and stability, optimization reasoning, PDE workflows, CUDA/HPC troubleshooting, systems reasoning, and code explanation. It is intended as training material for scientific reasoning rather than generic chat.", evidence: "Dataset card / Hugging Face" },
  { index: "03", kind: "DATASET", title: "Scientific Research Tokenized", description: "A 433k-row materials controller corpus built for grounded evidence cards, synthesis recipes, and structured decisions.", meta: "433k rows · Apache 2.0", href: "https://huggingface.co/datasets/AethronPhantom/Scientific_Research_Tokenized", accent: "yellow", group: "datasets", detail: "The corpus contains evidence_card and synthesis_recipe tasks with structured metadata, provenance, validation notes, and a NexaMat controller context. Its purpose is to keep materials decisions tied to cited evidence and explicit follow-up requirements.", evidence: "Dataset card / Hugging Face" },
  { index: "04", kind: "MODEL", title: "NexaMass-V3-Struct", description: "A compact MS/MS encoder for candidate narrowing, with honest uncertainty and benchmarked top-k retrieval.", meta: "14.1M params · Hit@20 0.3505", href: "https://huggingface.co/AethronPhantom/NexaMass-V3-Struct", accent: "green", group: "models", detail: "The encoder maps tandem mass spectra to embeddings and 2,048-dimensional Morgan fingerprint probabilities. On the MassSpecGym test adapter it reached Hit@20 0.3505; the intended result is a ranked candidate shortlist, not an unqualified top-1 identification.", evidence: "Model card / Hugging Face" },
];

const artifactGroups = [
  ["models", "Models", "Representations built for materials and molecular signals."],
  ["datasets", "Datasets", "Structured scientific information made ready for learning."],
  ["systems", "Other artifacts", "Runtimes and research infrastructure that make the work executable."],
] as const;

const spaces = [
  ["SciML and AI for Science", "explainer", "https://huggingface.co/spaces/AethronPhantom"],
  ["Nexa Data Studio", "dataset generator", "https://huggingface.co/spaces/AethronPhantom/Nexa_Data_Studio"],
  ["NexaMat Crystal Viewer", "materials interface", "https://huggingface.co/spaces/AethronPhantom"],
];

function WorkCard({ item }: { item: WorkItem }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article className={`research-card ${item.accent}${expanded ? " expanded" : ""}`}>
      <div className="research-card-top"><span className="mono small-label">{item.index} / {item.kind}</span>{item.href && <a href={item.href} target="_blank" rel="noreferrer" aria-label={`Open ${item.title}`}><ArrowUpRight size={18} strokeWidth={1.5} /></a>}</div>
      <h3>{item.title}</h3><p>{item.description}</p><span className="mono card-meta">{item.meta}</span>
      <button className="expand-button mono" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded}>{expanded ? "Collapse evidence" : "Expand project"}<span>{expanded ? "−" : "+"}</span></button>
      {expanded && <div className="project-evidence"><p>{item.detail}</p><span className="mono">SOURCE: {item.evidence}</span>{item.href && <a href={item.href} target="_blank" rel="noreferrer">Read the public card <ArrowUpRight size={13} /></a>}</div>}
    </article>
  );
}

function MaterialsGraphic() {
  return <div className="materials-visual materials-atom-visual" aria-label="Unlabelled atom diagram"><div className="material-atom" aria-hidden="true"><div className="material-shell material-shell-outer"><i /><i /><i /><i /><i /><i /></div><div className="material-shell material-shell-middle"><i /><i /><i /><i /></div><div className="material-shell material-shell-inner"><i /><i /></div><div className="material-nucleus">{Array.from({ length: 11 }, (_, index) => <b key={index} />)}</div></div></div>;
}

function MassSpecGraphic() {
  const peaks = [18, 35, 62, 28, 84, 44, 70, 32, 92, 50, 68, 24, 78, 40, 58, 30, 73, 46, 88, 35, 65, 21, 55, 38];
  return <div className="mass-visual" aria-label="Mass spectrometry representation diagram"><div className="mass-grid-lines" /> <div className="spectrum-bars">{peaks.map((height, index) => <span key={index} style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }} />)}</div><div className="mass-wave wave-one" /><div className="mass-wave wave-two" /><span className="mono mass-caption">PEAKS → EMBEDDING → CANDIDATES</span></div>;
}

function PillarCarousel() {
  const [active, setActive] = useState(0);
  const isMaterials = active === 0;
  return <section className="pillar-carousel" id="materials"><span id="mass-spec" className="pillar-carousel-anchor" aria-hidden="true" /><div className="container"><div className="pillar-carousel-top"><div><span className="eyebrow">TWO PROVING DOMAINS</span><span className="mono pillar-index">0{active + 1} / 02</span></div><div className="pillar-controls"><button onClick={() => setActive((value) => (value + 1) % 2)} aria-label="Previous research domain">←</button><button onClick={() => setActive((value) => (value + 1) % 2)} aria-label="Next research domain">→</button></div></div><div className="pillar-slide">{isMaterials ? <div className="pillar-slide-grid"><MaterialsGraphic /><div className="pillar-copy"><span className="eyebrow">MATERIALS / NEXAMAT</span><h2>From crystal<br /><em>structure</em> to decision.</h2><p>NexaMat connects crystal representations to property prediction, candidate generation, and evidence-aware validation for battery and solid-state research.</p><div className="materials-stats"><div><strong>87K</strong><span>computed materials</span></div><div><strong>3</strong><span>model layers</span></div><div><strong>1</strong><span>crystal viewer</span></div></div><a className="text-link" href="https://huggingface.co/datasets/AethronPhantom/Materials" target="_blank" rel="noreferrer">Open Materials dataset <ArrowUpRight size={14} /></a></div></div> : <div className="pillar-slide-grid mass-slide-grid"><div className="pillar-copy"><span className="eyebrow">MASS SPECTROMETRY / NEXAMASS</span><h2>From signal<br /><em>to shortlist.</em></h2><p>NexaMass-V3-Struct is a compact spectral encoder for structure-aware representation learning. It narrows a candidate bank and exposes uncertainty instead of pretending to solve molecular identification in one step.</p><div className="materials-stats"><div><strong>201M</strong><span>phase-1 spectra</span></div><div><strong>14.1M</strong><span>trainable params</span></div><div><strong>.3505</strong><span>test Hit@20</span></div></div><a className="text-link" href="https://huggingface.co/AethronPhantom/NexaMass-V3-Struct" target="_blank" rel="noreferrer">Read model card <ArrowUpRight size={14} /></a></div><MassSpecGraphic /></div>}</div></div></section>;
}

export default function Home() {
  return <Layout>
    <section className="lab-hero"><div className="container hero-grid"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-mark" /> INDEPENDENT RESEARCH LAB · AETHRON LABS</div><h1>Learning the<br /><em>structure</em> of<br />the physical world.</h1><p className="hero-intro">I build scientific foundation models, datasets, and the systems around them — then test where they succeed, where they fail, and why.</p><div className="hero-actions"><a className="ink-button" href="https://huggingface.co/AethronPhantom" target="_blank" rel="noreferrer">Explore the lab <ArrowUpRight size={16} /></a><Link href="/projects"><span className="text-link">View the whole stack <span>↗</span></span></Link></div></div><div className="hero-art" aria-label="Atomic model of the scientific research system"><div className="solar-system"><div className="solar-orbit solar-orbit-one"><div className="solar-orbiter"><span className="solar-planet planet-blue"><span className="planet-label"><span>DATA → REPRESENTATION</span></span></span></div></div><div className="solar-orbit solar-orbit-two"><div className="solar-orbiter"><span className="solar-planet planet-coral"><span className="planet-label"><span>MODEL → DECISION</span></span></span></div></div><div className="solar-orbit solar-orbit-three"><div className="solar-orbiter"><span className="solar-planet planet-cyan"><span className="planet-label"><span>EVALUATION → LIMITS</span></span></span></div></div><div className="solar-core"><span>NEXA</span><strong>SCI</strong><small>systems / signal / structure</small></div></div></div></div><div className="container hero-foot mono"><span>01—04</span><span>SCIENTIFIC MACHINE LEARNING / SYSTEMS ENGINEERING</span><span>SCROLL TO EXPLORE ↓</span></div></section>

    <section className="signal-strip"><div className="container signal-grid"><div><span className="mono signal-value">10B+</span><span className="signal-label">tokens in the<br />scientific reservoir</span></div><div><span className="mono signal-value">433K</span><span className="signal-label">rows in the<br />NexaMat corpus</span></div><div><span className="mono signal-value">201M</span><span className="signal-label">spectra in the<br />NexaMass campaign</span></div><div><span className="mono signal-value">04</span><span className="signal-label">public research<br />interfaces</span></div></div></section>

    <section className="work-section" id="projects"><div className="container"><div className="section-heading"><div><span className="eyebrow">SELECTED ARTIFACTS / 2026</span><h2>The work that<br /><em>carries the thesis.</em></h2></div><p>Organized by what each artifact contributes: models, datasets, and the systems that make scientific work executable.</p></div><div className="artifact-groups">{artifactGroups.map(([key, title, description]) => <section className="artifact-group" key={key}><div className="artifact-group-heading"><div><span className="mono">{title.toUpperCase()}</span><p>{description}</p></div><span className="mono">{recentWork.filter((item) => item.group === key).length.toString().padStart(2, "0")}</span></div><div className="research-grid">{recentWork.filter((item) => item.group === key).map((item) => <WorkCard key={item.title} item={item} />)}</div></section>)}</div></div></section>

    <PillarCarousel />

    <section className="method-section"><div className="container method-grid"><div><span className="eyebrow">HOW I WORK</span><h2>Build vertically.<br /><em>Measure honestly.</em></h2></div><div className="method-list"><div><Layers3 /><div><strong>Data before demos</strong><p>Deterministic pipelines and explicit provenance before a model gets a headline.</p></div></div><div><Orbit /><div><strong>Systems over checkpoints</strong><p>Training, evaluation, retrieval, and infrastructure are one research surface.</p></div></div><div><Radio /><div><strong>Failure is a result</strong><p>Every release should show what works, what does not, and what remains unknown.</p></div></div></div></div></section>

    <section className="spaces-section"><div className="container"><div className="section-heading compact"><div><span className="eyebrow">OPEN INTERFACES</span><h2>Try the instruments.</h2></div><Sparkles size={26} /></div><div className="spaces-grid">{spaces.map(([name, type, href]) => <a key={name} href={href} target="_blank" rel="noreferrer"><span className="mono">↗ SPACE</span><strong>{name}</strong><small>{type}</small></a>)}</div></div></section>

    <section className="closing-section"><div className="container closing-inner"><div><span className="eyebrow">THE NEXT EXPERIMENT</span><h2>Make the unknown<br /><em>measurable.</em></h2></div><div><p>Follow the work as it moves from raw scientific data to models, tools, and better questions.</p></div></div></section>
  </Layout>;
}
