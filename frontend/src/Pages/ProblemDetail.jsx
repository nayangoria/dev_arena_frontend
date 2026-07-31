import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
import { CodeEditor } from "./CodeEditor";

function ProblemDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [problem, setProblem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    const from = location.state?.from || "/problems";
    navigate(from);
  };

  useEffect(() => {
    async function getProblem() {
      try {
        const response = await axios.get(`/api/problems/${id}`);
        setProblem(response.data);
      } catch (err) {
        console.log("error getting data", err);
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load problem"
        );
      } finally {
        setLoading(false);
      }
    }
    getProblem();
  }, [id]);

  function getDifficultyStyle(difficulty) {
    if (difficulty === "EASY")
      return "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/60";
    if (difficulty === "MEDIUM")
      return "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700/60";
    if (difficulty === "HARD")
      return "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-700/60";
    return "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700";
  }

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
            Loading problem...
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
          <p className="text-rose-500 dark:text-rose-400 font-bold text-lg">
            {typeof error === "string" ? error : "Something went wrong"}
          </p>
          <button
            onClick={() => navigate("/problems")}
            className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                       bg-linear-to-r from-teal-500 to-emerald-500
                       hover:from-teal-600 hover:to-emerald-600
                       shadow-md shadow-teal-200/40 dark:shadow-teal-900/30
                       transition-all duration-200 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  if (!problem) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/20 to-emerald-50/30 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                    transition-colors duration-300">

      {/* ========== HEADER ========== */}
      <div className="relative overflow-hidden 
                      bg-linear-to-br from-teal-600 via-emerald-600 to-cyan-600 
                      dark:from-teal-900 dark:via-emerald-900 dark:to-cyan-950
                      px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* liquid glows */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-400/25 dark:bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="text-teal-100/90 dark:text-teal-200/80 hover:text-white 
                       flex items-center gap-2 mb-3 text-sm font-medium
                       transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            Back to Problems
          </button>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              {problem.title}
            </h1>
            <span
              className={`text-xs sm:text-sm font-bold px-3 py-1 rounded-full tracking-wide ${getDifficultyStyle(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>
            {problem.difficultyRating && (
              <span className="text-teal-100/70 dark:text-teal-200/50 text-xs sm:text-sm font-medium">
                Rating: {problem.difficultyRating}
              </span>
            )}
          </div>

          {/* Tags in header if present */}
          {problem.tags && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {problem.tags.split(",").map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-xs font-medium
                             bg-white/15 dark:bg-white/10 backdrop-blur-sm
                             text-teal-50 border border-white/20
                             px-2.5 py-0.5 rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========== CONTENT ========== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Left – Description */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                            border border-slate-200/70 dark:border-slate-700/50
                            rounded-2xl p-5 sm:p-6
                            shadow-sm shadow-teal-100/20 dark:shadow-teal-950/20
                            h-full">
              <h2 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-linear-to-b from-teal-400 to-emerald-500" />
                Problem Description
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-[15px] whitespace-pre-wrap">
                {problem.description}
              </p>
            </div>
          </div>

          {/* Right – Code Editor */}
          <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-[70vh]">
            <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                            border border-slate-200/70 dark:border-slate-700/50
                            rounded-2xl overflow-hidden
                            shadow-sm shadow-teal-100/20 dark:shadow-teal-950/20
                            h-full flex flex-col">
              <CodeEditor problemId={problem.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemDetail;