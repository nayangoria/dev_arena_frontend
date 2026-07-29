import TCBadge from "./TCBadge";
import ScoreBar from "./ScoreBar";
export default function PlayerCard({ email, tc, sc, pattern, dataStructures, scoresJson, isWinner, side }) {
  const scores = JSON.parse(scoresJson || "{}");
  const name = email?.split("@")[0] || "Player";
  const overall = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
  );
  const accent = isWinner ? "#10B981" : "#7C3AED";

  return (
    <div style={{
      background: "#1E1535", borderRadius: 14,
      border: `1px solid ${isWinner ? "#10B98133" : "rgba(124,58,237,0.2)"}`,
      overflow: "hidden", flex: 1, minWidth: 0,
      boxShadow: isWinner ? "0 0 30px rgba(16,185,129,0.08)" : "none"
    }}>
      {/* Header */}
      <div style={{
        padding: "16px 20px",
        background: isWinner ? "rgba(16,185,129,0.08)" : "rgba(124,58,237,0.06)",
        borderBottom: `1px solid ${isWinner ? "#10B98122" : "rgba(124,58,237,0.15)"}`,
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div>
          <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 3, textTransform: "uppercase", letterSpacing: 1 }}>
            {side}
          </div>
          <div style={{ fontWeight: 700, color: "#E2D9F3", fontSize: 15 }}>{name}</div>
        </div>
        {isWinner && (
          <div style={{
            background: "rgba(16,185,129,0.15)", border: "1px solid #10B98133",
            color: "#10B981", borderRadius: 20, padding: "4px 12px",
            fontSize: 11, fontWeight: 700, letterSpacing: 1
          }}>
            ALGO WINNER
          </div>
        )}
      </div>

      {/* Stats */}
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <TCBadge tc={tc} />
          <span style={{
            background: "rgba(255,255,255,0.05)", color: "#9CA3AF",
            borderRadius: 6, padding: "3px 10px", fontSize: 12, fontFamily: "monospace"
          }}>Space: {sc}</span>
        </div>

        <div style={{
          background: "rgba(124,58,237,0.08)", borderRadius: 8,
          padding: "10px 14px", fontSize: 13, color: "#A78BFA"
        }}>
          {pattern}
        </div>

        {dataStructures && (
          <div style={{ fontSize: 12, color: "#6B7280" }}>
            Data structures: <span style={{ color: "#9CA3AF" }}>{dataStructures}</span>
          </div>
        )}

        {/* Score bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
          {[
            { label: "Correctness", key: "correctness" },
            { label: "Time Complexity", key: "timeComplexity" },
            { label: "Code Quality", key: "codeQuality" },
            { label: "Readability", key: "readability" },
            { label: "Approach", key: "approach" },
          ].map(({ label, key }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: "#6B7280", width: 110, flexShrink: 0 }}>{label}</span>
              <ScoreBar value={scores[key] || 0} color={accent} />
              <span style={{ fontSize: 11, color: accent, width: 28, textAlign: "right", fontWeight: 600 }}>
                {scores[key] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Overall score */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 12, marginTop: 4
        }}>
          <span style={{ fontSize: 12, color: "#6B7280" }}>Overall Score</span>
          <span style={{ fontSize: 22, fontWeight: 800, color: accent }}>{overall}</span>
        </div>
      </div>
    </div>
  );
}
