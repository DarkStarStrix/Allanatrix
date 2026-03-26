// =============================================================================
// Lab — Aethron Labs + contact
// Data Observatory × Cyberpunk: company overview, NexaMol details, contact form
// CSS tokens: --void-raised, --electric, --neon, --text-primary, --text-secondary
// =============================================================================

import { useState } from "react";
import Layout from "@/components/Layout";
import { SITE } from "@/lib/data";
import { ArrowRight, CheckCircle, ExternalLink, Loader2 } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

export default function Lab() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/xqkrjkqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    background: "oklch(0.12 0.025 278)",
    border: "1px solid var(--void-border)",
    borderRadius: "var(--radius)",
    color: "var(--text-primary)",
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: "0.8rem",
    padding: "0.625rem 0.875rem",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <Layout>
      <div className="container py-16">
        {/* Header */}
        <header className="mb-12">
          <span className="section-label mb-4 block">Company</span>
          <h1
            className="font-prose font-bold text-4xl mb-4"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            <span className="text-glow-electric">Aethron Labs</span>
          </h1>
          <p className="text-sm max-w-xl" style={{ color: "var(--text-secondary)" }}>
            Building foundation models for scientific data interpretation. Mass spectrometry
            is the language of molecules — NexaMol makes it readable at scale.
          </p>
        </header>

        {/* Company overview grid */}
        <section className="grid lg:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "The Problem",
              accent: "var(--red-alert)",
              body: "Metabolite identification takes 3–6 weeks per compound. Manual workflows, expert bottlenecks, and expensive tooling make mass spectrometry data largely inaccessible to automated pipelines.",
            },
            {
              title: "The Solution",
              accent: "var(--electric)",
              body: "NexaMol provides instant retrieval and structural inference across 579 GiB of ML-ready mass spectra. Upload a spectrum, get metabolite candidates and confidence scores in milliseconds.",
            },
            {
              title: "The Market",
              accent: "var(--neon)",
              body: "Targeting CROs — contract research organizations — for metabolite ID, impurity analysis, and dereplication workflows. API-level integration into existing LIMS pipelines.",
            },
          ].map((card) => (
            <div key={card.title} className="cyber-card bracket-corner p-5">
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
              />
              <h3
                className="font-data text-xs uppercase tracking-widest mb-3 mt-1"
                style={{ color: card.accent }}
              >
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {card.body}
              </p>
            </div>
          ))}
        </section>

        {/* NexaMol pipeline */}
        <section className="cyber-card p-6 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-data text-[10px] uppercase tracking-widest" style={{ color: "var(--neon)" }}>
              NexaMol Pipeline
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--void-border)" }} />
            <span className="status-badge status-training">In Training</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "01", label: "Upload", desc: "Instrument-agnostic spectrum API. Any MS/MS format accepted.", color: "var(--electric)" },
              { step: "02", label: "Retrieve", desc: "Nearest-neighbor search across 6.03M spectra via FAISS.", color: "var(--neon)" },
              { step: "03", label: "Infer", desc: "Structural signals, metabolite candidates, confidence scores.", color: "var(--cyan)" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-data text-2xl font-bold" style={{ color: s.color, opacity: 0.3 }}>
                    {s.step}
                  </span>
                  <span className="font-data text-sm font-semibold" style={{ color: s.color }}>
                    {s.label}
                  </span>
                </div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact section */}
        <section id="contact">
          <div className="divider-label mb-10">Get in Touch</div>
          <div className="grid lg:grid-cols-[40%_60%] gap-12 items-start">
            {/* Left */}
            <div>
              <h2
                className="font-prose font-bold text-xl mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Reach out
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                Interested in NexaMol, a pilot integration, or just want to talk about
                AI4Science? Describe your use case and I'll get back within 48 hours.
              </p>
              <div className="flex flex-col gap-2 mb-6">
                {[
                  "CRO pilot integrations and scoped evaluations",
                  "Mass spectrometry ML research collaborations",
                  "Scientific dataset assembly and curation",
                  "HPC compiler toolchain (PyC) discussions",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: "var(--electric)" }} />
                    <span style={{ color: "var(--text-secondary)" }}>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 font-data text-xs transition-colors duration-200"
                  style={{ color: "var(--electric)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--electric)")}
                >
                  {SITE.email}
                  <ArrowRight size={11} />
                </a>
                <a
                  href="https://aethronlabs.xyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-data text-xs transition-colors duration-200"
                  style={{ color: "var(--neon)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--neon)")}
                >
                  aethronlabs.xyz
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Right: form */}
            <div className="cyber-card p-6">
              {status === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <CheckCircle size={36} style={{ color: "var(--green-signal)" }} />
                  <h3 className="font-prose font-semibold text-lg" style={{ color: "var(--text-primary)" }}>
                    Message received
                  </h3>
                  <p className="font-data text-xs" style={{ color: "var(--text-secondary)" }}>
                    I'll get back to you within 48 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="font-data text-[10px] uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                        Name *
                      </label>
                      <input
                        id="name" name="name" type="text" required
                        value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--electric)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--void-border)")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="font-data text-[10px] uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                        Email *
                      </label>
                      <input
                        id="email" name="email" type="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="you@example.com"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--electric)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--void-border)")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="font-data text-[10px] uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                      Company / Project
                    </label>
                    <input
                      id="company" name="company" type="text"
                      value={form.company} onChange={handleChange}
                      placeholder="Optional"
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--neon)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--void-border)")}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-data text-[10px] uppercase tracking-widest" style={{ color: "var(--text-dim)" }}>
                      Message *
                    </label>
                    <textarea
                      id="message" name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Describe your use case, dataset, or research question..."
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--electric)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--void-border)")}
                    />
                  </div>
                  {status === "error" && (
                    <p className="font-data text-xs" style={{ color: "var(--red-alert)" }}>
                      Something went wrong. Email directly: {SITE.email}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-cyber w-full"
                    style={{ opacity: status === "loading" ? 0.7 : 1 }}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {status === "loading" ? (
                        <><Loader2 size={13} className="animate-spin" /> Sending...</>
                      ) : (
                        <>Send Message <ArrowRight size={13} /></>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
