import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import ProblemCard from "../Component/ProblemCard";
import { useSearchParams } from "react-router-dom";

const PROBLEMS_PER_PAGE = 20;

function ProblemPage() {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("difficulty") || "ALL";
  const page = parseInt(searchParams.get("page") || "1");
  const search = searchParams.get("search") || "";

  const updateParams = (newParams) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          updated.delete(key);
        } else {
          updated.set(key, value);
        }
      });
      return updated;
    });
  };

  useEffect(() => {
    async function getProblems() {
      try {
        const response = await axios.get("/api/problems");
        setProblems(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to load problems"
        );
      } finally {
        setLoading(false);
      }
    }
    getProblems();
  }, []);

  const filtered = problems
    .filter((p) => filter === "ALL" || p.difficulty === filter)
    .filter(
      (p) =>
        search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags && p.tags.toLowerCase().includes(search.toLowerCase()))
    );

  const totalPages = Math.ceil(filtered.length / PROBLEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * PROBLEMS_PER_PAGE,
    page * PROBLEMS_PER_PAGE
  );

  /* ---------- LOADING ---------- */
  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 
                      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                      flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-[5px] border-teal-500 border-t-transparent rounded-full 
                          animate-spin shadow-lg shadow-teal-200 dark:shadow-teal-900/40" />
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Loading problems...
          </p>
        </div>
      </div>
    );

  /* ---------- ERROR ---------- */
  if (error)
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 
                      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                      flex items-center justify-center px-4">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                        border border-rose-200 dark:border-rose-800/50 
                        rounded-3xl p-8 sm:p-10 text-center 
                        shadow-xl shadow-rose-100/40 dark:shadow-rose-950/30 max-w-md w-full">
          <p className="text-rose-500 dark:text-rose-400 font-bold text-lg">{error}</p>
          <p className="text-slate-400 dark:text-slate-500 mt-3 text-sm">
            Make sure your backend is running
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/20 to-emerald-50/30 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-300">

      {/* ========== HEADER ========== */}
      <div className="relative overflow-hidden 
                      bg-linear-to-br from-teal-600 via-emerald-600 to-cyan-600 
                      dark:from-teal-900 dark:via-emerald-900 dark:to-cyan-950
                      px-5 sm:px-8 py-10 sm:py-14">
        {/* liquid glows */}
        <div className="absolute -top-24 -right-24 w-72 sm:w-80 h-72 sm:h-80 
                        bg-cyan-400/30 dark:bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 sm:w-72 h-64 sm:h-72 
                        bg-emerald-400/25 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-96 h-40 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
            Practice Problems
          </h1>
          <p className="text-teal-100/90 dark:text-teal-200/80 text-base sm:text-lg">
            Sharpen your skills, climb the leaderboard
          </p>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-6 sm:mt-8">
            {[
              { label: "Total", value: problems.length, accent: "text-white" },
              {
                label: "Easy",
                value: problems.filter((p) => p.difficulty === "EASY").length,
                accent: "text-emerald-300",
              },
              {
                label: "Medium",
                value: problems.filter((p) => p.difficulty === "MEDIUM").length,
                accent: "text-amber-300",
              },
              {
                label: "Hard",
                value: problems.filter((p) => p.difficulty === "HARD").length,
                accent: "text-rose-300",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/15 dark:bg-white/10 backdrop-blur-md 
                           border border-white/20 dark:border-white/10 
                           rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 
                           shadow-lg shadow-black/5"
              >
                <p className={`font-black text-xl sm:text-2xl ${stat.accent}`}>
                  {stat.value}
                </p>
                <p className="text-teal-100/80 dark:text-teal-200/60 text-[10px] sm:text-xs font-medium mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">

        {/* Search – glass */}
        <div className="relative mb-5">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-teal-400 dark:text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title or tag..."
            value={search}
            onChange={(e) =>
              updateParams({ search: e.target.value, page: "1" })
            }
            className="w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                       border border-teal-200/60 dark:border-teal-800/40
                       rounded-2xl pl-12 pr-5 py-3.5 
                       text-slate-800 dark:text-slate-100 
                       placeholder-slate-400 dark:placeholder-slate-500
                       shadow-sm shadow-teal-100/30 dark:shadow-teal-950/20
                       focus:outline-none focus:ring-2 focus:ring-teal-500/40 
                       focus:border-teal-400 dark:focus:border-teal-600
                       transition-all duration-200"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-7">
          {[
            { level: "ALL", active: "from-teal-500 to-emerald-500 shadow-teal-200 dark:shadow-teal-900/40" },
            { level: "EASY", active: "from-emerald-500 to-green-500 shadow-emerald-200 dark:shadow-emerald-900/40" },
            { level: "MEDIUM", active: "from-amber-500 to-orange-500 shadow-amber-200 dark:shadow-amber-900/40" },
            { level: "HARD", active: "from-rose-500 to-red-500 shadow-rose-200 dark:shadow-rose-900/40" },
          ].map(({ level, active }) => (
            <button
              key={level}
              onClick={() =>
                updateParams({
                  difficulty: level === "ALL" ? null : level,
                  page: "1",
                })
              }
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm 
                          transition-all duration-200 ${
                filter === level
                  ? `bg-linear-to-r ${active} text-white shadow-md scale-[1.03]`
                  : `bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm
                     text-slate-600 dark:text-slate-300 
                     border border-slate-200/80 dark:border-slate-700/60
                     hover:border-teal-300 dark:hover:border-teal-600
                     hover:text-teal-700 dark:hover:text-teal-300
                     hover:shadow-sm`
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 font-medium flex flex-wrap items-center gap-1.5">
          Showing{" "}
          <span className="text-teal-600 dark:text-teal-400 font-bold">
            {paginated.length}
          </span>{" "}
          of{" "}
          <span className="text-slate-700 dark:text-slate-200 font-bold">
            {filtered.length}
          </span>{" "}
          problems
          {filter !== "ALL" && (
            <span
              className={`ml-1 text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                filter === "EASY"
                  ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                  : filter === "MEDIUM"
                  ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                  : "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
              }`}
            >
              {filter}
            </span>
          )}
          {search && (
            <span className="text-xs bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300 px-2.5 py-0.5 rounded-full">
              “{search}”
            </span>
          )}
        </p>

        {/* Problem list */}
        {paginated.length === 0 ? (
          <div className="text-center py-16 sm:py-20 
                          bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl
                          rounded-3xl border border-slate-200/60 dark:border-slate-700/50 
                          shadow-sm">
            <p className="text-slate-400 dark:text-slate-500 text-lg font-medium">
              No problems found
            </p>
            <button
              onClick={() => setSearchParams({})}
              className="mt-4 inline-flex items-center gap-1.5 
                         text-teal-600 dark:text-teal-400 
                         hover:text-teal-700 dark:hover:text-teal-300 
                         font-semibold text-sm transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {paginated.map((problem, index) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={(page - 1) * PROBLEMS_PER_PAGE + index + 1}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              <button
                onClick={() => updateParams({ page: String(page - 1) })}
                disabled={page === 1}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl 
                           bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm
                           border border-slate-200/80 dark:border-slate-700/60
                           text-slate-600 dark:text-slate-300 font-medium text-sm
                           hover:border-teal-400 dark:hover:border-teal-600
                           hover:text-teal-700 dark:hover:text-teal-300
                           disabled:opacity-40 disabled:cursor-not-allowed 
                           transition-all duration-200 shadow-sm"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === totalPages || Math.abs(p - page) <= 2
                )
                .reduce((acc, p, i, arr) => {
                  if (i > 0 && p - arr[i - 1] > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`dots-${i}`}
                      className="px-1.5 text-slate-400 dark:text-slate-500 font-medium"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => updateParams({ page: String(p) })}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        page === p
                          ? "bg-linear-to-r from-teal-500 to-emerald-500 text-white shadow-md shadow-teal-200 dark:shadow-teal-900/40 scale-105"
                          : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm border border-slate-200/80 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-teal-400 dark:hover:border-teal-600 hover:text-teal-700 dark:hover:text-teal-300 shadow-sm"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => updateParams({ page: String(page + 1) })}
                disabled={page === totalPages}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl 
                           bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm
                           border border-slate-200/80 dark:border-slate-700/60
                           text-slate-600 dark:text-slate-300 font-medium text-sm
                           hover:border-teal-400 dark:hover:border-teal-600
                           hover:text-teal-700 dark:hover:text-teal-300
                           disabled:opacity-40 disabled:cursor-not-allowed 
                           transition-all duration-200 shadow-sm"
              >
                Next →
              </button>
            </div>

            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">
              Page{" "}
              <span className="text-teal-600 dark:text-teal-400 font-bold">
                {page}
              </span>{" "}
              of {totalPages}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProblemPage;