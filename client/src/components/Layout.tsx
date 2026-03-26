// =============================================================================
// Layout — Root layout wrapper
// Data Observatory × Cyberpunk: dot-grid texture, scan-line overlay, sticky nav
// CSS tokens: --void, --void-border
// =============================================================================

import { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--void)" }}
    >
      <Nav />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
