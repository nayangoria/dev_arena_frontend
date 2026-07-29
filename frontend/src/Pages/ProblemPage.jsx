import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import ProblemCard from "../Component/ProblemCard";
// 🆕 CHANGE 1 — import useSearchParams to read/write URL params
import { useSearchParams } from "react-router-dom";

const PROBLEMS_PER_PAGE = 20; // 🆕 CHANGE 2 — page size constant

function ProblemPage() {
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);

    // 🆕 CHANGE 3 — read filter and page FROM URL instead of useState
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("difficulty") || "ALL";
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search") || "";
    // const [error,setError]=useState("")

    // 🆕 CHANGE 4 — helper to update URL params without losing others
    const updateParams = (newParams) => {
        setSearchParams(prev => {
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
                setError(error.response?.data?.message || error.response?.data?.error || "Failed to load problems");
               } finally {
                setLoading(false);
            }
        }
        getProblems();
    }, [])

    // 🆕 CHANGE 5 — filter and search logic same but reads from URL now
    const filtered = problems
        .filter(p => filter === "ALL" || p.difficulty === filter)
        .filter(p => search === "" ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            (p.tags && p.tags.toLowerCase().includes(search.toLowerCase()))
        );

    // 🆕 CHANGE 6 — pagination logic
    const totalPages = Math.ceil(filtered.length / PROBLEMS_PER_PAGE);
    const paginated = filtered.slice(
        (page - 1) * PROBLEMS_PER_PAGE,
        page * PROBLEMS_PER_PAGE
    );

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-5">
                <div className="w-14 h-14 border-[5px] border-violet-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-violet-200"></div>
                <p className="text-slate-500 font-medium tracking-wide">Loading problems...</p>
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="bg-white border border-rose-200 rounded-3xl p-10 text-center shadow-xl shadow-rose-100/50 max-w-md">
                <p className="text-rose-500 font-bold text-lg">{error}</p>
                <p className="text-slate-400 mt-3 text-sm">Make sure your backend is running</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/40">

            {/* ========== HEADER ========== */}
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 px-8 py-14">
                {/* soft glow */}
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-violet-400/25 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                        Practice Problems
                    </h1>
                    <p className="text-violet-100/90 text-lg">
                        Sharpen your skills, climb the leaderboard
                    </p>

                    {/* Stats pills */}
                    <div className="flex flex-wrap gap-3 mt-8">
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-lg">
                            <p className="text-white font-black text-2xl">{problems.length}</p>
                            <p className="text-violet-200 text-xs font-medium mt-0.5">Total</p>
                        </div>
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-lg">
                            <p className="text-emerald-300 font-black text-2xl">
                                {problems.filter(p => p.difficulty === "EASY").length}
                            </p>
                            <p className="text-violet-200 text-xs font-medium mt-0.5">Easy</p>
                        </div>
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-lg">
                            <p className="text-amber-300 font-black text-2xl">
                                {problems.filter(p => p.difficulty === "MEDIUM").length}
                            </p>
                            <p className="text-violet-200 text-xs font-medium mt-0.5">Medium</p>
                        </div>
                        <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-lg">
                            <p className="text-rose-300 font-black text-2xl">
                                {problems.filter(p => p.difficulty === "HARD").length}
                            </p>
                            <p className="text-violet-200 text-xs font-medium mt-0.5">Hard</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== CONTENT ========== */}
            <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">

                {/* Search */}
                <div className="relative mb-5">
                    <input
                        type="text"
                        placeholder="Search by title or tag..."
                        value={search}
                        onChange={(e) => updateParams({
                            search: e.target.value,
                            page: "1" // reset to page 1 on new search
                        })}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400 transition-all duration-200"
                    />
                </div>

                {/* Filter buttons */}
                <div className="flex flex-wrap gap-2.5 mb-7">
                    {["ALL", "EASY", "MEDIUM", "HARD"].map(level => (
                        <button
                            key={level}
                            onClick={() => updateParams({
                                difficulty: level === "ALL" ? null : level,
                                page: "1" // reset to page 1 on filter change
                            })}
                            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                                filter === level
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200 scale-[1.02]"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-700 hover:shadow-sm"
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                {/* Result count */}
                <p className="text-slate-500 text-sm mb-5 font-medium">
                    Showing <span className="text-violet-600 font-bold">{paginated.length}</span> of{" "}
                    <span className="text-slate-700 font-bold">{filtered.length}</span> problems
                    {filter !== "ALL" && (
                        <span className="ml-1.5 text-xs bg-violet-100 text-violet-700 px-2.5 py-0.5 rounded-full font-semibold">
                            {filter}
                        </span>
                    )}
                    {search && (
                        <span className="ml-1.5 text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                            “{search}”
                        </span>
                    )}
                </p>

                {/* Problem list */}
                {paginated.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <p className="text-slate-400 text-lg font-medium">No problems found</p>
                        <button
                            onClick={() => setSearchParams({})}
                            className="mt-4 inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-semibold text-sm transition-colors"
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
                                // 🆕 CHANGE 10 — global index not page index
                                index={(page - 1) * PROBLEMS_PER_PAGE + index + 1}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-10 flex flex-col items-center gap-4">
                        <div className="flex items-center justify-center gap-2">
                            {/* Previous */}
                            <button
                                onClick={() => updateParams({ page: String(page - 1) })}
                                disabled={page === 1}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-sm hover:border-violet-300 hover:text-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                            >
                                ← Prev
                            </button>

                            {/* Page numbers */}
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter(p =>
                                    p === 1 ||
                                    p === totalPages ||
                                    Math.abs(p - page) <= 2
                                )
                                .reduce((acc, p, i, arr) => {
                                    if (i > 0 && p - arr[i - 1] > 1) {
                                        acc.push("...");
                                    }
                                    acc.push(p);
                                    return acc;
                                }, [])
                                .map((p, i) => (
                                    p === "..." ? (
                                        <span key={`dots-${i}`} className="px-2 text-slate-400 font-medium">...</span>
                                    ) : (
                                        <button
                                            key={p}
                                            onClick={() => updateParams({ page: String(p) })}
                                            className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all duration-200 ${
                                                page === p
                                                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200"
                                                    : "bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 shadow-sm"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    )
                                ))
                            }

                            {/* Next */}
                            <button
                                onClick={() => updateParams({ page: String(page + 1) })}
                                disabled={page === totalPages}
                                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-sm hover:border-violet-300 hover:text-violet-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                            >
                                Next →
                            </button>
                        </div>

                        <p className="text-slate-400 text-sm font-medium">
                            Page <span className="text-violet-600 font-bold">{page}</span> of {totalPages}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProblemPage;