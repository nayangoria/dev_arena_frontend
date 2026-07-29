export default function ExplanationBlock({ text, accent = "#7C3AED" }) {
  if (!text) return null;

  // Skip the first 3 lines (TC/SC/PATTERN header — already shown in card)
  const fullText = text.replace(/^TIME COMPLEXITY:.*\nSPACE COMPLEXITY:.*\nALGORITHM PATTERN:.*\n\n/, "");
  const sections = fullText.split("\n\n").filter(Boolean);

  const sectionIcons = {
    "ANALYSIS": "🔍",
    "WHAT WORKED": "✅",
    "MAIN ISSUE": "⚠️",
    "HOW TO IMPROVE": "💡",
    "ALTERNATIVE APPROACH": "🔄",
    "INTERVIEW TIP": "🎯",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {sections.map((section, i) => {
        const lines = section.split("\n");
        const header = lines[0];
        const body = lines.slice(1).join("\n").trim();
        const isHeader = header.match(/^[A-Z\s]+:/);

        if (!isHeader) return (
          <p key={i} style={{ margin: 0, color: "#C4B5D9", lineHeight: 1.8, fontSize: 14 }}>{section}</p>
        );

        const headerKey = header.replace(":", "").trim();
        const icon = sectionIcons[headerKey] || "•";

        return (
          <div key={i} style={{
            background: "rgba(0,0,0,0.15)", borderRadius: 10,
            padding: "14px 16px",
            borderLeft: `3px solid ${accent}44`
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: 1.5,
              color: accent, marginBottom: 8,
              display: "flex", alignItems: "center", gap: 6
            }}>
              <span>{icon}</span>
              <span>{headerKey}</span>
            </div>
            <p style={{ margin: 0, color: "#C4B5D9", lineHeight: 1.8, fontSize: 14 }}>{body}</p>
          </div>
        );
      })}
    </div>
  );
}
