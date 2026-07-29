import { useState,useEffect } from "react";
import PlayerCard from "../Component/PlayerCard";
import RadarChart from "../Component/RadarChart";
import ExplanationPanel from "../Component/ExplanationPanel";
import TCBadge from "../Component/TCBadge";
import CodeBlock from "../Component/CodeBlock";
import { useParams } from "react-router-dom";


export default function VerdictDashboard() {
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [aiStatus, setAiStatus] = useState(null);
  const {roomCode}=useParams()
  console.log(roomCode);


useEffect(() => {

  fetch(`http://localhost:8081/api/judge/verdict/${roomCode}`)
    .then(r => r.json())
    .then(setVerdict)
    .finally(() => setLoading(false));

  fetch('http://localhost:8081/api/judge/ai-status')
    .then(r => r.json())
    .then(setAiStatus);
}, [roomCode]);

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#0F0A1E",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 16
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        border: "3px solid #7C3AED", borderTopColor: "transparent",
        animation: "spin 0.8s linear infinite"
      }} />
      <div style={{ color: "#6B7280", fontSize: 14 }}>Loading battle analysis...</div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!verdict) return (
    <div style={{ minHeight: "100vh", background: "#0F0A1E", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: "#EF4444" }}>Failed to load verdict</div>
    </div>
  );
  const difficultyColor = (d) =>
  d === "EASY" ? "#10B981" : d === "MEDIUM" ? "#F59E0B" : "#EF4444";
  const scores1 = JSON.parse(verdict.player1ScoresJson || "{}");
  const scores2 = JSON.parse(verdict.player2ScoresJson || "{}");
  const p1Name = verdict.player1Email?.split("@")[0];
  const p2Name = verdict.player2Email?.split("@")[0];
  const p1Winner = verdict.algorithmicWinnerEmail === verdict.player1Email;
  const p2Winner = verdict.algorithmicWinnerEmail === verdict.player2Email;
  const winnerName = verdict.algorithmicWinnerEmail?.split("@")[0];
  const loserTC = p1Winner ? verdict.player2DetectedComplexity : verdict.player1DetectedComplexity;
  const winnerTC = p1Winner ? verdict.player1DetectedComplexity : verdict.player2DetectedComplexity;

  const tabs = ["overview", "comparison", "optimal"];

  return (
    <div style={{
      minHeight: "100vh", background: "#0F0A1E",
      fontFamily: "Inter, system-ui, sans-serif", color: "#E2D9F3"
    }}>
      {/* Top bar */}
      <div style={{
        borderBottom: "1px solid rgba(124,58,237,0.15)",
        padding: "12px 32px", display: "flex",
        justifyContent: "space-between", alignItems: "center",
        background: "rgba(15,10,30,0.9)", position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(10px)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: "#7C3AED",
            boxShadow: "0 0 8px #7C3AED"
          }} />
          <span style={{ fontWeight: 700, fontSize: 15 }}>DevArena</span>
          <span style={{ color: "#4B3F72", fontSize: 14 }}>/</span>
          <span style={{ color: "#9CA3AF", fontSize: 14 }}>Battle Analysis</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {aiStatus && (
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: aiStatus.aiStatus === "UP" ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${aiStatus.aiStatus === "UP" ? "#10B98133" : "#EF444433"}`,
              borderRadius: 20, padding: "4px 12px", fontSize: 11
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%",
                background: aiStatus.aiStatus === "UP" ? "#10B981" : "#EF4444"
              }} />
              <span style={{ color: aiStatus.aiStatus === "UP" ? "#10B981" : "#EF4444" }}>
                AI {aiStatus.aiStatus}
              </span>
            </div>
          )}
          <div style={{
            background: "rgba(255,255,255,0.05)", borderRadius: 6,
            padding: "4px 10px", fontSize: 11, color: "#6B7280"
          }}>
            Room {verdict.roomCode}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Hero verdict banner */}
        <div style={{
          background: "linear-gradient(135deg, #1E1535 0%, #12092B 100%)",
          border: "1px solid rgba(124,58,237,0.25)", borderRadius: 16,
          padding: "28px 32px", marginBottom: 28,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 20
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{
                background: difficultyColor(verdict.problemDifficulty) + "22",
                color: difficultyColor(verdict.problemDifficulty),
                border: `1px solid ${difficultyColor(verdict.problemDifficulty)}44`,
                borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 700
              }}>{verdict.problemDifficulty}</span>
              <span style={{ color: "#4B3F72", fontSize: 12 }}>#{verdict.problemId}</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#E2D9F3" }}>
              {verdict.problemTitle}
            </h1>
            <div style={{ marginTop: 8, color: "#6B7280", fontSize: 13 }}>
              {new Date(verdict.createdAt).toLocaleString()}
            </div>
          </div>

          {/* Winner callout */}
          <div style={{
            background: "rgba(16,185,129,0.08)", border: "1px solid #10B98133",
            borderRadius: 12, padding: "16px 24px", textAlign: "center"
          }}>
            <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>
              Algorithmic Winner
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#10B981" }}>
              {winnerName}
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
              {winnerTC} vs {loserTC}
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div style={{
          display: "flex", gap: 4, marginBottom: 24,
          background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 4
        }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "9px 0", borderRadius: 7, border: "none",
              background: tab === t ? "rgba(124,58,237,0.2)" : "transparent",
              color: tab === t ? "#A78BFA" : "#6B7280",
              fontSize: 13, fontWeight: tab === t ? 600 : 400,
              cursor: "pointer", transition: "all 0.2s",
              borderBottom: tab === t ? "2px solid #7C3AED" : "2px solid transparent"
            }}>
              {t === "overview" ? "Overview" : t === "comparison" ? "Side by Side" : "Optimal Solution"}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Player stat cards */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <PlayerCard
                email={verdict.player1Email}
                tc={verdict.player1DetectedComplexity}
                sc={verdict.player1SpaceComplexity}
                pattern={verdict.player1AlgorithmPattern}
                dataStructures={verdict.player1DataStructures}
                scoresJson={verdict.player1ScoresJson}
                isWinner={p1Winner}
                side="Player 1"
              />
              <PlayerCard
                email={verdict.player2Email}
                tc={verdict.player2DetectedComplexity}
                sc={verdict.player2SpaceComplexity}
                pattern={verdict.player2AlgorithmPattern}
                dataStructures={verdict.player2DataStructures}
                scoresJson={verdict.player2ScoresJson}
                isWinner={p2Winner}
                side="Player 2"
              />
            </div>

            {/* Radar chart + AI Explanation side by side */}
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {/* Radar */}
              <div style={{
                background: "#1E1535", borderRadius: 14,
                border: "1px solid rgba(124,58,237,0.15)",
                padding: "24px", display: "flex",
                flexDirection: "column", alignItems: "center", gap: 16,
                minWidth: 300, flex: "0 0 auto"
              }}>
                <div style={{ fontSize: 12, color: "#6B7280", textTransform: "uppercase", letterSpacing: 2 }}>
                  Performance Radar
                </div>
                <RadarChart scores1={scores1} scores2={scores2} label1={p1Name} label2={p2Name} />
              </div>

              {/* Key insight cards */}
              <div style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>
                  Quick Insights
                </div>
                {[
                  {
                    icon: "⚡",
                    label: "Speed difference",
                    value: `${verdict.player1DetectedComplexity} vs ${verdict.player2DetectedComplexity}`,
                    sub: "Time complexity gap between approaches"
                  },
                  {
                    icon: "🏆",
                    label: "Algorithmic winner",
                    value: verdict.algorithmicWinnerEmail?.split("@")[0],
                    sub: "Based on TC, SC, approach and code quality"
                  },
                  {
                    icon: "🎯",
                    label: "Optimal approach",
                    value: verdict.optimalTimeComplexity,
                    sub: "Best possible time complexity for this problem"
                  },
                  {
                    icon: "💡",
                    label: "Key pattern",
                    value: p2Winner
                      ? verdict.player2AlgorithmPattern
                      : verdict.player1AlgorithmPattern,
                    sub: "Pattern used by the algorithmic winner"
                  },
                ].map(({ icon, label, value, sub }) => (
                  <div key={label} style={{
                    background: "#1E1535", borderRadius: 10,
                    border: "1px solid rgba(124,58,237,0.12)",
                    padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 14
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10,
                      background: "rgba(124,58,237,0.1)",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: 18, flexShrink: 0
                    }}>{icon}</div>
                    <div>
                      <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 3 }}>{label}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#E2D9F3", fontFamily: "monospace" }}>{value}</div>
                      <div style={{ fontSize: 11, color: "#4B3F72", marginTop: 2 }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Full AI Explanation Panel */}
            <ExplanationPanel verdict={verdict} p1Winner={p1Winner} p2Winner={p2Winner} />

          </div>
        )}

        {/* COMPARISON TAB */}
        {tab === "comparison" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { label: "Time Complexity", v1: verdict.player1DetectedComplexity, v2: verdict.player2DetectedComplexity, type: "badge" },
              { label: "Space Complexity", v1: verdict.player1SpaceComplexity, v2: verdict.player2SpaceComplexity, type: "badge" },
              { label: "Algorithm Pattern", v1: verdict.player1AlgorithmPattern, v2: verdict.player2AlgorithmPattern, type: "text" },
              { label: "Data Structures", v1: verdict.player1DataStructures || "None", v2: verdict.player2DataStructures || "None", type: "text" },
              { label: "Quality Score", v1: verdict.player1QualityScore + "/100", v2: verdict.player2QualityScore + "/100", type: "text" },
            ].map(({ label, v1, v2, type }) => (
              <div key={label} style={{
                background: "#1E1535", borderRadius: 10,
                border: "1px solid rgba(124,58,237,0.12)",
                display: "grid", gridTemplateColumns: "1fr auto 1fr"
              }}>
                <div style={{ padding: "16px 20px", textAlign: "right" }}>
                  {type === "badge" ? <TCBadge tc={v1} /> :
                    <span style={{ color: "#C4B5D9", fontSize: 14 }}>{v1}</span>}
                </div>
                <div style={{
                  padding: "16px 20px", borderLeft: "1px solid rgba(124,58,237,0.1)",
                  borderRight: "1px solid rgba(124,58,237,0.1)",
                  display: "flex", alignItems: "center",
                  color: "#4B3F72", fontSize: 11, textAlign: "center",
                  textTransform: "uppercase", letterSpacing: 1, minWidth: 130
                }}>
                  {label}
                </div>
                <div style={{ padding: "16px 20px" }}>
                  {type === "badge" ? <TCBadge tc={v2} /> :
                    <span style={{ color: "#C4B5D9", fontSize: 14 }}>{v2}</span>}
                </div>
              </div>
            ))}

            {/* Code comparison */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8
            }}>
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                  {p1Name}'s Code
                </div>
                <CodeBlock code={verdict.player1Code} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
                  {p2Name}'s Code
                </div>
                <CodeBlock code={verdict.player2Code} />
              </div>
            </div>
          </div>
        )}

        {/* OPTIMAL SOLUTION TAB */}
        {tab === "optimal" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Approach explanation */}
            <div style={{
              background: "#1E1535", borderRadius: 14,
              border: "1px solid rgba(16,185,129,0.2)",
              padding: "24px"
            }}>
              <div style={{ fontSize: 11, color: "#10B981", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
                Optimal Approach
              </div>
              <p style={{ margin: 0, color: "#C4B5D9", lineHeight: 1.8, fontSize: 15 }}>
                {verdict.optimalApproach}
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                <div style={{
                  background: "rgba(16,185,129,0.1)", border: "1px solid #10B98133",
                  borderRadius: 8, padding: "10px 18px", textAlign: "center"
                }}>
                  <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Time</div>
                  <div style={{ fontFamily: "monospace", color: "#10B981", fontWeight: 700 }}>
                    {verdict.optimalTimeComplexity}
                  </div>
                </div>
                <div style={{
                  background: "rgba(16,185,129,0.1)", border: "1px solid #10B98133",
                  borderRadius: 8, padding: "10px 18px", textAlign: "center"
                }}>
                  <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 4 }}>Space</div>
                  <div style={{ fontFamily: "monospace", color: "#10B981", fontWeight: 700 }}>
                    {verdict.optimalSpaceComplexity}
                  </div>
                </div>
              </div>
            </div>

            {/* Optimal code */}
            {verdict.optimalSolutionCode && (
              <div>
                <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 10, textTransform: "uppercase", letterSpacing: 2 }}>
                  Optimal Solution
                </div>
                <CodeBlock code={verdict.optimalSolutionCode} language="java" />
              </div>
            )}

            {/* What both players did vs optimal */}
            <div style={{
              background: "#1E1535", borderRadius: 14,
              border: "1px solid rgba(124,58,237,0.15)", padding: "24px"
            }}>
              <div style={{ fontSize: 11, color: "#7C3AED", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
                How You Could Have Thought Differently
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { player: p1Name, pattern: verdict.player1AlgorithmPattern, tc: verdict.player1DetectedComplexity, isWinner: p1Winner },
                  { player: p2Name, pattern: verdict.player2AlgorithmPattern, tc: verdict.player2DetectedComplexity, isWinner: p2Winner },
                ].map(({ player, pattern, tc, isWinner }) => (
                  <div key={player} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "12px 16px", background: "rgba(0,0,0,0.2)",
                    borderRadius: 8, border: `1px solid ${isWinner ? "#10B98122" : "rgba(255,255,255,0.04)"}`
                  }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%",
                      background: isWinner ? "rgba(16,185,129,0.15)" : "rgba(124,58,237,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, color: isWinner ? "#10B981" : "#7C3AED",
                      flexShrink: 0
                    }}>
                      {player?.[0]?.toUpperCase()}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#E2D9F3", marginBottom: 3 }}>{player}</div>
                      <div style={{ fontSize: 12, color: "#6B7280" }}>{pattern}</div>
                    </div>
                    <TCBadge tc={tc} />
                    <span style={{ color: "#4B3F72", fontSize: 14 }}>→</span>
                    <TCBadge tc={verdict.optimalTimeComplexity} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}