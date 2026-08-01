import { useState, useEffect } from "react";
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
  const { roomCode } = useParams();
  const AI_JUDGE_API = import.meta.env.VITE_AI_JUDGE_API || "http://localhost:8081";
  console.log(AI_JUDGE_API);

  useEffect(() => {
    if (!roomCode) return;

    let cancelled = false;

    fetch(`${AI_JUDGE_API}/api/judge/verdict/room/${roomCode}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setVerdict(data);
      })
      .catch(() => {
        if (!cancelled) setVerdict(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    fetch(`${AI_JUDGE_API}/api/judge/health`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setAiStatus(data);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [roomCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0A1E] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-[3px] border-violet-600 border-t-transparent animate-spin" />
        <p className="text-gray-500 text-sm">Loading battle analysis...</p>
      </div>
    );
  }

  if (!verdict) {
    return (
      <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center">
        <p className="text-red-500">Failed to load verdict</p>
      </div>
    );
  }

  const difficultyColor = (d) =>
    d === "EASY"
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
      : d === "MEDIUM"
        ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
        : "text-red-400 bg-red-500/10 border-red-500/25";

  const scores1 = JSON.parse(verdict.player1ScoresJson || "{}");
  const scores2 = JSON.parse(verdict.player2ScoresJson || "{}");
  const p1Name = verdict.player1Email?.split("@")[0];
  const p2Name = verdict.player2Email?.split("@")[0];
  const p1Winner = verdict.algorithmicWinnerEmail === verdict.player1Email;
  const p2Winner = verdict.algorithmicWinnerEmail === verdict.player2Email;
  const winnerName = verdict.algorithmicWinnerEmail?.split("@")[0];
  const loserTC = p1Winner
    ? verdict.player2DetectedComplexity
    : verdict.player1DetectedComplexity;
  const winnerTC = p1Winner
    ? verdict.player1DetectedComplexity
    : verdict.player2DetectedComplexity;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "comparison", label: "Side by Side" },
    { id: "optimal", label: "Optimal Solution" },
  ];

  const isAiUp = aiStatus?.aiStatus === "UP" || aiStatus?.status === "UP";

  return (
    <div className="min-h-screen bg-[#0F0A1E] font-sans text-[#E2D9F3]">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-violet-500/15 bg-[rgba(15,10,30,0.9)] backdrop-blur-[10px]">
        <div className="flex items-center justify-between px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-600 shadow-[0_0_8px_#7C3AED]" />
            <span className="font-bold text-[15px]">DevArena</span>
            <span className="text-[#4B3F72] text-sm">/</span>
            <span className="text-gray-400 text-sm">Battle Analysis</span>
          </div>

          <div className="flex items-center gap-2.5">
            {aiStatus && (
              <div
                className={`
                  flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium
                  border transition-all duration-300
                  ${
                    isAiUp
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }
                `}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isAiUp ? "bg-emerald-400" : "bg-red-400"
                  }`}
                />
                AI {isAiUp ? "UP" : "DOWN"}
              </div>
            )}
            <div className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-gray-500">
              Room {verdict.roomCode}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-275 mx-auto px-6 py-8">
        {/* Hero verdict banner */}
        <section
          className="
            mb-7 flex flex-wrap items-center justify-between gap-5
            rounded-2xl border border-violet-500/25
            bg-linear-to-br from-[#1E1535] to-[#12092B]
            px-8 py-7
            transition-all duration-300
            hover:border-violet-500/40 hover:shadow-[0_8px_32px_rgba(124,58,237,0.12)]
          "
        >
          <div>
            <div className="mb-2 flex items-center gap-2.5">
              <span
                className={`
                  rounded px-2 py-0.5 text-[11px] font-bold border
                  ${difficultyColor(verdict.problemDifficulty)}
                `}
              >
                {verdict.problemDifficulty}
              </span>
              <span className="text-[#4B3F72] text-xs">#{verdict.problemId}</span>
            </div>
            <h1 className="m-0 text-[26px] font-extrabold text-[#E2D9F3]">
              {verdict.problemTitle}
            </h1>
            <p className="mt-2 text-[13px] text-gray-500">
              {new Date(verdict.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Winner callout */}
          <div
            className="
              rounded-xl border border-emerald-500/20 bg-emerald-500/10
              px-6 py-4 text-center
              transition-transform duration-300 hover:scale-[1.02]
            "
          >
            <p className="mb-1.5 text-[11px] uppercase tracking-wider text-gray-500">
              Algorithmic Winner
            </p>
            <p className="text-xl font-extrabold text-emerald-400">{winnerName}</p>
            <p className="mt-1 text-xs text-gray-500">
              {winnerTC} vs {loserTC}
            </p>
          </div>
        </section>

        {/* Tab navigation */}
        <div className="mb-6 flex gap-1 rounded-[10px] bg-white/3 p-1">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`
                flex-1 rounded-md py-2.5 text-[13px] cursor-pointer
                border-b-2 transition-all duration-200
                ${
                  tab === id
                    ? "bg-violet-600/20 text-violet-300 font-semibold border-violet-600"
                    : "bg-transparent text-gray-500 font-normal border-transparent hover:text-gray-300 hover:bg-white/3"
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────────────────── */}
        {tab === "overview" && (
          <div className="flex flex-col gap-6 animate-[fadeIn_0.35s_ease]">
            {/* Player cards */}
            <div className="flex flex-wrap gap-5">
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

            {/* Radar + insights */}
            <div className="flex flex-wrap gap-5">
              <div
                className="
                  flex min-w-75 flex-col items-center gap-4
                  rounded-[14px] border border-violet-500/15 bg-[#1E1535]
                  p-6
                  transition-all duration-300
                  hover:border-violet-500/30
                "
              >
                <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
                  Performance Radar
                </p>
                <RadarChart
                  scores1={scores1}
                  scores2={scores2}
                  label1={p1Name}
                  label2={p2Name}
                />
              </div>

              <div className="flex min-w-70 flex-1 flex-col gap-3">
                <p className="mb-1 text-[11px] uppercase tracking-[0.15em] text-gray-500">
                  Quick Insights
                </p>
                {[
                  {
                    icon: "⚡",
                    label: "Speed difference",
                    value: `${verdict.player1DetectedComplexity} vs ${verdict.player2DetectedComplexity}`,
                    sub: "Time complexity gap between approaches",
                  },
                  {
                    icon: "🏆",
                    label: "Algorithmic winner",
                    value: verdict.algorithmicWinnerEmail?.split("@")[0],
                    sub: "Based on TC, SC, approach and code quality",
                  },
                  {
                    icon: "🎯",
                    label: "Optimal approach",
                    value: verdict.optimalTimeComplexity,
                    sub: "Best possible time complexity for this problem",
                  },
                  {
                    icon: "💡",
                    label: "Key pattern",
                    value: p2Winner
                      ? verdict.player2AlgorithmPattern
                      : verdict.player1AlgorithmPattern,
                    sub: "Pattern used by the algorithmic winner",
                  },
                ].map(({ icon, label, value, sub }) => (
                  <div
                    key={label}
                    className="
                      flex items-center gap-3.5 rounded-[10px]
                      border border-violet-500/10 bg-[#1E1535]
                      px-4 py-3.5
                      transition-all duration-300
                      hover:-translate-y-0.5 hover:border-violet-500/25
                      hover:shadow-[0_4px_16px_rgba(124,58,237,0.1)]
                    "
                  >
                    <div className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-violet-600/10 text-lg">
                      {icon}
                    </div>
                    <div>
                      <p className="mb-0.5 text-[11px] text-gray-500">{label}</p>
                      <p className="font-mono text-sm font-semibold text-[#E2D9F3]">
                        {value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#4B3F72]">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ExplanationPanel
              verdict={verdict}
              p1Winner={p1Winner}
              p2Winner={p2Winner}
            />
          </div>
        )}

        {/* ── COMPARISON ──────────────────────────────────────────── */}
        {tab === "comparison" && (
          <div className="flex flex-col gap-4 animate-[fadeIn_0.35s_ease]">
            {[
              {
                label: "Time Complexity",
                v1: verdict.player1DetectedComplexity,
                v2: verdict.player2DetectedComplexity,
                type: "badge",
              },
              {
                label: "Space Complexity",
                v1: verdict.player1SpaceComplexity,
                v2: verdict.player2SpaceComplexity,
                type: "badge",
              },
              {
                label: "Algorithm Pattern",
                v1: verdict.player1AlgorithmPattern,
                v2: verdict.player2AlgorithmPattern,
                type: "text",
              },
              {
                label: "Data Structures",
                v1: verdict.player1DataStructures || "None",
                v2: verdict.player2DataStructures || "None",
                type: "text",
              },
              {
                label: "Quality Score",
                v1: `${verdict.player1QualityScore}/100`,
                v2: `${verdict.player2QualityScore}/100`,
                type: "text",
              },
            ].map(({ label, v1, v2, type }) => (
              <div
                key={label}
                className="
                  grid grid-cols-[1fr_auto_1fr]
                  rounded-[10px] border border-violet-500/10 bg-[#1E1535]
                  transition-all duration-300
                  hover:border-violet-500/25
                "
              >
                <div className="px-5 py-4 text-right">
                  {type === "badge" ? (
                    <TCBadge tc={v1} />
                  ) : (
                    <span className="text-sm text-[#C4B5D9]">{v1}</span>
                  )}
                </div>
                <div
                  className="
                    flex min-w-32.5 items-center justify-center
                    border-x border-violet-500/10 px-5 py-4
                    text-center text-[11px] uppercase tracking-wider text-[#4B3F72]
                  "
                >
                  {label}
                </div>
                <div className="px-5 py-4">
                  {type === "badge" ? (
                    <TCBadge tc={v2} />
                  ) : (
                    <span className="text-sm text-[#C4B5D9]">{v2}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Code side-by-side */}
            <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">
                  {p1Name}&apos;s Code
                </p>
                <CodeBlock code={verdict.player1Code} />
              </div>
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-wider text-gray-500">
                  {p2Name}&apos;s Code
                </p>
                <CodeBlock code={verdict.player2Code} />
              </div>
            </div>
          </div>
        )}

        {/* ── OPTIMAL ─────────────────────────────────────────────── */}
        {tab === "optimal" && (
          <div className="flex flex-col gap-5 animate-[fadeIn_0.35s_ease]">
            <div
              className="
                rounded-[14px] border border-emerald-500/20 bg-[#1E1535] p-6
                transition-all duration-300
                hover:border-emerald-500/35
              "
            >
              <p className="mb-3.5 text-[11px] uppercase tracking-[0.15em] text-emerald-400">
                Optimal Approach
              </p>
              <p className="m-0 text-[15px] leading-relaxed text-[#C4B5D9]">
                {verdict.optimalApproach}
              </p>
              <div className="mt-4.5 flex gap-3">
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4.5 py-2.5 text-center transition-transform duration-200 hover:scale-105">
                  <p className="mb-1 text-[11px] text-gray-500">Time</p>
                  <p className="font-mono font-bold text-emerald-400">
                    {verdict.optimalTimeComplexity}
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4.5 py-2.5 text-center transition-transform duration-200 hover:scale-105">
                  <p className="mb-1 text-[11px] text-gray-500">Space</p>
                  <p className="font-mono font-bold text-emerald-400">
                    {verdict.optimalSpaceComplexity}
                  </p>
                </div>
              </div>
            </div>

            {verdict.optimalSolutionCode && (
              <div>
                <p className="mb-2.5 text-[11px] uppercase tracking-[0.15em] text-gray-500">
                  Optimal Solution
                </p>
                <CodeBlock code={verdict.optimalSolutionCode} language="java" />
              </div>
            )}

            <div className="rounded-[14px] border border-violet-500/15 bg-[#1E1535] p-6">
              <p className="mb-4 text-[11px] uppercase tracking-[0.15em] text-violet-600">
                How You Could Have Thought Differently
              </p>
              <div className="flex flex-col gap-3.5">
                {[
                  {
                    player: p1Name,
                    pattern: verdict.player1AlgorithmPattern,
                    tc: verdict.player1DetectedComplexity,
                    isWinner: p1Winner,
                  },
                  {
                    player: p2Name,
                    pattern: verdict.player2AlgorithmPattern,
                    tc: verdict.player2DetectedComplexity,
                    isWinner: p2Winner,
                  },
                ].map(({ player, pattern, tc, isWinner }) => (
                  <div
                    key={player}
                    className={`
                      flex items-center gap-3.5 rounded-lg px-4 py-3
                      bg-black/20
                      transition-all duration-300
                      hover:-translate-y-0.5
                      ${
                        isWinner
                          ? "border border-emerald-500/15"
                          : "border border-white/4"
                      }
                    `}
                  >
                    <div
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-full text-[13px] font-bold
                        ${
                          isWinner
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-violet-600/15 text-violet-600"
                        }
                      `}
                    >
                      {player?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="mb-0.5 text-[13px] font-semibold text-[#E2D9F3]">
                        {player}
                      </p>
                      <p className="text-xs text-gray-500">{pattern}</p>
                    </div>
                    <TCBadge tc={tc} />
                    <span className="text-sm text-[#4B3F72]">→</span>
                    <TCBadge tc={verdict.optimalTimeComplexity} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}