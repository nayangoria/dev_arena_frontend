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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading problems...</p>
            </div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <p className="text-red-500 font-semibold text-lg">{error}</p>
                <p className="text-slate-400 mt-2">Make sure your backend is running</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-2">Practice Problems</h1>
                    <p className="text-violet-200">Sharpen your skills, climb the leaderboard</p>

                    {/* Stats */}
                    <div className="flex gap-6 mt-6">
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-white font-bold text-xl">{problems.length}</p>
                            <p className="text-violet-200 text-sm">Total</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-green-300 font-bold text-xl">{problems.filter(p => p.difficulty === "EASY").length}</p>
                            <p className="text-violet-200 text-sm">Easy</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-yellow-300 font-bold text-xl">{problems.filter(p => p.difficulty === "MEDIUM").length}</p>
                            <p className="text-violet-200 text-sm">Medium</p>
                        </div>
                        <div className="bg-white/20 rounded-lg px-4 py-2">
                            <p className="text-red-300 font-bold text-xl">{problems.filter(p => p.difficulty === "HARD").length}</p>
                            <p className="text-violet-200 text-sm">Hard</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-6">

                {/* 🆕 CHANGE 7 — search input writes to URL */}
                <input
                    type="text"
                    placeholder="Search by title or tag..."
                    value={search}
                    onChange={(e) => updateParams({
                        search: e.target.value,
                        page: "1" // reset to page 1 on new search
                    })}
                    className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
                />

                {/* 🆕 CHANGE 8 — filter buttons write to URL */}
                <div className="flex gap-3 mb-6">
                    {["ALL", "EASY", "MEDIUM", "HARD"].map(level => (
                        <button
                            key={level}
                            onClick={() => updateParams({
                                difficulty: level === "ALL" ? null : level,
                                page: "1" // reset to page 1 on filter change
                            })}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
                                ${filter === level
                                    ? "bg-violet-600 text-white shadow-md"
                                    : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300"
                                }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>

                {/* Problem count */}
                <p className="text-slate-400 text-sm mb-4">
                    Showing {paginated.length} of {filtered.length} problems
                    {filter !== "ALL" && ` (filtered: ${filter})`}
                    {search && ` (search: "${search}")`}
                </p>

                {/* Problem list */}
                {paginated.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-slate-400 text-lg">No problems found</p>
                        {/* 🆕 CHANGE 9 — clear filters button */}
                        <button
                            onClick={() => setSearchParams({})}
                            className="mt-4 text-violet-600 hover:underline text-sm"
                        >
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    paginated.map((problem, index) => (
                        <ProblemCard
                            key={problem.id}
                            problem={problem}
                            // 🆕 CHANGE 10 — global index not page index
                            index={(page - 1) * PROBLEMS_PER_PAGE + index + 1}
                        />
                    ))
                )}

                {/* 🆕 CHANGE 11 — Pagination controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">

                        {/* Previous button */}
                        <button
                            onClick={() => updateParams({ page: String(page - 1) })}
                            disabled={page === 1}
                            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:border-violet-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                                    <span key={`dots-${i}`} className="px-2 text-slate-400">...</span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => updateParams({ page: String(p) })}
                                        className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                                            page === p
                                                ? "bg-violet-600 text-white"
                                                : "border border-slate-200 text-slate-600 hover:border-violet-300"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                )
                            ))
                        }

                        {/* Next button */}
                        <button
                            onClick={() => updateParams({ page: String(page + 1) })}
                            disabled={page === totalPages}
                            className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:border-violet-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            Next →
                        </button>
                    </div>
                )}

                {/* Page info */}
                {totalPages > 1 && (
                    <p className="text-center text-slate-400 text-sm mt-3">
                        Page {page} of {totalPages}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ProblemPage;