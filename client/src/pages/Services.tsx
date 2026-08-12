import { ArrowUpRight, Beaker, Database, Layers3, Orbit, Route } from "lucide-react";
import Layout from "@/components/Layout";

const researchTracks = [
  {
    number: "01",
    title: "Cross-domain representations",
    body: "Compare what makes a useful scientific representation across structurally different modalities, beginning with mass spectrometry and materials science.",
    icon: Orbit,
  },
  {
    number: "02",
    title: "Minimum sufficient models",
    body: "Find the smallest representation that preserves scientifically consequential information, while measuring capability, cost, transfer, and failure.",
    icon: Layers3,
  },
  {
    number: "03",
    title: "Expert iteration systems",
    body: "Connect data, models, evidence, tools, and uncertainty so experts can move from observation to a better next decision without giving up judgment.",
    icon: Route,
  },
];

const buildingBlocks = [
  ["Information", "Select, normalize, deduplicate, and preserve the signal that a scientific task actually needs."],
  ["Representation", "Encode structure efficiently through objectives, inductive bias, compression, and model design."],
  ["Fidelity", "Test what survives external evaluation, distribution shift, uncertainty, and real scientific constraints."],
  ["Transfer", "Separate principles that generalize across domains from tricks that only work once."],
];

const artifactGroups = [
  {
    label: "DATASETS",
    title: "Structured information",
    icon: Database,
    items: [
      ["OpenSciTech-Reasoning-1M", "Scientific reasoning examples spanning numerical methods, SciML workflows, CUDA, and scientific Python.", "1M+ examples · CC BY 4.0", "https://huggingface.co/datasets/AethronPhantom/OpenSciTech-Reasoning-1M"],
      ["Scientific Research Tokenized", "Grounded materials evidence cards, synthesis recipes, and structured decisions.", "433K rows · Apache 2.0", "https://huggingface.co/datasets/AethronPhantom/Scientific_Research_Tokenized"],
      ["Materials", "Crystal structures and property data supporting the NexaMat research line.", "Materials corpus · Hugging Face", "https://huggingface.co/datasets/AethronPhantom/Materials"],
    ],
  },
  {
    label: "MODELS",
    title: "Learned representations",
    icon: Beaker,
    items: [
      ["Nexa_Mat2", "A materials model release connecting crystal structure, property prediction, candidate generation, and evidence.", "Model card · current release", "https://huggingface.co/AethronPhantom/Nexa_Mat2"],
      ["NexaMass-V3-Struct", "An archived MS/MS encoder for candidate narrowing, structure-aware embeddings, and honest uncertainty.", "14.1M params · Hit@20 0.3505", "https://huggingface.co/AethronPhantom/NexaMass-V3-Struct"],
    ],
  },
  {
    label: "SYSTEMS / EXPERIMENTS",
    title: "Executable research",
    icon: Orbit,
    items: [
      ["Vecalx", "An experimental runtime and compiler for continuous, hybrid, and energy-based programs. No defined release date.", "LNN · SNN · EBM · experimental", "https://github.com/DarkStarStrix"],
      ["Nexa_Compute + PyC", "The internal training, evaluation, inference, compiler, and HPC layers that make the public artifacts possible.", "ML monorepo · internal toolchain", "https://github.com/DarkStarStrix"],
    ],
  },
  {
    label: "INTERFACES",
    title: "Ways into the work",
    icon: Route,
    items: [
      ["SciML and AI for Science", "An explainer for the scientific ML problems and methods behind the lab.", "Hugging Face Space", "https://huggingface.co/spaces/AethronPhantom"],
      ["Nexa Data Studio", "A dataset-generation interface for turning research material into structured training data.", "Hugging Face Space", "https://huggingface.co/spaces/AethronPhantom/Nexa_Data_Studio"],
      ["NexaMat Crystal Viewer", "A visual interface for exploring the materials representation thread.", "Hugging Face Space", "https://huggingface.co/spaces/AethronPhantom"],
    ],
  },
];

function ArtifactCard({ item }: { item: string[] }) {
  const [title, body, meta, href] = item;
  return <a className="lab-artifact-card" href={href} target="_blank" rel="noreferrer"><div><h3>{title}</h3><ArrowUpRight size={17} /></div><p>{body}</p><span className="mono">{meta}</span></a>;
}

export default function Lab() {
  return <Layout><main className="lab-page"><section className="container lab-intro"><div><span className="eyebrow">LAB / RESEARCH PROGRAM</span><h1>Computational representations<br /><em>of the natural world.</em></h1></div><p>Aetheron Labs builds scientific datasets, compact models, evaluation systems, and research infrastructure that make expert scientific iteration more informed and more efficient.</p></section><section className="lab-thesis"><div className="container"><span className="eyebrow">THE PROGRAM</span><p>Scientific progress depends on how information is observed, represented, tested, and acted on. The lab studies which information matters, how to encode it faithfully, what can transfer across domains, and how computation can help experts decide what to do next.</p></div></section><section className="container lab-tracks"><div className="lab-section-heading"><div><span className="eyebrow">THREE CONNECTED QUESTIONS</span><h2>Build the representation.<br /><em>Test the consequences.</em></h2></div><p>The lab is organized as one research program rather than a collection of disconnected demos.</p></div><div className="lab-track-grid">{researchTracks.map(({ number, title, body, icon: Icon }) => <article className="lab-track-card" key={number}><div><span className="mono">{number}</span><Icon size={21} /></div><h3>{title}</h3><p>{body}</p></article>)}</div></section><section className="container lab-blocks"><div className="lab-section-heading compact"><div><span className="eyebrow">BUILDING BLOCKS</span><h2>From raw signal<br /><em>to useful judgment.</em></h2></div></div><div className="lab-block-grid">{buildingBlocks.map(([title, body]) => <article key={title}><span className="mono">{title}</span><p>{body}</p></article>)}</div></section><section className="container lab-materials"><div className="lab-section-heading compact"><div><span className="eyebrow">PUBLIC LAB MATERIALS</span><h2>The artifacts<br /><em>behind the thesis.</em></h2></div><p>Selected public datasets, models, and systems. Each one is a different layer of the same research question.</p></div><div className="lab-artifact-groups">{artifactGroups.map(({ label, title, icon: Icon, items }) => <section className="lab-artifact-group" key={label}><div className="lab-artifact-heading"><Icon size={19} /><div><span className="mono">{label}</span><h3>{title}</h3></div></div><div className="lab-artifact-grid">{items.map((item) => <ArtifactCard item={item} key={item[0]} />)}</div></section>)}</div></section><section className="lab-note"><div className="container"><span className="eyebrow">A RESEARCH INSTRUMENT</span><p>The goal is not to replace scientific judgment. It is to reduce the work around judgment: preparing information, testing representations, retrieving evidence, exposing uncertainty, and preserving what was learned.</p></div></section></main></Layout>;
}
