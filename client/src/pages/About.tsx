import Layout from "@/components/Layout";
import { STORY_TIMELINE } from "@/lib/data";

const principles = [
  ["01", "Reality over benchmarks", "A metric is useful only when its failure mode is visible."],
  ["02", "Systems over checkpoints", "Data, training, evaluation, serving, and operators are one research surface."],
  ["03", "Make uncertainty legible", "The output should say what is known, ambiguous, and still unverified."],
];

export default function About() {
  return <Layout><main className="about-page"><div className="container about-hero"><div><span className="eyebrow">ABOUT / AETHRON LABS</span><h1>Research systems<br /><em>for the physical world.</em></h1></div><p>I’m Allan — a scientific ML and infrastructure engineer building models, datasets, and control planes for domains where the data is structured, noisy, and consequential.</p></div><section className="container about-story"><div className="about-story-lead"><span className="eyebrow">THE STORY SO FAR</span><h2>Curiosity became a practice.<br /><em>The practice became a lab.</em></h2><p>From writing a first game in a school library to building scientific ML systems, the throughline has stayed the same: learn how a system works, make it useful, and share what the work teaches.</p></div><div className="story-timeline">{STORY_TIMELINE.map((item) => <article key={item.year}><span className="mono">{item.year}</span><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}</div></section><section className="container about-principles"><div className="eyebrow">THE BUILDING BLOCKS</div><div className="principle-grid">{principles.map(([number, title, body]) => <article key={number}><span className="mono">{number}</span><h2>{title}</h2><p>{body}</p></article>)}</div></section></main></Layout>;
}
