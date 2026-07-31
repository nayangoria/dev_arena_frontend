
import { VerdictStatusPill } from "./VerdictStatusPill";
import { useState,useEffect } from "react";


export function BattleCard({ room, myEmail, verdict, onAnalyzeClick, onViewClick }) {
  const opponent = getOpponent(room, myEmail);
  const opponentName = getOpponentName(opponent);
  const hasVerdict = verdict && verdict.status === "COMPLETED";
//   const isPending = verdict && (verdict.status === "PENDING" || verdict.status === "PROCESSING");
  const hasFailed = verdict && verdict.status === "FAILED";
  const noAnalysis = !verdict;
 const [now, setNow] = useState(() => Date.now());

useEffect(() => {
  const id = setInterval(() => setNow(Date.now()), 60000);
  return () => clearInterval(id);
}, []);
  function getOpponent (room, myEmail) {
  return room.player1Email === myEmail ? room.player2Email : room.player1Email;
}
function getOpponentName  (email) { 
  return email?.split("@")[0] || "Unknown";
}
function timeAgo (dateStr)  {
  // captured once, doesn't change on re-render

  if (!dateStr) return "Unknown";
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};
 
 
  // Determine if I won algorithmically
  const iAlgoWon = verdict?.algorithmicWinnerEmail === myEmail;
  const myTC = verdict
    ? (verdict.player1Email === myEmail
      ? verdict.player1DetectedComplexity
      : verdict.player2DetectedComplexity)
    : null;
 
  return (
    <div style={{
      background: "#1E1535", borderRadius: 14,
      border: `1px solid ${hasVerdict && iAlgoWon ? "rgba(16,185,129,0.2)" : "rgba(124,58,237,0.12)"}`,
      padding: "20px", display: "flex",
      alignItems: "center", gap: 16,
      cursor: hasVerdict ? "pointer" : "default",
      transition: "all 0.2s",
      boxShadow: hasVerdict && iAlgoWon ? "0 0 20px rgba(16,185,129,0.05)" : "none"
    }}
      onClick={hasVerdict ? () => onViewClick(room.roomCode) : undefined}
      onMouseEnter={e => {
        if (hasVerdict) e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
      }}
      onMouseLeave={e => {
        if (hasVerdict)
          e.currentTarget.style.borderColor = iAlgoWon
            ? "rgba(16,185,129,0.2)" : "rgba(124,58,237,0.12)";
      }}
    >
      {/* Left — opponent avatar */}
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: "rgba(124,58,237,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 700, color: "#7C3AED"
      }}>
        {opponentName[0]?.toUpperCase()}
      </div>
 
      {/* Middle — battle info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 600, color: "#E2D9F3", fontSize: 14 }}>
            vs {opponentName}
          </span>
          {hasVerdict && iAlgoWon && (
            <span style={{
              background: "rgba(16,185,129,0.15)", color: "#10B981",
              border: "1px solid #10B98133", borderRadius: 10,
              padding: "1px 8px", fontSize: 10, fontWeight: 700
            }}>ALGO WIN</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "monospace", fontSize: 11,
            color: "#4B3F72", background: "rgba(255,255,255,0.03)",
            padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.05)"
          }}>
            #{room.roomCode}
          </span>
          {myTC && (
            <span style={{
              fontFamily: "monospace", fontSize: 11,
              color: "#7C3AED", background: "rgba(124,58,237,0.08)",
              padding: "2px 8px", borderRadius: 4
            }}>
              Your TC: {myTC}
            </span>
          )}
          {verdict?.createdAt && (
            <span style={{ fontSize: 11, color: "#4B3F72" }}>
              {timeAgo(verdict.createdAt)}
            </span>
          )}
        </div>
      </div>
 
      {/* Right — status + action */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <VerdictStatusPill status={verdict?.status || "NONE"} />
 
        {/* Action button */}
        {noAnalysis && (
          <button onClick={(e) => { e.stopPropagation(); onAnalyzeClick(room); }}
            style={{
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(124,58,237,0.3)",
              color: "#A78BFA", borderRadius: 8,
              padding: "6px 12px", fontSize: 12,
              cursor: "pointer", fontWeight: 600
            }}>
            Analyze
          </button>
        )}
 
        {hasFailed && (
          <button onClick={(e) => { e.stopPropagation(); onAnalyzeClick(room); }}
            style={{
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.3)",
              color: "#EF4444", borderRadius: 8,
              padding: "6px 12px", fontSize: 12,
              cursor: "pointer", fontWeight: 600
            }}>
            Retry
          </button>
        )}
 
        {hasVerdict && (
          <span style={{ color: "#4B3F72", fontSize: 16 }}>→</span>
        )}
      </div>
    </div>
  );
}