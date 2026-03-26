// =============================================================================
// Terminal — Real interactive project explorer
// Commands: whoami, status, nexamol, pyc, hf, aethron, stack, datasets,
//           models, contact, clear, help. Tab autocomplete, ↑↓ history.
// CSS tokens: --void, --electric, --neon, --cyan, --text-primary
// =============================================================================

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Layout from "@/components/Layout";
import { TERMINAL_COMMANDS } from "@/lib/data";

interface HistoryEntry {
  type: "input" | "output" | "error" | "banner";
  text: string;
}

const BANNER = [
  "  ╔═══════════════════════════════════════════════════════════╗",
  "  ║  ALLANATRIX TERMINAL v2.0                                 ║",
  "  ║  ML Infrastructure Engineer · Aethron Labs                ║",
  "  ║  NexaMol · PyC · AI4Science                               ║",
  "  ╚═══════════════════════════════════════════════════════════╝",
  "",
  "  Type 'help' for commands. Tab to autocomplete. ↑↓ for history.",
  "",
].join("\n");

const ALL_COMMANDS = Object.keys(TERMINAL_COMMANDS).concat(["clear"]);

export default function Terminal() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: "banner", text: BANNER },
  ]);
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([{ type: "banner", text: BANNER }]);
      setInput("");
      setSuggestions([]);
      setCmdHistory((prev) => [raw, ...prev.slice(0, 49)]);
      setHistoryIndex(-1);
      return;
    }

    const result = TERMINAL_COMMANDS[cmd];
    const newEntries: HistoryEntry[] = [{ type: "input", text: `> ${raw}` }];

    if (result !== undefined) {
      const output = result;
      newEntries.push({ type: "output", text: output });
    } else {
      newEntries.push({
        type: "error",
        text: `  command not found: '${cmd}'\n  type 'help' to see available commands`,
      });
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setCmdHistory((prev) => [raw, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
    setInput("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
    }
  };

  const getColor = (type: HistoryEntry["type"]) => {
    switch (type) {
      case "input":  return "var(--cyan)";
      case "error":  return "var(--red-alert)";
      case "banner": return "var(--electric)";
      default:       return "var(--text-secondary)";
    }
  };

  const QUICK_CMDS = ["help", "whoami", "status", "nexamol", "pyc", "hf", "aethron", "stack", "datasets", "models", "contact", "clear"];

  return (
    <Layout>
      <div className="container py-16">
        {/* Header */}
        <header className="mb-8">
          <span className="section-label mb-4 block">Interactive</span>
          <h1
            className="font-prose font-bold text-4xl mb-2"
            style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}
          >
            Terminal
          </h1>
          <p className="font-data text-xs" style={{ color: "var(--text-dim)" }}>
            Explore NexaMol, PyC, datasets, and system status. Real data, real commands.
          </p>
        </header>

        {/* Terminal window */}
        <div
          className="terminal-window"
          style={{ boxShadow: "var(--glow-electric), inset 0 0 60px oklch(0.72 0.22 255 / 0.02)" }}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Chrome bar */}
          <div className="terminal-header">
            <div className="terminal-dot" style={{ background: "#ff5f57" }} />
            <div className="terminal-dot" style={{ background: "#febc2e" }} />
            <div className="terminal-dot" style={{ background: "#28c840" }} />
            <span className="font-data text-[11px] ml-3" style={{ color: "var(--text-dim)" }}>
              allanatrix — bash — 80×24
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--green-signal)" }} />
              <span className="font-data text-[10px]" style={{ color: "var(--green-signal)" }}>LIVE</span>
            </div>
          </div>

          {/* Content area */}
          <div className="terminal-content">
            {history.map((entry, i) => (
              <pre
                key={i}
                className="whitespace-pre-wrap break-words"
                style={{
                  color: getColor(entry.type),
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: "0.72rem",
                  lineHeight: "1.6",
                  marginBottom: "1px",
                }}
              >
                {entry.text}
              </pre>
            ))}

            {/* Input row */}
            <div className="flex items-center gap-2 mt-2">
              <span className="font-data text-xs shrink-0" style={{ color: "var(--neon)" }}>allanatrix</span>
              <span className="font-data text-xs" style={{ color: "var(--text-dim)" }}>@</span>
              <span className="font-data text-xs" style={{ color: "var(--electric)" }}>nexamol</span>
              <span className="font-data text-xs" style={{ color: "var(--text-dim)" }}>~$</span>
              <input
                ref={inputRef}
                className="terminal-input font-data flex-1"
                style={{ fontSize: "0.72rem" }}
                value={input}
                onChange={(e) => { setInput(e.target.value); setSuggestions([]); }}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>

            {/* Tab suggestions */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 ml-4">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    className="font-data text-[10px] px-2 py-0.5 rounded border"
                    style={{ color: "var(--cyan)", borderColor: "oklch(0.78 0.18 200 / 0.3)" }}
                    onClick={() => { setInput(s); setSuggestions([]); inputRef.current?.focus(); }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick commands bar */}
          <div
            className="px-4 py-3 border-t flex flex-wrap gap-2"
            style={{ borderColor: "var(--void-border)", background: "oklch(0.09 0.022 280)" }}
          >
            {QUICK_CMDS.map((cmd) => (
              <button
                key={cmd}
                className="font-data text-[10px] px-2.5 py-1 rounded border transition-all duration-150"
                style={{ color: "var(--text-secondary)", borderColor: "var(--void-border)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--electric)";
                  e.currentTarget.style.borderColor = "oklch(0.72 0.22 255 / 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.borderColor = "var(--void-border)";
                }}
                onClick={() => { handleCommand(cmd); inputRef.current?.focus(); }}
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Keyboard hints */}
        <div className="flex items-center gap-5 mt-4">
          {[
            { key: "↑↓", desc: "command history" },
            { key: "Tab", desc: "autocomplete" },
            { key: "Esc", desc: "dismiss suggestions" },
            { key: "Enter", desc: "execute" },
          ].map((hint) => (
            <div key={hint.key} className="flex items-center gap-1.5">
              <kbd
                className="font-data text-[10px] px-1.5 py-0.5 rounded border"
                style={{ color: "var(--text-dim)", borderColor: "var(--void-border)", background: "var(--void-raised)" }}
              >
                {hint.key}
              </kbd>
              <span className="font-data text-[10px]" style={{ color: "var(--text-dim)" }}>
                {hint.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
