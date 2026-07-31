import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

export function LeaderBoard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function getLeaderboard() {
      try {
        const response = await axios.get("/api/leaderboard");
        setLeaderboard(response.data);
      } catch (err) {
        console.log("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    getLeaderboard();
  }, []);

  function getRankDisplay(rank) {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  }

  function getRowStyle(rank, email) {
    if (email === user?.email)
      return "bg-teal-50/80 dark:bg-teal-950/30 border-teal-200/60 dark:border-teal-800/40";
    if (rank === 1)
      return "bg-amber-50/80 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-800/30";
    if (rank === 2)
      return "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200/50 dark:border-slate-700/40";
    if (rank === 3)
      return "bg-orange-50/70 dark:bg-orange-950/20 border-orange-200/50 dark:border-orange-800/30";
    return "bg-white/50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800/40";
  }

  /* ---------- LOADING ---------- */
  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 
                      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                      flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-[5px] border-teal-500 border-t-transparent rounded-full 
                          animate-spin shadow-lg shadow-teal-200 dark:shadow-teal-900/40" />
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Loading leaderboard...
          </p>
        </div>
      </div>
    );

  /* ---------- ERROR ---------- */
  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 
                      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                      flex items-center justify-center px-4">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                        border border-rose-200 dark:border-rose-800/50 
                        rounded-3xl p-8 sm:p-10 text-center 
                        shadow-xl shadow-rose-100/40 dark:shadow-rose-950/30 max-w-md w-full">
          <span className="text-5xl">😕</span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">
            Something went wrong
          </h2>
          <p className="text-rose-500 dark:text-rose-400 text-sm mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white
                       bg-gradient-to-r from-teal-500 to-emerald-500
                       hover:from-teal-600 hover:to-emerald-600
                       shadow-md shadow-teal-200/40 dark:shadow-teal-900/30
                       transition-all duration-200 active:scale-95"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  /* ---------- EMPTY ---------- */
  if (leaderboard.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 
                      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                      flex items-center justify-center px-4">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                        border border-slate-200/70 dark:border-slate-700/50 
                        rounded-3xl p-8 sm:p-10 text-center 
                        shadow-xl max-w-md w-full">
          <span className="text-5xl">🏆</span>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-4 mb-2">
            No players yet
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-sm">
            Play a battle to appear on the leaderboard!
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50/30 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                    transition-colors duration-300">

      {/* ========== HEADER ========== */}
      <div className="relative overflow-hidden 
                      bg-gradient-to-br from-teal-600 via-emerald-600 to-cyan-600 
                      dark:from-teal-900 dark:via-emerald-900 dark:to-cyan-950
                      px-4 sm:px-8 py-10 sm:py-12">
        {/* liquid glows */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/25 dark:bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
            🏆 Leaderboard
          </h1>
          <p className="text-teal-100/90 dark:text-teal-200/80 text-sm sm:text-base">
            Top players ranked by ELO rating
          </p>

          {/* Top 3 podium */}
          {leaderboard.length >= 3 && (
            <div className="flex items-end justify-center gap-2 sm:gap-4 mt-8">
              {/* 2nd */}
              <div className="bg-white/15 dark:bg-white/10 backdrop-blur-md 
                              border border-white/20 rounded-2xl p-3 sm:p-4 text-center 
                              w-24 sm:w-32 shadow-lg">
                <p className="text-2xl sm:text-3xl mb-1">🥈</p>
                <p className="text-white font-semibold text-xs sm:text-sm truncate">
                  {leaderboard[1].name}
                </p>
                <p className="text-teal-100/80 text-[10px] sm:text-xs mt-0.5">
                  {leaderboard[1].eloRating} ELO
                </p>
              </div>

              {/* 1st – taller */}
              <div className="bg-white/25 dark:bg-white/15 backdrop-blur-md 
                              border border-white/30 rounded-2xl p-3 sm:p-5 text-center 
                              w-28 sm:w-36 -mt-4 sm:-mt-6 shadow-xl
                              ring-2 ring-amber-300/40">
                <p className="text-3xl sm:text-4xl mb-1">🥇</p>
                <p className="text-white font-bold text-sm sm:text-base truncate">
                  {leaderboard[0].name}
                </p>
                <p className="text-amber-200 text-xs sm:text-sm mt-0.5">
                  {leaderboard[0].eloRating} ELO
                </p>
              </div>

              {/* 3rd */}
              <div className="bg-white/15 dark:bg-white/10 backdrop-blur-md 
                              border border-white/20 rounded-2xl p-3 sm:p-4 text-center 
                              w-24 sm:w-32 shadow-lg">
                <p className="text-2xl sm:text-3xl mb-1">🥉</p>
                <p className="text-white font-semibold text-xs sm:text-sm truncate">
                  {leaderboard[2].name}
                </p>
                <p className="text-teal-100/80 text-[10px] sm:text-xs mt-0.5">
                  {leaderboard[2].eloRating} ELO
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== TABLE ========== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl 
                        rounded-2xl sm:rounded-3xl shadow-lg shadow-teal-100/20 dark:shadow-teal-950/20
                        border border-slate-200/70 dark:border-slate-700/50 
                        overflow-hidden">

          {/* Header – desktop */}
          <div className="hidden sm:grid grid-cols-12 px-5 sm:px-6 py-3 
                          bg-slate-50/80 dark:bg-slate-800/50 
                          border-b border-slate-200/70 dark:border-slate-700/50">
            <p className="col-span-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              Rank
            </p>
            <p className="col-span-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              Player
            </p>
            <p className="col-span-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
              Email
            </p>
            <p className="col-span-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">
              ELO
            </p>
          </div>

          {/* Rows */}
          {leaderboard.map((player) => (
            <div
              key={player.email}
              className={`grid grid-cols-12 px-4 sm:px-6 py-3.5 sm:py-4 
                          border-b border-slate-100 dark:border-slate-800/50 
                          items-center transition-colors duration-200
                          ${getRowStyle(player.rank, player.email)}`}
            >
              {/* Rank */}
              <p className="col-span-2 sm:col-span-2 text-lg sm:text-xl font-bold text-slate-700 dark:text-slate-200">
                {getRankDisplay(player.rank)}
              </p>

              {/* Name + avatar */}
              <div className="col-span-7 sm:col-span-4 flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-full 
                                bg-gradient-to-br from-teal-400 to-emerald-500 
                                flex items-center justify-center
                                shadow-md shadow-teal-200/40 dark:shadow-teal-900/30
                                ring-2 ring-white dark:ring-slate-800">
                  <span className="text-white font-bold text-xs sm:text-sm">
                    {player.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base truncate">
                    {player.name}
                    {player.email === user?.email && (
                      <span className="ml-1.5 text-[10px] sm:text-xs 
                                      bg-teal-100 dark:bg-teal-900/50 
                                      text-teal-700 dark:text-teal-300 
                                      px-1.5 sm:px-2 py-0.5 rounded-full font-bold">
                        You
                      </span>
                    )}
                  </p>
                  {/* Email under name on mobile */}
                  <p className="sm:hidden text-slate-400 dark:text-slate-500 text-[11px] truncate">
                    {player.email}
                  </p>
                </div>
              </div>

              {/* Email – desktop only */}
              <p className="hidden sm:block col-span-4 text-slate-400 dark:text-slate-500 text-sm truncate">
                {player.email}
              </p>

              {/* ELO */}
              <p className="col-span-3 sm:col-span-2 text-right font-bold text-teal-600 dark:text-teal-400 text-sm sm:text-base">
                {player.eloRating}
                <span className="hidden sm:inline text-slate-400 dark:text-slate-500 font-normal text-xs ml-1">
                  ELO
                </span>
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 dark:text-slate-500 text-sm mt-4 font-medium">
          Showing top {leaderboard.length} players
        </p>
      </div>
    </div>
  );
}