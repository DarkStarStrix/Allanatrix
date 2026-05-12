// =============================================================================
// data.ts — Single source of truth for all site content
// Grounded in: GitHub (DarkStarStrix), HuggingFace (Allanatrix),
//              X (@AllanatrixQ), Aethron Labs (aethronlabs.xyz)
// =============================================================================

export const SITE = {
  name: "Allanatrix",
  title: "Allanatrix — ML Infrastructure Engineer",
  tagline: "Allan — Technomancer of Systems, Science, and Code",
  headline: "Building foundation models for scientific data interpretation.",
  description:
    "Machine Learning Engineer at Aethron Labs. Building NexaMol (MS/MS foundation model) and Nexa_Mat — a full-stack materials AI system combining encoder, diffusion, and multimodal components — alongside Nexa_Compute (ML infra), Science Gym (RL for scientific decisions), and PyC (AI compiler toolchain for HPC).",
  email: "allan@aethronlabs.xyz",
  cname: "allanatrix.dev",
} as const;

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Lab", href: "/lab" },
  { label: "Blog", href: "https://allanatrix.bearblog.dev/", external: true },
  { label: "Terminal", href: "/terminal" },
];

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/DarkStarStrix", icon: "github" },
  { label: "HuggingFace", href: "https://huggingface.co/Allanatrix", icon: "huggingface" },
  { label: "X", href: "https://x.com/AllanatrixQ", icon: "x" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/technomancertrix/", icon: "linkedin" },
] as const;

export interface ProgressNode {
  id: string;
  label: string;
  status: "complete" | "active" | "next" | "planned";
  note?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  status: "active" | "complete" | "archived";
  stage: string;
  description: string;
  highlights: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  links: { label: string; url: string; external?: boolean }[];
  progress: ProgressNode[];
  company?: string;
}

