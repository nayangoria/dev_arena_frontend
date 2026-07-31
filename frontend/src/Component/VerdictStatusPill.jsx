export function VerdictStatusPill({ status }) {
  const config = {
    COMPLETED: { color: "#10B981", bg: "rgba(16,185,129,0.1)", label: "Analysis Ready" },
    PROCESSING: { color: "#F59E0B", bg: "rgba(245,158,11,0.1)", label: "Analyzing..." },
    PENDING: { color: "#6B7280", bg: "rgba(107,114,128,0.1)", label: "Pending" },
    FAILED: { color: "#EF4444", bg: "rgba(239,68,68,0.1)", label: "AI Failed" },
    NONE: { color: "#4B3F72", bg: "rgba(75,63,114,0.1)", label: "Not Analyzed" },
  };
  const c = config[status] || config.NONE;
  return (
    <span style={{
      background: c.bg, color: c.color,
      border: `1px solid ${c.color}33`,
      borderRadius: 20, padding: "3px 10px",
      fontSize: 11, fontWeight: 600
    }}>
      {status === "PROCESSING" && (
        <span style={{ marginRight: 4, animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span>
      )}
      {c.label}
    </span>
  );
}