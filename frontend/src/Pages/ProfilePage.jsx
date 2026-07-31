import { useEffect, useState, useRef } from "react";
import { EloRing } from "../Component/EloRing";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { BattleCard } from "../Component/BattleCard";
import { useNavigate } from "react-router-dom";
import StatCard from "../Component/StatCard";

const AI_JUDGE_API = import.meta.env.VITE_AI_JUDGE_URL;

export default function ProfilePage() {
  const [rooms, setRooms] = useState([]);
  const [verdicts, setVerdicts] = useState({});
  const [aiStatus, setAiStatus] = useState(null); // { status: "UP"|"DOWN", provider?: string }
  const [loading, setLoading] = useState(true);
  const [analyzingRooms, setAnalyzingRooms] = useState(new Set());
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const pollTimers = useRef(new Map()); // cleanup on unmount

  const handleViewVerdict = (roomCode) => {
    navigate(`/verdict/${roomCode}`);
  };

  // ── Fetch rooms + AI health ─────────────────────────────────────
  useEffect(() => {
    if (!user?.email) return;

    let cancelled = false;

    async function getRooms() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/room/history",
          { email: user.email, status: "FINISHED" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!cancelled) setRooms(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    async function getStatus() {
      try {
        const response = await axios.get(`${AI_JUDGE_API}/api/judge/health`);
        if (!cancelled) {
          setAiStatus({
            status: response.status === 200 ? "UP" : "DOWN",
            provider: response.data?.provider || response.data?.aiProvider || null,
          });
        }
      } catch {
        if (!cancelled) setAiStatus({ status: "DOWN" });
      }
    }

    getStatus();
    getRooms();

    return () => {
      cancelled = true;
    };
  }, [user?.email, token]);

  // ── Fetch existing verdicts ─────────────────────────────────────
  useEffect(() => {
    if (rooms.length === 0) return;

    rooms.forEach((room) => {
      axios
        .get(`${AI_JUDGE_API}/api/judge/verdict/room/${room.roomCode}`)
        .then((res) => {
          setVerdicts((prev) => ({ ...prev, [room.roomCode]: res.data }));
        })
        .catch(() => {});
    });
  }, [rooms]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      pollTimers.current.forEach((id) => clearInterval(id));
      pollTimers.current.clear();
    };
  }, []);

  // ── Trigger analysis ────────────────────────────────────────────
  const handleAnalyze = async (room) => {
    setAnalyzingRooms((prev) => new Set([...prev, room.roomCode]));
    setVerdicts((prev) => ({
      ...prev,
      [room.roomCode]: { status: "PROCESSING" },
    }));

    try {
      const response = await fetch(`${AI_JUDGE_API}/api/judge/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          battleId: room.id,
          roomCode: room.roomCode,
          problemId: room.problemId,
          problemTitle: `Problem #${room.problemId}`,
          problemDescription: "",
          problemDifficulty: "MEDIUM",
          problemTags: "",
          winnerEmail: room.winnerEmail || room.player1Email,
          player1: {
            email: room.player1Email,
            code: room.player1LatestCode || "// Code not available",
            language: "java",
            executionOutput: "",
            executionError: "",
            passedAllTests: true,
          },
          player2: {
            email: room.player2Email,
            code: room.player2LatestCode || "// Code not available",
            language: "java",
            executionOutput: "",
            executionError: "",
            passedAllTests: false,
          },
        }),
      });

      if (response.ok) {
        const pollId = setInterval(async () => {
          try {
            const r = await fetch(
              `${AI_JUDGE_API}/api/judge/verdict/room/${room.roomCode}`
            );
            if (r.ok) {
              const verdict = await r.json();
              if (verdict.status === "COMPLETED" || verdict.status === "FAILED") {
                setVerdicts((prev) => ({ ...prev, [room.roomCode]: verdict }));
                setAnalyzingRooms((prev) => {
                  const next = new Set(prev);
                  next.delete(room.roomCode);
                  return next;
                });
                clearInterval(pollId);
                pollTimers.current.delete(room.roomCode);
              }
            }
          } catch {
            // keep polling
          }
        }, 4000);

        pollTimers.current.set(room.roomCode, pollId);

        // Safety stop after 2 min
        setTimeout(() => {
          clearInterval(pollId);
          pollTimers.current.delete(room.roomCode);
        }, 120000);
      }
    } catch (err) {
      console.error(err);
      setVerdicts((prev) => ({
        ...prev,
        [room.roomCode]: { status: "FAILED" },
      }));
      setAnalyzingRooms((prev) => {
        const next = new Set(prev);
        next.delete(room.roomCode);
        return next;
      });
    }
  };

  // ── Computed stats ──────────────────────────────────────────────
  const totalBattles = rooms.length;
  const analyzedCount = Object.values(verdicts).filter(
    (v) => v?.status === "COMPLETED"
  ).length;
  const algoWins = Object.values(verdicts).filter(
    (v) =>
      v?.status === "COMPLETED" && v?.algorithmicWinnerEmail === user?.email
  ).length;

  const avgTC = (() => {
    const tcs = Object.values(verdicts)
      .filter((v) => v?.status === "COMPLETED")
      .map((v) =>
        v.player1Email === user?.email
          ? v.player1DetectedComplexity
          : v.player2DetectedComplexity
      )
      .filter(Boolean);
    if (tcs.length === 0) return "N/A";
    const freq = tcs.reduce(
      (acc, tc) => ({ ...acc, [tc]: (acc[tc] || 0) + 1 }),
      {}
    );
    return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  })();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0F0A1E] flex items-center justify-center text-violet-200/60">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0A1E] font-sans text-[#E2D9F3] relative overflow-hidden">
      {/* Soft ambient glow blobs (liquid feel) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-600/20 blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-md h-md rounded-full bg-indigo-500/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-[100px]" />
      </div>

      {/* Top bar – liquid glass */}
      <header className="sticky top-0 z-20 border-b border-violet-500/15 bg-[#0F0A1E]/70 backdrop-blur-xl backdrop-saturate-150">
        <div className="max-w-225 mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_10px_#7C3AED] animate-pulse" />
            <span className="font-bold text-[15px] tracking-tight">DevArena</span>
            <span className="text-violet-900/80">/</span>
            <span className="text-gray-400 text-sm">Profile</span>
          </div>

          {/* Fixed AI status */}
          {aiStatus && (
            <div
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold
                border transition-all duration-300
                ${
                  aiStatus.status === "UP"
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                    : "bg-red-500/10 border-red-500/25 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                }
              `}
            >
              <span
                className={`
                  w-1.5 h-1.5 rounded-full
                  ${aiStatus.status === "UP" ? "bg-emerald-400 shadow-[0_0_6px_#10B981]" : "bg-red-400 shadow-[0_0_6px_#EF4444]"}
                `}
              />
              AI {aiStatus.status === "UP" ? "Online" : "Offline"}
              {aiStatus.provider && (
                <span className="text-violet-800/70 font-normal">· {aiStatus.provider}</span>
              )}
            </div>
          )}
        </div>
      </header>

      <main className="relative max-w-225 mx-auto px-6 py-8">
        {/* Profile header – liquid glass card */}
        <section
          className="
            relative mb-7 p-8 rounded-2xl
            bg-linear-to-br from-[#1E1535]/80 to-[#12092B]/90
            border border-violet-500/20
            backdrop-blur-xl
            shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
            flex flex-wrap gap-7 items-center
            transition-all duration-500 hover:border-violet-500/35 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)]
            animate-[fadeIn_0.5s_ease]
          "
        >
          {/* Specular highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent rounded-t-2xl" />

          <EloRing elo={user.elo} />

          <div className="flex-1 min-w-50">
            <p className="text-[11px] uppercase tracking-[0.2em] text-violet-800/80 mb-1.5">
              Competitor Profile
            </p>
            <h1 className="text-3xl font-extrabold text-[#E2D9F3] mb-1 tracking-tight">
              {user.name}
            </h1>
            <p className="text-gray-500 text-sm mb-5">{user.email}</p>

            <div className="flex flex-wrap gap-6">
              {[
                { label: "Battles", value: totalBattles },
                { label: "Analyzed", value: analyzedCount },
                { label: "Algo Wins", value: algoWins },
                { label: "Common TC", value: avgTC, mono: true },
              ].map(({ label, value, mono }) => (
                <div
                  key={label}
                  className="group transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className={`text-lg font-bold text-[#E2D9F3] ${
                      mono ? "font-mono" : ""
                    }`}
                  >
                    {value}
                  </div>
                  <div className="text-[11px] text-violet-800/70 group-hover:text-violet-600/90 transition-colors">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stat cards */}
        <div className="flex flex-wrap gap-3.5 mb-7">
          <StatCard icon="⚔️" label="Total Battles" value={totalBattles} sub="FINISHED rooms" />
          <StatCard icon="🤖" label="AI Analyses" value={analyzedCount} sub={`of ${totalBattles} battles`} />
          <StatCard icon="🏆" label="Algo Wins" value={algoWins} sub="better algorithm" />
          <StatCard icon="📊" label="Most Used TC" value={avgTC} sub="your avg complexity" />
        </div>

        {/* Battle history */}
        <section>
          <div className="flex justify-between items-end mb-4">
            <div>
              <h2 className="text-base font-bold text-[#E2D9F3]">Battle History</h2>
              <p className="text-xs text-violet-800/70 mt-1">
                Click any analyzed battle to view full AI breakdown
              </p>
            </div>
            <p className="text-xs text-violet-800/70">
              {totalBattles} battles · {analyzedCount} analyzed
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl bg-[#1E1535]/60 border border-violet-500/10 animate-pulse"
                />
              ))}
            </div>
          ) : rooms.length === 0 ? (
            <div
              className="
                rounded-xl border border-violet-500/15 bg-[#1E1535]/50
                backdrop-blur-md p-12 text-center
                shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]
              "
            >
              <div className="text-4xl mb-3 opacity-80">⚔️</div>
              <p className="text-gray-400 text-[15px]">No completed battles yet</p>
              <p className="text-violet-800/70 text-sm mt-1.5">
                Start a battle to see your history here
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {rooms.map((room, i) => (
                <div
                  key={room.roomCode}
                  className="
                    animate-[fadeIn_0.4s_ease_both]
                    transition-all duration-300
                    hover:-translate-y-1 hover:scale-[1.01]
                  "
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <BattleCard
                    room={room}
                    myEmail={user.email}
                    verdict={verdicts[room.roomCode]}
                    onAnalyzeClick={handleAnalyze}
                    onViewClick={handleViewVerdict}
                    isAnalyzing={analyzingRooms.has(room.roomCode)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Legend – glass pill */}
        <div
          className="
            mt-6 px-5 py-4 rounded-xl
            bg-violet-500/4 border border-violet-500/10
            backdrop-blur-sm
            flex flex-wrap gap-5 items-center
          "
        >
          <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-800/80">
            Legend
          </span>
          {[
            { color: "bg-emerald-400 shadow-[0_0_8px_#10B981]", label: "Analysis Ready — click to view" },
            { color: "bg-amber-400 shadow-[0_0_8px_#F59E0B]", label: "Analyzing in progress..." },
            { color: "bg-violet-800/60", label: "Not yet analyzed — click Analyze" },
            { color: "bg-red-400 shadow-[0_0_8px_#EF4444]", label: "AI failed — click Retry" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${color}`} />
              <span className="text-[11px] text-gray-500">{label}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}