export const CURRENT_PROJECTS: Project[] = [
  {
    id: "nexa-compute",
    title: "Nexa_Compute",
    subtitle: "ML Infrastructure Platform",
    status: "active",
    stage: "Active Development",
    company: "Aethron Labs",
    description:
      "The central ML infrastructure platform powering the Nexa ecosystem. Orchestrates distributed training, inference serving, checkpoint management, and multi-node job dispatch across HPC clusters and cloud pods. Hosts the training backends for NexaMol, Nexa_Mat, and SSB models.",
    highlights: [
      "Unified training backends: MS/MS, materials science, SSB classification",
      "Distributed job dispatch via nexa_pod across peer-to-peer GPU grids",
      "Inference serving layer with generic TorchScript and state-dict runtimes",
      "Full CI/CD: GitHub Actions, Docker images, infra audit workflows",
    ],
    stack: ["Python", "PyTorch", "FastAPI", "Docker", "Slurm", "Rust", "CUDA"],
    metrics: [
      { label: "Modules", value: "12+" },
      { label: "CI Workflows", value: "5" },
      { label: "Status", value: "Private" },
    ],
    links: [
      { label: "GitHub (Private)", url: "https://github.com/DarkStarStrix/Nexa_Compute", external: true },
    ],
    progress: [
      { id: "infra", label: "Core Infra Modules", status: "complete", note: "nexa_compute, nexa_infra, nexa_pod" },
      { id: "training", label: "Training Backends", status: "active", note: "MS/MS + materials backends live" },
      { id: "serving", label: "Inference Serving", status: "active", note: "Generic torch runtime + adapters" },
      { id: "security", label: "Security Hardening", status: "active", note: "CWE-78, CWE-502, CWE-22 patched" },
      { id: "scale", label: "Multi-node Scale-out", status: "next", note: "Blackwell GPU provisioning" },
    ],
  },
  {
    id: "nexa-mat",
    title: "Nexa_Mat",
    subtitle: "Materials AI Stack — Encoder · Diffusion · Multimodal",
    status: "active",
    stage: "Diffusion Scaling — Active",
    company: "Aethron Labs",
    description:
      "A full-stack materials AI system combining three tightly integrated components: an equivariant GNN encoder for crystal structure representations, a diffusion model for generative materials design, and a multimodal layer for cross-modal property reasoning. Currently scaling the diffusion component on Blackwell GPUs.",
    highlights: [
      "Encoder: equivariant GNN (EGNN, local/angular/tensor potential families) on 87k crystal structures",
      "Diffusion: generative materials design model — currently in diffusion scaling phase",
      "Multimodal: cross-modal reasoning layer bridging structure, spectra, and property labels",
      "SSB screening: electrolyte-relevant material classification (3-class MLP, epoch-45)",
    ],
    stack: ["Python", "PyTorch", "PyMatGen", "HuggingFace", "CUDA", "DuckDB", "Diffusion"],
    metrics: [
      { label: "Dataset", value: "87k rows" },
      { label: "HF Downloads", value: "64" },
      { label: "Stack Layers", value: "3" },
    ],
    links: [
      { label: "HuggingFace", url: "https://huggingface.co/AethronPhantom", external: true },
      { label: "Dataset", url: "https://huggingface.co/datasets/Allanatrix/Materials", external: true },
    ],
    progress: [
      { id: "data", label: "Materials Dataset Assembly", status: "complete", note: "87k crystal structures, physics labels" },
      { id: "encoder", label: "Encoder — Equivariant GNN", status: "complete", note: "EGNN + potential families trained" },
      { id: "ssb", label: "SSB Screening Classifier", status: "complete", note: "3-class MLP, epoch-45 checkpoint" },
      { id: "diffusion", label: "Diffusion — Generative Design", status: "active", note: "Diffusion scaling phase — active" },
      { id: "multimodal", label: "Multimodal — Cross-Modal Reasoning", status: "next", note: "Structure · spectra · property labels" },
    ],
  },
  {
    id: "science-gym",
    title: "Science Gym",
    subtitle: "RL Environments for Scientific Decision-Making",
    status: "active",
    stage: "Framework — Open Source",
    description:
      "A framework for reinforcement learning environments that train models to make scientific decisions under uncertainty. Provides standardised gym-style interfaces for scientific tasks — from molecular discovery to experimental design — enabling agents to learn optimal decision strategies in high-stakes, noisy scientific settings.",
    highlights: [
      "Gym-compatible RL environments for scientific decision tasks",
      "Designed for training agents under uncertainty and noise",
      "Modular environment design: plug in any scientific domain",
      "Bridges SciML and RL — agents learn from experimental feedback loops",
    ],
    stack: ["Python", "Gymnasium", "PyTorch", "NumPy", "SciML"],
    metrics: [
      { label: "Type", value: "Framework" },
      { label: "License", value: "Open Source" },
      { label: "Domain", value: "SciML + RL" },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/DarkStarStrix/Science_Gym", external: true },
      { label: "X Announcement", url: "https://x.com/AllanatrixQ", external: true },
    ],
    progress: [
      { id: "design", label: "Environment Interface Design", status: "complete", note: "Gym-compatible API" },
      { id: "envs", label: "Core Environments", status: "active", note: "Scientific decision tasks" },
      { id: "agents", label: "Baseline RL Agents", status: "active", note: "Training under uncertainty" },
      { id: "docs", label: "Documentation & Examples", status: "next", note: "Public release" },
    ],
  },
  {
    id: "nexamass-v3",
    title: "NexaMass-V3-Struct",
    subtitle: "MS/MS Structural Encoder — Completed",
    status: "complete",
    stage: "Complete — Published",
    company: "Aethron Labs",
    description:
      "The third-generation NexaMass encoder, trained on the GeMS corpus for MS/MS spectral retrieval and structural signal prediction. V3-Struct introduces a dedicated structural encoding head, achieving improved nearest-neighbor retrieval accuracy across instrument-agnostic spectra. Published on HuggingFace under AethronPhantom.",
    highlights: [
      "Structural encoding head for MS/MS fragmentation pattern learning",
      "Instrument-agnostic: trained across multiple MS instrument types",
      "FAISS-backed nearest-neighbor retrieval at inference",
      "Published on HuggingFace — AethronPhantom/NexaMass-V3-Struct",
    ],
    stack: ["Python", "PyTorch", "HuggingFace", "FAISS", "GeMS", "CUDA"],
    metrics: [
      { label: "Version", value: "V3" },
      { label: "Task", value: "MS/MS Retrieval" },
      { label: "Status", value: "Published" },
    ],
    links: [
      { label: "HuggingFace", url: "https://huggingface.co/AethronPhantom/NexaMass-V3-Struct", external: true },
    ],
    progress: [
      { id: "data", label: "GeMS Corpus Preparation", status: "complete", note: "579 GiB MS/MS spectra" },
      { id: "arch", label: "V3 Structural Head Design", status: "complete", note: "Dedicated structural encoder" },
      { id: "train", label: "Model Training", status: "complete", note: "Full training run complete" },
      { id: "eval", label: "Retrieval Evaluation", status: "complete", note: "Benchmarked on GeMS holdout" },
      { id: "publish", label: "HuggingFace Publication", status: "complete", note: "AethronPhantom/NexaMass-V3-Struct" },
    ],
  },

  {
    id: "nexamol",
    title: "NexaMol",
    subtitle: "Foundation Model for Mass Spectrometry — Complete",
    status: "complete",
    stage: "Complete — Published",
    company: "Aethron Labs",
    description:
      "A foundation model trained on the GeMS v1 corpus — 579 GiB of ML-ready mass spectra — learning the underlying language of molecular fragmentation for instant retrieval and structural inference. Training complete and published on HuggingFace.",
    highlights: [
      "GeMS v1 corpus: 579 GiB of ML-ready mass spectra — training complete",
      "Nearest-neighbor retrieval across full corpus in milliseconds",
      "Structural inference: metabolite candidates + confidence scores",
      "Target: CROs — metabolite ID, impurity analysis, dereplication",
    ],
    stack: ["Python", "PyTorch", "HuggingFace", "GeMS", "FAISS", "CUDA"],
    metrics: [
      { label: "Corpus", value: "579 GiB" },
      { label: "V1 Params", value: "3B" },
      { label: "Status", value: "Complete" },
    ],
    links: [
      { label: "HuggingFace", url: "https://huggingface.co/Allanatrix", external: true },
      { label: "Aethron Labs", url: "https://aethronlabs.xyz/", external: true },
    ],
    progress: [
      { id: "data", label: "Dataset Assembly", status: "complete", note: "GeMS v1 — 579 GiB complete" },
      { id: "arch", label: "Architecture Design", status: "complete", note: "3B param foundation model" },
      { id: "compute", label: "Compute Stage", status: "complete", note: "Model training — done" },
      { id: "eval", label: "Evaluation & Benchmarks", status: "complete", note: "Nexa Evals suite complete" },
      { id: "api", label: "API Integration", status: "complete", note: "Published on HuggingFace" },
    ],
  },
  {
    id: "pyc",
    title: "PyC",
    subtitle: "AI Compiler Toolchain for HPC",
    status: "active",
    stage: "Active Development",
    description:
      "A lightweight AI compiler toolchain merging Nexa_Vortex runtime and Nexa_Inference into a unified HPC platform. Cross-platform CI, deterministic build contracts, and GPU benchmarking across 7 backends.",
    highlights: [
      "Merged Nexa_Vortex + Nexa_Inference into unified HPC toolchain",
      "Cross-platform CI: Ubuntu, macOS, Windows with ccache",
      "GPU benchmark suite: torch, TVM, XLA, TensorRT, Glow, PyC",
      "Compiler-next: AI bridge, pass manager, kernel registry",
    ],
    stack: ["C", "Python", "CMake", "CUDA", "TVM", "XLA", "TensorRT"],
    metrics: [
      { label: "Commits", value: "112" },
      { label: "Backends", value: "7" },
      { label: "Platforms", value: "3" },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/DarkStarStrix/PyC", external: true },
    ],
    progress: [
      { id: "stable", label: "Stable CI Targets", status: "complete", note: "pyc_core, pyc_foundation cross-platform" },
      { id: "merge", label: "Vortex + Inference Merge", status: "complete", note: "Unified HPC toolchain" },
      { id: "bench", label: "GPU Benchmark Suite", status: "complete", note: "7 backends benchmarked" },
      { id: "compiler-next", label: "Compiler-Next Pipeline", status: "active", note: "Experimental — AI bridge layer" },
      { id: "kernels", label: "Kernel Transfer", status: "active", note: "Via Nexa_Connect intermediary" },
      { id: "release", label: "Binary Distribution", status: "complete", note: "3 releases, all platforms" },
    ],
  },
];

