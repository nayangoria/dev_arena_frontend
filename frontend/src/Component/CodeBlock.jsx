import { useState } from "react";
export default function CodeBlock({ code, language = "java" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", borderRadius: 10, overflow: "hidden", background: "#0A0614" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "8px 16px", background: "rgba(124,58,237,0.15)",
        borderBottom: "1px solid rgba(124,58,237,0.2)"
      }}>
        <span style={{ fontSize: 11, color: "#7C3AED", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>
          {language}
        </span>
        <button onClick={copy} style={{
          background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
          color: copied ? "#10B981" : "#9CA3AF", borderRadius: 4,
          padding: "2px 10px", fontSize: 11, cursor: "pointer"
        }}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{
        margin: 0, padding: "16px", overflowX: "auto",
        fontFamily: "'Fira Code', 'Cascadia Code', monospace",
        fontSize: 13, lineHeight: 1.7, color: "#E2D9F3"
      }}><code>{code}</code></pre>
    </div>
  );
}