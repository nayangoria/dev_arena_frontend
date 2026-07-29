import { useState } from "react";
import ExplanationBlock from "./ExplanationBlock";
export default function ExplanationPanel({ verdict, p1Winner, p2Winner }) {
  const [activePlayer, setActivePlayer] = useState("player1");
  const p1Name = verdict.player1Email?.split("@")[0];
  const p2Name = verdict.player2Email?.split("@")[0];
  const explanation = activePlayer === "player1"
    ? verdict.player1Explanation
    : verdict.player2Explanation;
  const accent = activePlayer === "player1"
    ? (p1Winner ? "#10B981" : "#7C3AED")
    : (p2Winner ? "#10B981" : "#7C3AED");

  return (
    <div style={{
      background: "#1E1535", borderRadius: 14,
      border: "1px solid rgba(124,58,237,0.15)", overflow: "hidden"
    }}>
      {/* Panel header with player switcher */}
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid rgba(124,58,237,0.12)",
        display: "flex", justifyContent: "space-between", alignItems: "center"
      }}>
        <div style={{ fontSize: 11, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 2, fontWeight: 700 }}>
          AI Analysis
        </div>
        {/* Player switcher tabs */}
        <div style={{
          display: "flex", background: "rgba(0,0,0,0.3)",
          borderRadius: 8, padding: 3, gap: 2
        }}>
          {[
            { key: "player1", name: p1Name, winner: p1Winner },
            { key: "player2", name: p2Name, winner: p2Winner },
          ].map(({ key, name, winner }) => (
            <button key={key} onClick={() => setActivePlayer(key)} style={{
              padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer",
              fontSize: 12, fontWeight: activePlayer === key ? 600 : 400,
              background: activePlayer === key
                ? (winner ? "rgba(16,185,129,0.2)" : "rgba(124,58,237,0.2)")
                : "transparent",
              color: activePlayer === key
                ? (winner ? "#10B981" : "#A78BFA")
                : "#6B7280",
              transition: "all 0.2s"
            }}>
              {name}
              {winner && activePlayer === key && (
                <span style={{ marginLeft: 6, fontSize: 10 }}>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Explanation content */}
      <div style={{ padding: "24px" }}>
        <ExplanationBlock text={explanation} accent={accent} />
      </div>
    </div>
  );
}