export interface ArchivedProject {
  id: string;
  title: string;
  description: string;
  stack: string[];
  link?: string;
  year: string;
}

export const ARCHIVED_PROJECTS: ArchivedProject[] = [
  {
    id: "ssb-dataset",
    title: "SSB_Dataset",
    description: "6.03M mass spectra rows assembled from pilot studies. The training corpus for NexaMol. 132 downloads on HuggingFace.",
    stack: ["HuggingFace Datasets", "Mass Spectrometry", "Python"],
    link: "https://huggingface.co/datasets/Allanatrix/SSB_Dataset",
    year: "2025-Q4",
  },
  {
    id: "nexa-llama",
    title: "nexa-llama3-8b-science-multitask",
    description: "8B parameter science-focused LLM fine-tuned for multi-task scientific reasoning. Merged model on HuggingFace.",
    stack: ["PyTorch", "LLaMA-3", "HuggingFace", "LoRA"],
    link: "https://huggingface.co/Allanatrix/nexa-llama3-8b-science-multitask-merged",
    year: "2026-Q1",
  },
  {
    id: "nexa-falcon",
    title: "Nexa_Sci_distilled_Falcon-10B",
    description: "10B distilled Falcon model for scientific text generation. QLoRA fine-tuned.",
    stack: ["Falcon", "Distillation", "HuggingFace", "PEFT"],
    link: "https://huggingface.co/Allanatrix/Nexa_Sci_distilled_Falcon-10B",
    year: "2025-Q2",
  },
  {
    id: "nexa-visualize",
    title: "Nexa_Visualize",
    description: "Tool to visualize neural network training dynamics. 11 stars, 2 forks on GitHub.",
    stack: ["JavaScript", "D3.js", "WebGL"],
    link: "https://github.com/DarkStarStrix/Nexa_Visualize",
    year: "2025-Q3",
  },
  {
    id: "nexacfd",
    title: "NexaCFD",
    description: "Tabular regression model for computational fluid dynamics simulation data.",
    stack: ["PyTorch", "Tabular ML", "HuggingFace"],
    link: "https://huggingface.co/Allanatrix/NexaCFD",
    year: "2025-Q1",
  },
  {
    id: "nexabio",
    title: "NexaBio",
    description: "Tabular regression model for biological data. Part of the Nexa scientific ML suite.",
    stack: ["PyTorch", "Biology", "HuggingFace"],
    link: "https://huggingface.co/Allanatrix/NexaBio",
    year: "2025-Q1",
  },
  {
    id: "nexa-data-studio",
    title: "Nexa Data Studio",
    description: "HuggingFace Space for generating and labeling scientific datasets for ML research.",
    stack: ["Gradio", "HuggingFace Spaces", "Python"],
    link: "https://huggingface.co/spaces/Allanatrix/Nexa_Data_Studio",
    year: "2025-Q4",
  },
];

