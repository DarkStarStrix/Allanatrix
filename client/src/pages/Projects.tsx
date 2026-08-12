import { Archive, ArrowUpRight, Atom, Box, Code2, Database, Layers3, Wrench } from "lucide-react";
import Layout from "@/components/Layout";

const activeProjects = [
  {
    label: "Vecalx",
    state: "ACTIVE / EXPERIMENTAL / NO RELEASE DATE",
    icon: Wrench,
    tone: "violet",
    title: "A runtime for differentiable dynamical programs.",
    body: "Vecalx compiles, executes, differentiates, and visualizes continuous, hybrid, spiking, and energy-based programs while keeping each model family’s execution semantics explicit.",
    facts: ["LNN · SNN · EBM", "RK4 · LIF · Langevin", "Experimental"],
    href: "",
  },
  {
    label: "NexaCompute",
    state: "ACTIVE / MATURE ML MONOREPO",
    icon: Layers3,
    tone: "blue",
    title: "The execution layer behind the lab.",
    body: "NexaCompute brings training, evaluation, artifact lineage, resource control, inference, data workflows, and operator-facing systems into one mature internal monorepo.",
    facts: ["Training + evaluation", "Runtime control plane", "Internal system"],
    href: "",
  },
  {
    label: "PyC",
    state: "ACTIVE / COMPILER + HPC TOOLCHAIN",
    icon: Code2,
    tone: "green",
    title: "Compiler infrastructure for machine learning systems.",
    body: "PyC remains active as the compiler and GPU workbench: kernel registries, CUDA experiments, build contracts, backend selection, and reproducible performance benchmarks.",
    facts: ["CUDA · C++ · Python", "Kernel registry", "Benchmark workbench"],
    href: "https://github.com/DarkStarStrix/PyC",
  },
];

type ArchiveItem = {
  name: string;
  summary: string;
  meta: string;
  href: string;
};

