import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const profiles = [
  ["Hugging Face", "AethronPhantom", "https://huggingface.co/AethronPhantom"],
  ["GitHub", "DarkStarStrix", "https://github.com/DarkStarStrix"],
  ["X", "@AllanatrixQ", "https://x.com/AllanatrixQ"],
  ["LinkedIn", "technomancertrix", "https://www.linkedin.com/in/technomancertrix/"],
  ["Lab", "research program", "/lab"],
  ["Writing", "Bear Blog", "https://allanatrix.bearblog.dev/"],
];

export default function Footer() {
  return <footer className="site-footer"><div className="container footer-grid"><div className="footer-profiles"><span className="eyebrow">FIND THE WORK</span><div className="profile-grid">{profiles.filter(([label]) => label !== "Writing").map(([label, handle, href]) => href === "/lab" ? <Link key={label} href="/lab"><span>{label}</span><strong>{handle}</strong><ArrowUpRight size={13} /></Link> : <a key={label} href={href} target="_blank" rel="noreferrer"><span>{label}</span><strong>{handle}</strong><ArrowUpRight size={13} /></a>)}</div></div></div></footer>;
}
