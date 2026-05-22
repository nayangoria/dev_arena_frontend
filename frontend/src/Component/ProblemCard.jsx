import { useNavigate,useLocation } from "react-router-dom";

function ProblemCard({ problem, index }) {
    const navigate = useNavigate();
    const location = useLocation();

    function getDifficultyStyle(difficulty) {
        if (difficulty === "EASY") return "text-green-600 bg-green-50 border border-green-200";
        if (difficulty === "MEDIUM") return "text-yellow-600 bg-yellow-50 border border-yellow-200";
        if (difficulty === "HARD") return "text-red-600 bg-red-50 border border-red-200";
    }

    return (
        <div
            onClick={() => navigate(`/problems/${problem.id}`,{
                state: { from: location.pathname + location.search }})}
            className="bg-white border border-slate-200 rounded-xl p-5 mb-3 cursor-pointer hover:border-violet-300 hover:shadow-md transition-all duration-200 group"
        >
            <div className="flex items-center justify-between mb-2">
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <span className="text-slate-300 font-mono text-sm w-8">{index}</span>
                    <p className="text-slate-800 font-semibold group-hover:text-violet-600 transition-colors duration-200">
                        {problem.title}
                    </p>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {problem.difficultyRating && (
                        <span className="text-slate-400 text-xs">
                            {problem.difficultyRating}
                        </span>
                    )}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyStyle(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                    <span className="text-slate-300 group-hover:text-violet-400 transition-colors">→</span>
                </div>
            </div>

            {/* Tags */}
            {problem.tags && (
                <div className="flex flex-wrap gap-2 ml-12">
                    {problem.tags.split(",").slice(0, 4).map((tag, i) => (
                        <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full"
                        >
                            {tag.trim()}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ProblemCard;