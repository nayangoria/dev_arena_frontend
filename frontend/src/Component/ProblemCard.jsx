import { useNavigate, useLocation } from "react-router-dom";

function ProblemCard({ problem, index }) {
  const navigate = useNavigate();
  const location = useLocation();

  function getDifficultyStyle(difficulty) {
    if (difficulty === "EASY")
      return "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700/60";
    if (difficulty === "MEDIUM")
      return "text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700/60";
    if (difficulty === "HARD")
      return "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-700/60";
    return "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700";
  }

  function getHoverBorder(difficulty) {
    if (difficulty === "EASY") return "hover:border-emerald-400 dark:hover:border-emerald-500";
    if (difficulty === "MEDIUM") return "hover:border-amber-400 dark:hover:border-amber-500";
    if (difficulty === "HARD") return "hover:border-rose-400 dark:hover:border-rose-500";
    return "hover:border-teal-400 dark:hover:border-teal-500";
  }

  function getHoverShadow(difficulty) {
    if (difficulty === "EASY") return "hover:shadow-emerald-200/40 dark:hover:shadow-emerald-900/30";
    if (difficulty === "MEDIUM") return "hover:shadow-amber-200/40 dark:hover:shadow-amber-900/30";
    if (difficulty === "HARD") return "hover:shadow-rose-200/40 dark:hover:shadow-rose-900/30";
    return "hover:shadow-teal-200/40 dark:hover:shadow-teal-900/30";
  }

  function getTitleHover(difficulty) {
    if (difficulty === "EASY") return "group-hover:text-emerald-600 dark:group-hover:text-emerald-400";
    if (difficulty === "MEDIUM") return "group-hover:text-amber-600 dark:group-hover:text-amber-400";
    if (difficulty === "HARD") return "group-hover:text-rose-600 dark:group-hover:text-rose-400";
    return "group-hover:text-teal-600 dark:group-hover:text-teal-400";
  }

  function getArrowHover(difficulty) {
    if (difficulty === "EASY") return "group-hover:text-emerald-400 dark:group-hover:text-emerald-500";
    if (difficulty === "MEDIUM") return "group-hover:text-amber-400 dark:group-hover:text-amber-500";
    if (difficulty === "HARD") return "group-hover:text-rose-400 dark:group-hover:text-rose-500";
    return "group-hover:text-teal-400 dark:group-hover:text-teal-500";
  }

  return (
    <div
      onClick={() =>
        navigate(`/problems/${problem.id}`, {
          state: { from: location.pathname + location.search },
        })
      }
      className={`
        relative overflow-hidden cursor-pointer group
        bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
        border border-slate-200/70 dark:border-slate-700/50
        rounded-2xl p-4 sm:p-5
        shadow-sm shadow-slate-100/50 dark:shadow-slate-950/30
        ${getHoverBorder(problem.difficulty)}
        hover:shadow-lg ${getHoverShadow(problem.difficulty)}
        hover:scale-[1.01] active:scale-[0.99]
        transition-all duration-300
      `}
    >
      {/* subtle liquid glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                      bg-linear-to-r from-teal-500/5 via-emerald-500/5 to-cyan-500/5 dark:from-teal-400/5 dark:via-emerald-400/5 dark:to-cyan-400/5" />

      <div className="relative flex items-start sm:items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <span className="text-slate-300 dark:text-slate-600 font-mono text-xs sm:text-sm w-6 sm:w-8 shrink-0 pt-0.5 sm:pt-0">
            {index}
          </span>

          <div className="min-w-0 flex-1">
            <p
              className={`text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base 
                          truncate sm:whitespace-normal
                          ${getTitleHover(problem.difficulty)}
                          transition-colors duration-200`}
            >
              {problem.title}
            </p>

            {/* Tags – under title on mobile */}
            {problem.tags && (
              <div className="flex flex-wrap gap-1.5 mt-2 sm:mt-1.5">
                {problem.tags
                  .split(",")
                  .slice(0, 4)
                  .map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-xs 
                                 bg-teal-50 dark:bg-teal-950/40 
                                 text-teal-600 dark:text-teal-400 
                                 border border-teal-100 dark:border-teal-800/40
                                 px-2 py-0.5 rounded-full font-medium"
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {problem.difficultyRating && (
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500 text-xs font-medium">
              {problem.difficultyRating}
            </span>
          )}

          <span
            className={`text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 rounded-full tracking-wide ${getDifficultyStyle(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>

          <span
            className={`text-slate-300 dark:text-slate-600 text-lg
                        ${getArrowHover(problem.difficulty)}
                        transition-all duration-300 
                        group-hover:translate-x-1`}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;