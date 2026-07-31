export function EloRing({ elo }) {
  const max = 2000;
  const pct = Math.min(elo / max, 1);
  const r = 54;
  const circ = 2 * Math.PI * r;
  const dash = pct * circ;
 
  const color = elo >= 1600 ? "#F59E0B" : elo >= 1200 ? "#7C3AED" : "#10B981";
  const rank = elo >= 1600 ? "Expert" : elo >= 1200 ? "Advanced" : "Beginner";
 
  return (
    <div style={{ position: "relative", width: 130, height: 130 }}>
      <svg width="130" height="130" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="65" cy="65" r={r} fill="none"
          stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle cx="65" cy="65" r={r} fill="none"
          stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 1.2s ease" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center"
      }}>
        <div style={{ fontSize: 24, fontWeight: 800, color }}>{elo}</div>
        <div style={{ fontSize: 11, color: "#6B7280" }}>ELO</div>
        <div style={{ fontSize: 10, color, fontWeight: 600, marginTop: 2 }}>{rank}</div>
      </div>
    </div>
  );
}