import { useEffect, useState } from "react"
import axios from "../api/axiosInstance"
import { useAuth } from "../Context/AuthContext"

export function LeaderBoard() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [leaderboard, setLeaderboard] = useState([])
    const { user} = useAuth()

    useEffect(() => {
        async function getLeaderboard() {
            try {
                const response = await axios.get("/api/leaderboard")
                setLeaderboard(response.data)
            } catch (error) {
                console.log("Error fetching leaderboard:", error)
                setError("Failed to load leaderboard. Please try again.")
            } finally {
                setLoading(false)
            }
        }
        getLeaderboard()
    }, [])

    function getRankDisplay(rank) {
        if (rank === 1) return "🥇"
        if (rank === 2) return "🥈"
        if (rank === 3) return "🥉"
        return rank
    }

    function getRowStyle(rank, email) {
        // Highlight current user's row
        if (email === user?.email) return "bg-violet-50 border-violet-200"
        if (rank === 1) return "bg-yellow-50 border-yellow-200"
        if (rank === 2) return "bg-slate-50 border-slate-200"
        if (rank === 3) return "bg-orange-50 border-orange-200"
        return "bg-white border-slate-100"
    }

    // Loading state
    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading leaderboard...</p>
            </div>
        </div>
    )

    // Error state
    if (error) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="bg-white border border-red-200 rounded-2xl p-10 text-center shadow-sm max-w-md">
                <span className="text-5xl">😕</span>
                <h2 className="text-xl font-bold text-slate-800 mt-4 mb-2">
                    Something went wrong
                </h2>
                <p className="text-red-500 text-sm mb-6">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    )

    // Empty state
    if (leaderboard.length === 0) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm max-w-md">
                <span className="text-5xl">🏆</span>
                <h2 className="text-xl font-bold text-slate-800 mt-4 mb-2">
                    No players yet
                </h2>
                <p className="text-slate-400 text-sm">
                    Play a battle to appear on the leaderboard!
                </p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Header */}
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-8 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        🏆 Leaderboard
                    </h1>
                    <p className="text-violet-200">
                        Top players ranked by ELO rating
                    </p>

                    {/* Top 3 podium */}
                    {leaderboard.length >= 3 && (
                        <div className="flex items-end justify-center gap-4 mt-8">

                            {/* 2nd place */}
                            <div className="bg-white/20 rounded-xl p-4 text-center w-32">
                                <p className="text-3xl mb-1">🥈</p>
                                <p className="text-white font-semibold text-sm truncate">
                                    {leaderboard[1].name}
                                </p>
                                <p className="text-violet-200 text-xs">
                                    {leaderboard[1].eloRating} ELO
                                </p>
                            </div>

                            {/* 1st place — taller */}
                            <div className="bg-white/30 rounded-xl p-4 text-center w-36 mb-0 -mt-4">
                                <p className="text-4xl mb-1">🥇</p>
                                <p className="text-white font-bold truncate">
                                    {leaderboard[0].name}
                                </p>
                                <p className="text-violet-200 text-sm">
                                    {leaderboard[0].eloRating} ELO
                                </p>
                            </div>

                            {/* 3rd place */}
                            <div className="bg-white/20 rounded-xl p-4 text-center w-32">
                                <p className="text-3xl mb-1">🥉</p>
                                <p className="text-white font-semibold text-sm truncate">
                                    {leaderboard[2].name}
                                </p>
                                <p className="text-violet-200 text-xs">
                                    {leaderboard[2].eloRating} ELO
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="max-w-4xl mx-auto px-8 py-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Table header */}
                    <div className="grid grid-cols-4 px-6 py-3 bg-slate-50 border-b border-slate-200">
                        <p className="text-slate-500 text-sm font-semibold">Rank</p>
                        <p className="text-slate-500 text-sm font-semibold">Player</p>
                        <p className="text-slate-500 text-sm font-semibold">Email</p>
                        <p className="text-slate-500 text-sm font-semibold text-right">ELO Rating</p>
                    </div>

                    {/* Table rows */}
                    {leaderboard.map((player) => (
                        <div
                            key={player.email}
                            className={`grid grid-cols-4 px-6 py-4 border-b items-center ${getRowStyle(player.rank, player.email)}`}
                        >
                            {/* Rank */}
                            <p className="text-xl font-bold">
                                {getRankDisplay(player.rank)}
                            </p>

                            {/* Name */}
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                                    <span className="text-violet-600 font-bold text-sm">
                                        {player.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-slate-800 font-semibold">
                                    {player.name}
                                    {player.email === user?.email && (
                                        <span className="ml-2 text-xs bg-violet-100 text-violet-600 px-2 py-0.5 rounded-full">
                                            You
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Email */}
                            <p className="text-slate-400 text-sm truncate">
                                {player.email}
                            </p>

                            {/* ELO */}
                            <p className="text-right font-bold text-violet-600">
                                {player.eloRating}
                                <span className="text-slate-400 font-normal text-sm ml-1">
                                    ELO
                                </span>
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-slate-400 text-sm mt-4">
                    Showing top {leaderboard.length} players
                </p>
            </div>
        </div>
    )
}