const archiveGroups: Array<{
  label: string;
  title: string;
  icon: typeof Archive;
  items: ArchiveItem[];
}> = [
  {
    label: "SCIENTIFIC MODELS",
    title: "Representations and predictors",
    icon: Box,
    items: [
      { name: "Nexa_Mat2", summary: "Generative crystal modeling and candidate construction.", meta: "MATERIALS · ARCHIVED RELEASE", href: "https://huggingface.co/AethronPhantom/Nexa_Mat2" },
      { name: "NexaMat", summary: "Graph representations for material-property prediction.", meta: "MATERIALS · ARCHIVED RELEASE", href: "https://huggingface.co/AethronPhantom/NexaMat" },
      { name: "SSB Screening Model", summary: "Candidate screening for solid-state battery materials.", meta: "BATTERIES · ARCHIVED RELEASE", href: "https://huggingface.co/AethronPhantom/SSB_Screening_Model" },
      { name: "NexaMass V3 Struct", summary: "Compact MS/MS encoding for candidate retrieval.", meta: "MASS SPECTROMETRY · ARCHIVED", href: "https://huggingface.co/AethronPhantom/NexaMass-V3-Struct" },
      { name: "NexaSci", summary: "Scientific language modeling across technical domains.", meta: "FOUNDATION MODEL · ARCHIVED", href: "https://huggingface.co/AethronPhantom/NexaSci" },
      { name: "NexaSci Distilled Falcon 10B", summary: "A distilled scientific-language model experiment.", meta: "DISTILLATION · ARCHIVED", href: "https://huggingface.co/AethronPhantom/Nexa_Sci_distilled_Falcon-10B" },
      { name: "NexaCFD", summary: "Learned representations for fluid-dynamics data.", meta: "FLUID DYNAMICS · ARCHIVED", href: "https://huggingface.co/AethronPhantom/NexaCFD" },
      { name: "NexaBio", summary: "A biological tabular-regression research model.", meta: "BIOLOGY · ARCHIVED", href: "https://huggingface.co/AethronPhantom/NexaBio" },
      { name: "NexaAstro", summary: "Classification over stellar-observation features.", meta: "ASTROPHYSICS · ARCHIVED", href: "https://huggingface.co/AethronPhantom/NexaAstro" },
      { name: "NexaQST", summary: "Regression experiments for quantum-state tomography.", meta: "QUANTUM · ARCHIVED", href: "https://huggingface.co/AethronPhantom/NexaQST" },
    ],
  },
  {
    label: "SCIENTIFIC DATASETS",
    title: "Corpora and measurements",
    icon: Database,
    items: [
      { name: "OpenSciTech Reasoning 1M", summary: "A million-example corpus for technical and numerical reasoning.", meta: "REASONING · 1M EXAMPLES", href: "https://huggingface.co/datasets/AethronPhantom/OpenSciTech-Reasoning-1M" },
      { name: "Scientific Research Tokenized", summary: "Tokenized scientific literature for model pretraining.", meta: "SCIENTIFIC TEXT · 433K ROWS", href: "https://huggingface.co/datasets/AethronPhantom/Scientific_Research_Tokenized" },
      { name: "SSB Dataset", summary: "Structured records for solid-state battery screening.", meta: "MATERIALS · BATTERIES", href: "https://huggingface.co/datasets/AethronPhantom/SSB_Dataset" },
      { name: "SSB Pilots Combined", summary: "Combined pilot artifacts from the battery-screening program.", meta: "MATERIALS · PILOT DATA", href: "https://huggingface.co/datasets/AethronPhantom/ssb_pilots_combined" },
      { name: "Nexa Science Multitask", summary: "Balanced supervision across scientific tasks.", meta: "MULTITASK · TRAINING", href: "https://huggingface.co/datasets/AethronPhantom/nexa-science-multitask-balanced" },
      { name: "Materials", summary: "Computed structures and material-property records.", meta: "MATERIALS SCIENCE", href: "https://huggingface.co/datasets/AethronPhantom/Materials" },
      { name: "CFD", summary: "Simulation data for fluid-dynamics experiments.", meta: "NAVIER–STOKES", href: "https://huggingface.co/datasets/AethronPhantom/CFD" },
      { name: "Astro", summary: "Stellar observations for classification experiments.", meta: "ASTROPHYSICS", href: "https://huggingface.co/datasets/AethronPhantom/Astro" },
      { name: "ProteinBank", summary: "Synthetic protein-structure records for model experiments.", meta: "BIOLOGY", href: "https://huggingface.co/datasets/AethronPhantom/ProtienBank" },
      { name: "QST", summary: "Measurements for quantum-state tomography studies.", meta: "QUANTUM", href: "https://huggingface.co/datasets/AethronPhantom/QST" },
      { name: "HEP", summary: "Particle measurements for high-energy physics experiments.", meta: "HIGH-ENERGY PHYSICS", href: "https://huggingface.co/datasets/AethronPhantom/HEP" },
    ],
  },
  {
    label: "RESEARCH SYSTEMS",
    title: "Infrastructure and tools",
    icon: Code2,
    items: [
      { name: "CORAL", summary: "Lightweight infrastructure for multi-agent autoresearch.", meta: "AGENTS · AUTORESEARCH", href: "https://github.com/DarkStarStrix/CORAL" },
      { name: "Azure Sky", summary: "A hybrid optimizer developed as a numerical research line.", meta: "OPTIMIZATION · PYTHON", href: "https://github.com/DarkStarStrix/Azure_Sky" },
      { name: "BenchmarkFcns", summary: "Test functions for comparing numerical optimization algorithms.", meta: "OPTIMIZATION · C++", href: "https://github.com/DarkStarStrix/BenchmarkFcns" },
      { name: "Nexa Vortex Analysis", summary: "A technical report on the Nexa Vortex GPU architecture.", meta: "GPU · TECHNICAL REPORT", href: "https://github.com/DarkStarStrix/nexa-vortex-analysis" },
      { name: "Nexa Visualize", summary: "A compact interface for inspecting neural-network training.", meta: "TRAINING TOOL · JAVASCRIPT", href: "https://github.com/DarkStarStrix/Nexa_Visualize" },
      { name: "vmx", summary: "An earlier Rust compiler and runtime experiment.", meta: "COMPILER · RUST · ARCHIVED", href: "https://github.com/DarkStarStrix/vmx" },
      { name: "Nexa Vortex", summary: "An archived GPU-acceleration prototype.", meta: "GPU · ARCHIVED", href: "https://github.com/DarkStarStrix/Nexa_Vortex" },
      { name: "Nexa Inference", summary: "An archived serving interface for scientific models.", meta: "INFERENCE · ARCHIVED", href: "https://github.com/DarkStarStrix/Nexa_Inference" },
      { name: "NexaPod", summary: "An archived distributed-compute fabric for scientific workloads.", meta: "DISTRIBUTED SYSTEMS · ARCHIVED", href: "https://github.com/DarkStarStrix/NexaPod" },
      { name: "DataVolt", summary: "Reusable data-engineering components and notebooks.", meta: "DATA SYSTEMS · ARCHIVED", href: "https://github.com/DarkStarStrix/DataVolt" },
      { name: "Agent Kit", summary: "An archived scientific-agent prototype.", meta: "AGENTS · ARCHIVED", href: "https://github.com/DarkStarStrix/Agent_Kit" },
      { name: "Singularity Cluster Config", summary: "Reproducible cluster configuration and infrastructure notes.", meta: "HPC · CONFIGURATION", href: "https://github.com/DarkStarStrix/Singularity_Cluster_Config" },
    ],
  },
  {
    label: "EARLIER STUDIES",
    title: "Scientific experiments",
    icon: Atom,
    items: [
      { name: "QSolvers", summary: "An experimental toolkit for applied quantum methods.", meta: "QUANTUM · ARCHIVED", href: "https://github.com/DarkStarStrix/QSolvers" },
      { name: "Emergent Neural Networks", summary: "Modeling emergent behavior in complex AI systems.", meta: "COMPLEX SYSTEMS", href: "https://github.com/DarkStarStrix/Emergent-Nerual-Networks" },
      { name: "Emergent Dynamics", summary: "A mathematical experiment in microscale chaotic behavior.", meta: "DYNAMICAL SYSTEMS", href: "https://github.com/DarkStarStrix/Emergent-Dynamics" },
      { name: "Atomic Clock", summary: "A cesium-clock simulation built with quantum tooling.", meta: "QUANTUM SIMULATION · ARCHIVED", href: "https://github.com/DarkStarStrix/Atomic-Clock" },
      { name: "Condensed Matter Physics", summary: "Quantum-computing studies of interacting physical systems.", meta: "CONDENSED MATTER · ARCHIVED", href: "https://github.com/DarkStarStrix/Condensed_Matter_Physics" },
      { name: "CMP Sonoluminescence", summary: "A quantum-simulation study of cavitation and trapped molecules.", meta: "PHYSICS · ARCHIVED", href: "https://github.com/DarkStarStrix/CMP-Sonoluminescence" },
      { name: "Quantum Dots", summary: "Computational studies of nanoscale semiconductor systems.", meta: "QUANTUM MATERIALS · ARCHIVED", href: "https://github.com/DarkStarStrix/QuantumDots" },
      { name: "Advanced Computation", summary: "Self-authored work in computational science and ML systems.", meta: "SCIENTIFIC COMPUTING", href: "https://github.com/DarkStarStrix/CSE-Repo-of-Advanced-Computation-ML-and-Systems-Engineering" },
      { name: "Math Programming", summary: "Operations-research and mathematical-programming experiments.", meta: "OPERATIONS RESEARCH", href: "https://github.com/DarkStarStrix/Math-Programming" },
    ],
  },
  {
    label: "PUBLIC INTERFACES",
    title: "Explainers and instruments",
    icon: Layers3,
    items: [
      { name: "Nexa Data Studio", summary: "A dataset-generation and inspection interface.", meta: "HUGGING FACE SPACE", href: "https://huggingface.co/spaces/AethronPhantom/Nexa_Data_Studio" },
      { name: "NexaMat Crystal Viewer", summary: "An interactive view into material structures.", meta: "HUGGING FACE SPACE", href: "https://huggingface.co/spaces/AethronPhantom/nexamat-crystal-viewer" },
      { name: "SciML and AI for Science", summary: "A public explainer for scientific machine learning.", meta: "HUGGING FACE SPACE", href: "https://huggingface.co/spaces/AethronPhantom/SciML-AI4Science" },
    ],
  },
];

