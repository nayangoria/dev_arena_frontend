import { useNavigate } from "react-router-dom"

function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-slate-50">

            {/* ========== NAVBAR ========== */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <span className="text-2xl">⚔️</span>
                        <span className="font-black text-xl tracking-tight text-slate-800">
                            Dev<span className="text-violet-600">Arena</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/login")}
                            className="text-slate-600 hover:text-violet-600 font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 hover:bg-violet-50"
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-sm px-5 py-2 rounded-full shadow-md shadow-violet-200 transition-all duration-200 hover:shadow-lg hover:scale-[1.03] active:scale-95"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </nav>

            {/* ========== HERO ========== */}
            <div className="relative overflow-hidden bg-linear-to-br from-violet-600 via-indigo-600 to-blue-700 text-white">
                {/* soft glow orbs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-violet-400/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>

                <div className="relative max-w-6xl mx-auto px-8 py-28 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm font-medium px-5 py-2 rounded-full mb-8 shadow-lg">
                        🏆 Competitive Coding Platform
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                        Code. Battle. <br />
                        <span className="bg-linear-to-r from-yellow-300 via-amber-300 to-yellow-200 bg-clip-text text-transparent">
                            Dominate.
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-violet-100/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Challenge developers worldwide in real-time 1v1 coding battles.
                        Climb the leaderboard, improve your ELO rating, and become
                        the ultimate coding champion.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-white text-violet-700 hover:bg-violet-50 font-bold px-8 py-4 rounded-2xl text-lg shadow-xl shadow-black/10 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl active:scale-95"
                        >
                            Start Battling Free ⚔️
                        </button>
                        <button
                            onClick={() => navigate("/problems")}
                            className="border-2 border-white/40 hover:border-white bg-white/10 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:bg-white/20 hover:scale-[1.03] active:scale-95"
                        >
                            Browse Problems
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 mt-20">
                        {[
                            { value: "300+", label: "Coding Problems" },
                            { value: "1v1", label: "Live Battles" },
                            { value: "3", label: "Languages" },
                            { value: "ELO", label: "Rating System" },
                        ].map((stat, i) => (
                            <div key={stat.label} className="flex items-center gap-8 md:gap-14">
                                {i > 0 && <div className="hidden md:block w-px h-12 bg-white/20"></div>}
                                <div>
                                    <p className="text-3xl md:text-4xl font-black text-yellow-300 drop-shadow-sm">{stat.value}</p>
                                    <p className="text-violet-200 text-sm mt-1 font-medium">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ========== HOW IT WORKS ========== */}
            <div className="max-w-6xl mx-auto px-8 py-28">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Get started in minutes
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                        {
                            step: "01",
                            icon: "📝",
                            title: "Create Account",
                            description: "Register for free and get your starting ELO rating of 1000. No credit card required."
                        },
                        {
                            step: "02",
                            icon: "⚔️",
                            title: "Join a Battle",
                            description: "Create a battle room or join one with a room code. Both players get the same problem."
                        },
                        {
                            step: "03",
                            icon: "🏆",
                            title: "Win & Climb",
                            description: "First to solve the problem wins! Your ELO rating updates and you climb the leaderboard."
                        }
                    ].map((item) => (
                        <div
                            key={item.step}
                            className="group text-center bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative inline-block mb-6">
                                <div className="w-20 h-20 bg-linear-to-br from-violet-100 to-indigo-100 rounded-2xl flex items-center justify-center text-4xl mx-auto shadow-inner group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-linea from-violet-600 to-indigo-600 rounded-full flex items-center justify-center shadow-md">
                                    <span className="text-white text-xs font-bold">{item.step}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-[15px]">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ========== FEATURES ========== */}
            <div className="bg-linear-to-b from-slate-50 to-white py-28">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
                            Everything You Need
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Built for competitive programmers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                icon: "🔥",
                                title: "Real-time Battles",
                                description: "WebSocket powered live battles. See your opponent's progress in real time. First to solve wins.",
                                color: "from-rose-50 to-red-50 border-rose-100 hover:border-rose-200"
                            },
                            {
                                icon: "🛡️",
                                title: "Secure Code Execution",
                                description: "Every submission runs in an isolated Docker container. Your code is safe and our servers are protected.",
                                color: "from-sky-50 to-blue-50 border-sky-100 hover:border-sky-200"
                            },
                            {
                                icon: "📊",
                                title: "ELO Rating System",
                                description: "Chess-inspired rating system. Beat stronger opponents to gain more points. Lose less when beaten by stronger players.",
                                color: "from-emerald-50 to-green-50 border-emerald-100 hover:border-emerald-200"
                            },
                            {
                                icon: "💻",
                                title: "VS Code Editor",
                                description: "Monaco Editor — the same editor that powers VS Code. Syntax highlighting, auto-indent for Java, Python and JavaScript.",
                                color: "from-violet-50 to-indigo-50 border-violet-100 hover:border-violet-200"
                            },
                            {
                                icon: "🎯",
                                title: "300+ Problems",
                                description: "Curated problems from Codeforces ranging from beginner to expert. Filter by difficulty and tags.",
                                color: "from-amber-50 to-yellow-50 border-amber-100 hover:border-amber-200"
                            },
                            {
                                icon: "🏅",
                                title: "Global Leaderboard",
                                description: "Redis-powered real-time leaderboard. See where you rank among all players globally.",
                                color: "from-orange-50 to-amber-50 border-orange-100 hover:border-orange-200"
                            }
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className={`group bg-linear-to-br ${feature.color} border rounded-3xl p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                            >
                                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300 origin-left">
                                    {feature.icon}
                                </span>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ========== CTA ========== */}
            <div className="relative overflow-hidden bg-linear-to-r from-violet-600 via-indigo-600 to-blue-600 py-24">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)]"></div>
                
                <div className="relative max-w-3xl mx-auto px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">
                        Ready to Battle?
                    </h2>
                    <p className="text-violet-100 text-lg mb-10">
                        Join DevArena today and start your competitive coding journey
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-white text-violet-700 hover:bg-violet-50 font-bold px-10 py-4 rounded-2xl text-lg shadow-xl shadow-black/15 transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl active:scale-95"
                    >
                        Create Free Account ⚔️
                    </button>
                </div>
            </div>

            {/* ========== FOOTER ========== */}
            <footer className="bg-white border-t border-slate-100 px-8 py-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <span className="text-xl">⚔️</span>
                        <span className="font-bold text-slate-800">
                            Dev<span className="text-violet-600">Arena</span>
                        </span>
                    </div>

                    <p className="text-slate-400 text-sm">
                        Built with Java Spring Boot + React
                    </p>

                    <div className="flex items-center gap-5">
                        <p className="text-slate-400 text-sm">
                            © 2026 DevArena
                        </p>
                        {/* Hidden admin link */}
                        <span
                            onClick={() => navigate("/admin/login")}
                            className="text-slate-200 text-xs cursor-pointer hover:text-slate-400 transition-colors"
                        >
                            ...
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage