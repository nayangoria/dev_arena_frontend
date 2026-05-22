import { useNavigate } from "react-router-dom"

function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white">

 

            {/* Hero Section */}
            <div className="bg-linear-to-br from-violet-600 via-indigo-600 to-blue-700 text-white">
                <div className="max-w-6xl mx-auto px-8 py-24 text-center">
                    <div className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
                        🏆 Competitive Coding Platform
                    </div>
                    <h1 className="text-6xl font-black mb-6 leading-tight">
                        Code. Battle. <br />
                        <span className="text-yellow-300">Dominate.</span>
                    </h1>
                    <p className="text-xl text-violet-200 mb-10 max-w-2xl mx-auto">
                        Challenge developers worldwide in real-time 1v1 coding battles.
                        Climb the leaderboard, improve your ELO rating, and become
                        the ultimate coding champion.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-white text-violet-600 hover:bg-violet-50 font-bold px-8 py-4 rounded-xl text-lg transition-colors shadow-lg"
                        >
                            Start Battling Free ⚔️
                        </button>
                        <button
                            onClick={() => navigate("/problems")}
                            className="border-2 border-white/50 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-lg transition-colors"
                        >
                            Browse Problems
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-12 mt-16">
                        <div>
                            <p className="text-4xl font-black text-yellow-300">300+</p>
                            <p className="text-violet-200 text-sm mt-1">Coding Problems</p>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div>
                            <p className="text-4xl font-black text-yellow-300">1v1</p>
                            <p className="text-violet-200 text-sm mt-1">Live Battles</p>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div>
                            <p className="text-4xl font-black text-yellow-300">3</p>
                            <p className="text-violet-200 text-sm mt-1">Languages</p>
                        </div>
                        <div className="w-px h-12 bg-white/20"></div>
                        <div>
                            <p className="text-4xl font-black text-yellow-300">ELO</p>
                            <p className="text-violet-200 text-sm mt-1">Rating System</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How it works */}
            <div className="max-w-6xl mx-auto px-8 py-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-slate-800 mb-4">
                        How It Works
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Get started in minutes
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
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
                        <div key={item.step} className="text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-20 h-20 bg-violet-100 rounded-2xl flex items-center justify-center text-4xl mx-auto">
                                    {item.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{item.step}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            <div className="bg-slate-50 py-24">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-800 mb-4">
                            Everything You Need
                        </h2>
                        <p className="text-slate-500 text-lg">
                            Built for competitive programmers
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {[
                            {
                                icon: "🔥",
                                title: "Real-time Battles",
                                description: "WebSocket powered live battles. See your opponent's progress in real time. First to solve wins.",
                                color: "bg-red-50 border-red-100"
                            },
                            {
                                icon: "🛡️",
                                title: "Secure Code Execution",
                                description: "Every submission runs in an isolated Docker container. Your code is safe and our servers are protected.",
                                color: "bg-blue-50 border-blue-100"
                            },
                            {
                                icon: "📊",
                                title: "ELO Rating System",
                                description: "Chess-inspired rating system. Beat stronger opponents to gain more points. Lose less when beaten by stronger players.",
                                color: "bg-green-50 border-green-100"
                            },
                            {
                                icon: "💻",
                                title: "VS Code Editor",
                                description: "Monaco Editor — the same editor that powers VS Code. Syntax highlighting, auto-indent for Java, Python and JavaScript.",
                                color: "bg-violet-50 border-violet-100"
                            },
                            {
                                icon: "🎯",
                                title: "300+ Problems",
                                description: "Curated problems from Codeforces ranging from beginner to expert. Filter by difficulty and tags.",
                                color: "bg-yellow-50 border-yellow-100"
                            },
                            {
                                icon: "🏅",
                                title: "Global Leaderboard",
                                description: "Redis-powered real-time leaderboard. See where you rank among all players globally.",
                                color: "bg-orange-50 border-orange-100"
                            }
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className={`border rounded-2xl p-6 ${feature.color}`}
                            >
                                <span className="text-3xl mb-4 block">{feature.icon}</span>
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

            {/* CTA Section */}
            <div className="bg-linear-to-r from-violet-600 to-indigo-600 py-20">
                <div className="max-w-3xl mx-auto px-8 text-center">
                    <h2 className="text-4xl font-black text-white mb-4">
                        Ready to Battle?
                    </h2>
                    <p className="text-violet-200 text-lg mb-8">
                        Join DevArena today and start your competitive coding journey
                    </p>
                    <button
                        onClick={() => navigate("/register")}
                        className="bg-white text-violet-600 hover:bg-violet-50 font-bold px-10 py-4 rounded-xl text-lg transition-colors shadow-lg"
                    >
                        Create Free Account ⚔️
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-slate-100 px-8 py-8">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl">⚔️</span>
                        <span className="font-bold text-slate-800">
                            Dev<span className="text-violet-600">Arena</span>
                        </span>
                    </div>

                    <p className="text-slate-400 text-sm">
                        Built with Java Spring Boot + React
                    </p>

                    {/* Hidden admin link */}
                    <div className="flex items-center gap-4">
                        <p className="text-slate-400 text-sm">
                            © 2026 DevArena
                        </p>
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