export default function Projects() {
  return (
    <Layout>
      <main className="projects-page">
        <div className="container projects-intro">
          <div>
            <span className="eyebrow">PROJECTS / CURRENT STATE</span>
            <h1>Three active<br /><em>systems.</em></h1>
          </div>
          <p>Current development is concentrated in the runtime, ML monorepo, and compiler layers. Completed releases and relevant earlier studies are organized in the archive below.</p>
        </div>

        <div className="container project-lines active-project-lines">
          {activeProjects.map(({ label, state, icon: Icon, tone, title, body, facts, href }, index) => (
            <article className={`project-line ${tone}`} key={label}>
              <div className="project-line-index mono">0{index + 1}</div>
              <div className="project-line-main">
                <div className="project-line-heading">
                  <div>
                    <span className="mono project-state"><Icon size={13} /> {state}</span>
                    <h2>{label}</h2>
                  </div>
                  {href && <a href={href} target="_blank" rel="noreferrer" aria-label={`Open ${label}`}><ArrowUpRight size={20} /></a>}
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <div className="project-facts">{facts.map((fact) => <span className="mono" key={fact}>{fact}</span>)}</div>
              </div>
            </article>
          ))}
        </div>

        <section className="project-archive">
          <div className="container">
            <div className="archive-heading">
              <div>
                <span className="eyebrow">CURATED PUBLIC ARCHIVE</span>
                <h2>Research by<br /><em>purpose.</em></h2>
              </div>
              <p>Authored models, datasets, systems, and scientific studies with a clear connection to the lab’s work.</p>
            </div>

            <div className="archive-groups">
              {archiveGroups.map(({ label, title, icon: Icon, items }) => (
                <section className="archive-group" key={label}>
                  <div className="archive-group-heading">
                    <div><Icon size={18} /><div><span className="mono">{label}</span><h3>{title}</h3></div></div>
                    <span className="mono">{items.length.toString().padStart(2, "0")}</span>
                  </div>
                  <div className="archive-grid">
                    {items.map(({ name, summary, meta, href }) => (
                      <a href={href} target="_blank" rel="noreferrer" key={`${label}-${name}`}>
                        <div><strong>{name}</strong><ArrowUpRight size={14} /></div>
                        <p>{summary}</p>
                        <span className="mono">{meta}</span>
                      </a>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