export interface SkillCategory {
  id: string;
  label: string;
  skills: { name: string; level: number }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "Python", level: 95 },
      { name: "C", level: 80 },
      { name: "C++", level: 70 },
      { name: "JavaScript", level: 65 },
      { name: "TypeScript", level: 60 },
      { name: "Lean", level: 50 },
    ],
  },
  {
    id: "ml-frameworks",
    label: "ML Frameworks",
    skills: [
      { name: "PyTorch", level: 95 },
      { name: "HuggingFace", level: 90 },
      { name: "PEFT / LoRA", level: 85 },
      { name: "TRL", level: 80 },
      { name: "Scikit-learn", level: 75 },
      { name: "JAX", level: 60 },
    ],
  },
  {
    id: "training",
    label: "Training & Distillation",
    skills: [
      { name: "QLoRA / LoRA", level: 90 },
      { name: "Knowledge Distillation", level: 85 },
      { name: "Multi-task Fine-tuning", level: 85 },
      { name: "RLHF / DPO", level: 70 },
      { name: "Quantization (GPTQ/AWQ)", level: 75 },
    ],
  },
  {
    id: "compilers",
    label: "Compilers & HPC",
    skills: [
      { name: "CMake", level: 85 },
      { name: "CUDA", level: 75 },
      { name: "TVM", level: 70 },
      { name: "XLA", level: 65 },
      { name: "TensorRT", level: 65 },
      { name: "Triton", level: 55 },
    ],
  },
  {
    id: "data",
    label: "Data Engineering",
    skills: [
      { name: "HuggingFace Datasets", level: 90 },
      { name: "Pandas / Polars", level: 85 },
      { name: "FAISS", level: 80 },
      { name: "DuckDB", level: 70 },
      { name: "Mass Spectrometry (MS/MS)", level: 85 },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Infra",
    skills: [
      { name: "GitHub Actions", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Linux / Bash", level: 85 },
      { name: "Slurm / HPC Clusters", level: 70 },
      { name: "ccache / CI Optimization", level: 75 },
    ],
  },
  {
    id: "visualization",
    label: "Visualization",
    skills: [
      { name: "Matplotlib / Seaborn", level: 85 },
      { name: "Plotly / Dash", level: 75 },
      { name: "D3.js", level: 65 },
      { name: "Gradio", level: 80 },
      { name: "Weights & Biases", level: 75 },
    ],
  },
];

// Original narrative — preserved from Story.html verbatim
export const STORY_NARRATIVE = [
  {
    id: "origins",
    title: "Embracing Curiosity and Determination",
    body: "Technology has always been a passion of mine, stemming from an innate curiosity and a resolute determination to tackle challenges. This journey began during my middle school years when my access to a game console was restricted by my parents. Turning frustration into motivation, I sought refuge in the school library, where I delved into articles on Python programming to create a Pong game. My persistence paid off as I successfully coded the game, emphasizing my ability to transform obstacles into opportunities for creativity and productivity, laying the groundwork for my future pursuits.",
  },
  {
    id: "network",
    title: "Network Fundamentals",
    body: "In high school, I encountered internet restrictions that spurred me to explore network fundamentals. Through my exploration, I legally and ethically circumvented the limitations using a DNS server, recognizing the importance of upholding ethical standards. This experience underlined my resourcefulness and technical acumen, reinforcing the notion that knowledge and innovation can surmount any barrier.",
  },
  {
    id: "college",
    title: "Quantum Optimization & QSolvers",
    body: "Transitioning into college, I honed my skills in quantum optimization and supply chain logistics, both pivotal realms within computer science and societal impact. Notably, the creation of QSolvers — a quantum optimization tool — garnered attention within the scientific and technological community, validating the significance and relevance of my work. Engaging in article writing and webinars further facilitated the dissemination of insights and the cultivation of collaborative efforts within the tech sphere.",
  },
  {
    id: "ethos",
    title: "Open Source & Integrity",
    body: "My ethos revolves around upholding integrity, transparently sharing my work, and promoting open-source contributions, aligning with my goal of solving substantive challenges and sharing expertise with a wider audience. Such an approach not only fortifies my credibility but also bolsters the collective progress of technology. Whether it entails pioneering solutions in quantum optimization or contributing to open-source initiatives, I remain unwavering in my commitment to effectuating positive change through technology.",
  },
];

// Timeline for the visual timeline component on About page
export const STORY_TIMELINE = [
  {
    year: "Middle School",
    title: "Pong in the Library",
    body: "Game console restricted. Found Python in the school library. Built Pong from scratch — first code, first proof that obstacles are just problems waiting for a solution.",
  },
  {
    year: "High School",
    title: "DNS & Network Fundamentals",
    body: "Internet restrictions led to exploring network fundamentals. Legally and ethically bypassed limitations using a DNS server. Learned that knowledge is the only barrier worth respecting.",
  },
  {
    year: "College",
    title: "QSolvers — Quantum Optimization",
    body: "Built QSolvers, a quantum optimization tool for supply chain logistics. Gained traction in the scientific community. Published articles, ran webinars, started building in public.",
  },
  {
    year: "2023",
    title: "Nexa Ecosystem",
    body: "Launched on HuggingFace and X. Built the Nexa suite — NexaCFD, NexaBio, Nexa_Visualize, and 10+ scientific datasets across biology, astrophysics, and materials science.",
  },
  {
    year: "2025",
    title: "PyC & Foundation Models",
    body: "Merged Nexa_Vortex and Nexa_Inference into PyC — a unified AI compiler toolchain for HPC. Fine-tuned LLaMA-3 8B and distilled Falcon-10B for scientific tasks. Assembled the SSB_Dataset.",
  },
  {
    year: "2026",
    title: "Aethron Labs — Full Stack AI4Science",
    body: "Founded Aethron Labs. Shipped NexaMol v1 (3B param MS/MS foundation model, published) and NexaMass-V3-Struct (structural encoder, published). Building Nexa_Mat — a full-stack materials AI system (encoder + diffusion + multimodal), currently in diffusion scaling phase. Built Science Gym, an RL framework for scientific decision-making under uncertainty. Launched Nexa_Compute, the private ML infrastructure platform powering all training and inference. Targeting CROs and battery materials research.",
  },
];

export const HF_STATS = {
  models: 18,
  datasets: 10,
  spaces: 4,
};

export const GH_STATS = {
  repos: 197,
  contributions: 697,
  stars: 9,
};

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: [
    "",
    "  allanatrix terminal — available commands",
    "  ─────────────────────────────────────────",
    "  whoami        identity & current focus",
    "  status        live project status",
    "  nexamol       NexaMol foundation model",
    "  nexamassv3    NexaMass-V3-Struct — complete",
    "  nexamat       Nexa_Mat materials model",
    "  sciencegym    Science Gym RL framework",
    "  nexacompute   Nexa_Compute ML infra",
    "  pyc           PyC compiler toolchain",
    "  hf            HuggingFace stats",
    "  aethron       Aethron Labs info",
    "  stack         full tech stack",
    "  datasets      published datasets",
    "  models        published models",
    "  contact       get in touch",
    "  clear         clear terminal",
    "",
  ].join("\n"),

  whoami: [
    "",
    "  Allan — Technomancer of Systems, Code",
    "  Machine Learning Engineer @ Aethron Labs",
    "  Washington DC · allanatrix.dev",
    "",
    "  AI-Driven Computational Mass Spectrometry",
    "  Machine Learning · AI4Science",
    "",
    "  GitHub:      github.com/DarkStarStrix   (197 repos, 697 contributions/yr)",
    "  HuggingFace: huggingface.co/Allanatrix  (18 models, 10 datasets)",
    "  X:           @AllanatrixQ",
    "",
  ].join("\n"),

  nexacompute: [
    "",
    "  Nexa_Compute — ML Infrastructure Platform",
    "  ─────────────────────────────────────────",
    "  Repo:    github.com/DarkStarStrix/Nexa_Compute (private)",
    "  Status:  Active Development",
    "",
    "  Modules: nexa_compute · nexa_train · nexa_inference",
    "           nexa_infra · nexa_pod · nexa_data · nexa_modules",
    "",
    "  Training backends: MS/MS · Materials (Nexa_Mat) · SSB",
    "  Inference: Generic TorchScript + state-dict serving layer",
    "  Dispatch: nexa_pod — P2P GPU grid job coordination",
    "  CI: GitHub Actions · Docker · infra-audit · mintlify-docs",
    "",
    "  Security: CWE-78, CWE-502, CWE-22, CWE-798 patched (PR #61)",
    "",
  ].join("\n"),

  nexamat: [
    "",
    "  Nexa_Mat — Materials AI Stack",
    "  ─────────────────────────────────────────────",
    "  HuggingFace: huggingface.co/AethronPhantom",
    "  Dataset:     Allanatrix/Materials — 87k rows · 64 downloads",
    "",
    "  Stack: Encoder · Diffusion · Multimodal",
    "",
    "  [1] Encoder — Equivariant GNN           [COMPLETE]",
    "      EGNN · local_potential · angular_potential",
    "      tensor_potential · equivariant_potential",
    "",
    "  [2] Diffusion — Generative Design        [ACTIVE — SCALING]",
    "      Generative materials design model",
    "      Currently scaling on Blackwell GPUs",
    "",
    "  [3] Multimodal — Cross-Modal Reasoning   [NEXT]",
    "      Structure · spectra · property labels",
    "",
    "  SSB Screening: 3-class MLP · epoch-45 checkpoint",
    "  Target: energy prediction · generative design · battery materials",
    "",
  ].join("\n"),

  sciencegym: [
    "",
    "  Science Gym — RL for Scientific Decision-Making",
    "  ─────────────────────────────────────────────",
    "  Repo:    github.com/DarkStarStrix/Science_Gym",
    "  Status:  Active Development · Open Source",
    "",
    "  Framework for RL environments that train models to make",
    "  scientific decisions under uncertainty.",
    "",
    "  Interface: Gymnasium-compatible environments",
    "  Domains:   Molecular discovery · Experimental design",
    "  Goal:      Agents that learn from scientific feedback loops",
    "",
    "  X: @AllanatrixQ",
    "",
  ].join("\n"),

  nexamassv3: [
    "",
    "  NexaMass-V3-Struct — MS/MS Structural Encoder",
    "  ─────────────────────────────────────────────",
    "  HuggingFace: huggingface.co/AethronPhantom/NexaMass-V3-Struct",
    "  Status:  COMPLETE · Published",
    "",
    "  V3 introduces a dedicated structural encoding head for",
    "  MS/MS fragmentation pattern learning.",
    "",
    "  Corpus:    GeMS v1 — 579 GiB · instrument-agnostic",
    "  Retrieval: FAISS nearest-neighbor at inference",
    "  Pipeline:  Upload → Retrieve → Infer structural signals",
    "",
    "  Part of the NexaMol roadmap:",
    "    V1 [TRAINING]  3B params — MS/MS retrieval",
    "    V2 [PLANNED]   5B params — cross-instrument",
    "    V3 [COMPLETE]  Structural encoder — published",
    "",
  ].join("\n"),

  status: [
    "",
    "  ACTIVE PROJECTS",
    "  ────────────────────────────────────────────",
    "  [✓] NexaMol v1          COMPLETE",
    "      Foundation model · 579 GiB corpus",
    "      Training done → Published on HuggingFace",
    "",
    "  [●] Nexa_Compute        ACTIVE DEVELOPMENT",
    "      ML infrastructure platform · Private",
    "      Training backends + inference serving live",
    "",
    "  [●] Nexa_Mat            DIFFUSION SCALING",
    "      Encoder · Diffusion · Multimodal stack",
    "      Encoder complete → Diffusion scaling active",
    "",
    "  [●] Science Gym         ACTIVE DEVELOPMENT",
    "      RL framework for scientific decisions",
    "      Gymnasium-compatible · Open source",
    "",
    "  [●] PyC                 ACTIVE DEVELOPMENT",
    "      AI compiler toolchain · HPC",
    "      Compiler-next pipeline in progress",
    "",
    "  [✓] NexaMass-V3-Struct  COMPLETE",
    "      MS/MS structural encoder · Published on HuggingFace",
    "      AethronPhantom/NexaMass-V3-Struct",
    "",
    "  Company: Aethron Labs [PRE-SEED · ACTIVE]",
    "",
  ].join("\n"),

  nexamol: [
    "",
    "  NexaMol — Scientific Foundation Model",
    "  ────────────────────────────────────",
    "  Company:   Aethron Labs",
    "  Stage:     COMPLETE · Published on HuggingFace",
    "  Corpus:    GeMS v1 — 579 GiB ML-ready mass spectra",
    "",
    "  Pipeline:",
    "    Upload   → instrument-agnostic spectrum API",
    "    Retrieve → nearest-neighbor search (FAISS)",
    "    Infer    → structural signals + metabolite candidates",
    "",
    "  Model Roadmap:",
    "    V1 [COMPLETE]  3B params — MS/MS retrieval — published",
    "    V2 [PLANNED]   5B params — cross-instrument",
    "    V3 [ROADMAP]   7B params — multi-modal science",
    "",
    "  HuggingFace: huggingface.co/Allanatrix",
    "  Aethron:     aethronlabs.xyz",
    "",
  ].join("\n"),

  pyc: [
    "",
    "  PyC — AI Compiler ToolChain Infrastructure",
    "  ───────────────────────────────────────────",
    "  Repo:    github.com/DarkStarStrix/PyC",
    "  Stars:   9 · Commits: 112",
    "",
    "  Core targets: pyc_core · pyc_foundation · pyc",
    "  Merged:  Nexa_Vortex + Nexa_Inference → unified HPC toolchain",
    "",
    "  GPU Benchmark Backends:",
    "    torch_eager · torch_compile · pyc",
    "    tvm · xla · tensorrt · glow",
    "",
    "  Compiler-Next (experimental):",
    "    AI bridge layer · pass manager · kernel registry",
    "",
    "  CI: Ubuntu · macOS · Windows (ccache enabled)",
    "",
  ].join("\n"),

  hf: [
    "",
    "  HuggingFace — Allanatrix",
    "  ─────────────────────────",
    "  Models:    18 published",
    "  Datasets:  10 published",
    "  Spaces:    4 (Nexa_labs · Nexa Evals · Nexa Data Studio · Nexa R&D)",
    "",
    "  Top datasets by size:",
    "    SSB_Dataset              6.03M rows · 132 downloads",
    "    ProteinBank              100k rows  · 13 downloads",
    "    Astro                    100k rows  · 50 downloads",
    "    Materials                87k rows   · 64 downloads",
    "",
    "  huggingface.co/Allanatrix",
    "",
  ].join("\n"),

  aethron: [
    "",
    "  Aethron Labs",
    "  ─────────────",
    "  Stage:   Pre-Seed · Active Development",
    "  Mission: Building foundation models for scientific data interpretation",
    "  Focus:   Mass spectrometry — the language of molecules",
    "",
    "  Problem: 3-6 weeks per metabolite ID · manual analyst bottleneck",
    "  Solution: NexaMol API — instant retrieval + structural inference",
    "",
    "  Contact: allan@aethronlabs.xyz",
    "  Web:     aethronlabs.xyz",
    "",
  ].join("\n"),

  stack: [
    "",
    "  Tech Stack",
    "  ──────────",
    "  Languages:   Python · C · C++ · JavaScript · TypeScript · Lean",
    "  ML:          PyTorch · HuggingFace · PEFT/LoRA · TRL · JAX",
    "  Training:    QLoRA · Distillation · Multi-task FT · RLHF/DPO",
    "  Compilers:   CMake · CUDA · TVM · XLA · TensorRT · Triton",
    "  Data:        HF Datasets · Pandas · FAISS · DuckDB · MS/MS",
    "  DevOps:      GitHub Actions · Docker · Linux · Slurm · ccache",
    "  Viz:         Matplotlib · Plotly · D3.js · Gradio · W&B",
    "",
  ].join("\n"),

  datasets: [
    "",
    "  Published Datasets — huggingface.co/Allanatrix",
    "  ───────────────────────────────────────────────",
    "  SSB_Dataset                  6.03M rows · 132 downloads",
    "  ssb_pilots_combined          13k rows   · 95 downloads",
    "  Scientific_Research_Tok      33.2k rows · 43 downloads",
    "  ProteinBank                  100k rows  · 13 downloads",
    "  Materials                    87k rows   · 64 downloads",
    "  Astro                        100k rows  · 50 downloads",
    "  CFD                          10k rows   · 42 downloads",
    "  HEP                          2k rows    · 8 downloads",
    "  QST                          500 rows   · 25 downloads",
    "",
  ].join("\n"),

  models: [
    "",
    "  Published Models — huggingface.co/Allanatrix",
    "  ─────────────────────────────────────────────",
    "  nexa-llama3-8b-science-multitask-merged   8B  · 2 downloads",
    "  Nexa_Sci_distilled_Falcon-10B            10B  · 10 downloads",
    "  Nexa-DeepSeek-Sci-7B                      7B  · 1 download",
    "  Nexa-Qwen-sci-7B                          7B  · 2 downloads",
    "  NexaSci                                   —   · 3 downloads",
    "  + 13 more",
    "",
  ].join("\n"),

  contact: [
    "",
    "  Contact",
    "  ───────",
    "  Email:   allan@aethronlabs.xyz",
    "  GitHub:  github.com/DarkStarStrix",
    "  X:       @AllanatrixQ",
    "  HF:      huggingface.co/Allanatrix",
    "  Company: aethronlabs.xyz",
    "",
  ].join("\n"),
};
