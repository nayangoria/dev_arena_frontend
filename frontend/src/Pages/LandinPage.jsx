import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/20 to-emerald-50/30 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                    transition-colors duration-300">

      {/* ========== NAVBAR ========== */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl 
                      border-b border-teal-200/40 dark:border-teal-800/40 shadow-sm
                      transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl sm:text-2xl">⚔️</span>
            <span className="font-black text-lg sm:text-xl tracking-tight text-slate-800 dark:text-white">
              Dev
              <span className="bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Arena
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 
                         font-semibold text-xs sm:text-sm px-3 sm:px-5 py-2 rounded-full 
                         transition-all duration-200 hover:bg-teal-50 dark:hover:bg-teal-950/40"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-linear-to-r from-teal-500 to-emerald-500 
                         hover:from-teal-600 hover:to-emerald-600 
                         text-white font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full 
                         shadow-md shadow-teal-200/50 dark:shadow-teal-900/40 
                         transition-all duration-200 hover:shadow-lg hover:scale-[1.03] active:scale-95"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <div className="relative overflow-hidden 
                      bg-linear-to-br from-teal-600 via-emerald-600 to-cyan-600 
                      dark:from-teal-900 dark:via-emerald-900 dark:to-cyan-950 text-white">
        <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-400/25 dark:bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-400/20 dark:bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-40 bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 
                          text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8 shadow-lg">
            🏆 Competitive Coding + AI Judge
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-5 sm:mb-6 leading-[1.1] tracking-tight">
            Code. Battle. <br />
            <span className="bg-linear-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent">
              Dominate.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-teal-50/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Challenge developers in real-time 1v1 coding battles. Get AI-powered
            verdicts, complexity analysis, and climb the ELO leaderboard.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-teal-700 hover:bg-teal-50 font-bold 
                         px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg 
                         shadow-xl shadow-black/10 transition-all duration-300 
                         hover:scale-[1.03] hover:shadow-2xl active:scale-95"
            >
              Start Battling Free ⚔️
            </button>
            <button
              onClick={() => navigate("/problems")}
              className="border-2 border-white/40 hover:border-white bg-white/10 backdrop-blur-sm 
                         text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg 
                         transition-all duration-300 hover:bg-white/20 hover:scale-[1.03] active:scale-95"
            >
              Browse Problems
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14 mt-12 sm:mt-20">
            {[
              { value: "300+", label: "Coding Problems" },
              { value: "1v1", label: "Live Battles" },
              { value: "AI", label: "Code Analyzer" },
              { value: "ELO", label: "Rating System" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6 sm:gap-10 md:gap-14">
                {i > 0 && (
                  <div className="hidden sm:block w-px h-10 sm:h-12 bg-white/20" />
                )}
                <div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-black text-amber-200 drop-shadow-sm">
                    {stat.value}
                  </p>
                  <p className="text-teal-100/80 text-xs sm:text-sm mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== HOW IT WORKS ========== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16 sm:py-24 md:py-28">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-3 sm:mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            Get started in minutes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {[
            {
              step: "01",
              icon: "📝",
              title: "Create Account",
              description:
                "Register for free and get your starting ELO rating of 1000. No credit card required.",
            },
            {
              step: "02",
              icon: "⚔️",
              title: "Join a Battle",
              description:
                "Create a battle room or join with a code. Both players get the same problem in real time.",
            },
            {
              step: "03",
              icon: "🤖",
              title: "AI Verdict & Climb",
              description:
                "First to solve wins. AI Judge analyzes your code — complexity, quality, and feedback — then ELO updates.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="group text-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl 
                         rounded-2xl sm:rounded-3xl p-6 sm:p-8 
                         border border-slate-200/60 dark:border-slate-700/50 
                         shadow-sm hover:shadow-xl hover:shadow-teal-100/40 dark:hover:shadow-teal-950/30 
                         transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative inline-block mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-teal-100 to-emerald-100 
                                dark:from-teal-900/50 dark:to-emerald-900/40 
                                rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mx-auto 
                                shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 
                                bg-linear-to-br from-teal-500 to-emerald-500 rounded-full 
                                flex items-center justify-center shadow-md">
                  <span className="text-white text-[10px] sm:text-xs font-bold">
                    {item.step}
                  </span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 sm:mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-[15px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========== FEATURES ========== */}
      <div className="bg-linear-to-b from-transparent via-teal-50/30 to-transparent 
                      dark:via-slate-900/50 py-16 sm:py-24 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-3 sm:mb-4 tracking-tight">
              Everything You Need
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
              Built for competitive programmers
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              {
                icon: "🔥",
                title: "Real-time Battles",
                description:
                  "WebSocket-powered live battles. See opponent submissions in real time. First correct solution wins.",
                accent: "from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/20 border-rose-100 dark:border-rose-800/40 hover:border-rose-200 dark:hover:border-rose-700",
              },
              {
                icon: "🤖",
                title: "AI Judge & Analyzer",
                description:
                  "After the battle, AI analyzes both solutions — time/space complexity, code quality, edge cases, and gives clear feedback on the Verdict page.",
                accent: "from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/20 border-cyan-100 dark:border-cyan-800/40 hover:border-cyan-200 dark:hover:border-cyan-700",
              },
              {
                icon: "📈",
                title: "Complexity & Quality Report",
                description:
                  "Get estimated Big-O, readability score, potential bugs, and optimization tips from the AI analyzer — not just pass/fail.",
                accent: "from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border-violet-100 dark:border-violet-800/30 hover:border-violet-200 dark:hover:border-violet-700",
              },
              {
                icon: "🛡️",
                title: "Secure Code Execution",
                description:
                  "Every submission runs in an isolated Docker container. Your code is safe and our servers stay protected.",
                accent: "from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20 border-sky-100 dark:border-sky-800/40 hover:border-sky-200 dark:hover:border-sky-700",
              },
              {
                icon: "📊",
                title: "ELO Rating System",
                description:
                  "Chess-inspired ratings. Beat stronger opponents to gain more points. Lose less against higher-rated players.",
                accent: "from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/20 border-emerald-100 dark:border-emerald-800/40 hover:border-emerald-200 dark:hover:border-emerald-700",
              },
              {
                icon: "💻",
                title: "VS Code Editor",
                description:
                  "Monaco Editor — the same engine as VS Code. Syntax highlighting and auto-indent for Java, Python, and JavaScript.",
                accent: "from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/20 border-teal-100 dark:border-teal-800/40 hover:border-teal-200 dark:hover:border-teal-700",
              },
              {
                icon: "🎯",
                title: "300+ Problems",
                description:
                  "Curated problems from beginner to expert. Filter by difficulty and tags. Practice solo or battle live.",
                accent: "from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20 border-amber-100 dark:border-amber-800/40 hover:border-amber-200 dark:hover:border-amber-700",
              },
              {
                icon: "🏅",
                title: "Global Leaderboard",
                description:
                  "Redis-powered real-time leaderboard. See where you rank among all players and track your climb.",
                accent: "from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/20 border-orange-100 dark:border-orange-800/40 hover:border-orange-200 dark:hover:border-orange-700",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className={`group bg-linear-to-br ${feature.accent} border rounded-2xl sm:rounded-3xl 
                            p-5 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5
                            backdrop-blur-sm`}
              >
                <span className="text-2xl sm:text-3xl mb-3 sm:mb-4 block group-hover:scale-110 transition-transform duration-300 origin-left">
                  {feature.icon}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-1.5 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== AI JUDGE HIGHLIGHT ========== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl 
                        bg-linear-to-br from-cyan-500/10 via-teal-500/10 to-emerald-500/10 
                        dark:from-cyan-900/30 dark:via-teal-900/20 dark:to-emerald-900/30
                        border border-teal-200/50 dark:border-teal-700/40
                        backdrop-blur-xl p-6 sm:p-10 md:p-12">
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="text-5xl sm:text-6xl shrink-0">🤖</div>
            <div className="text-center md:text-left">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2 sm:mb-3 tracking-tight">
                AI Judge on every Verdict
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                After a battle ends, open the Verdict page to see AI analysis of both solutions:
                estimated time &amp; space complexity, code quality score, possible edge-case gaps,
                and concrete improvement tips — so you learn from every match, win or lose.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== CTA ========== */}
      <div className="relative overflow-hidden 
                      bg-linear-to-r from-teal-600 via-emerald-600 to-cyan-600 
                      dark:from-teal-900 dark:via-emerald-900 dark:to-cyan-950 py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.12),transparent_60%)]" />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-5 tracking-tight">
            Ready to Battle?
          </h2>
          <p className="text-teal-50/90 text-base sm:text-lg mb-8 sm:mb-10">
            Join DevArena today — code, compete, and grow with AI-powered feedback
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-teal-700 hover:bg-teal-50 font-bold 
                       px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-base sm:text-lg 
                       shadow-xl shadow-black/15 transition-all duration-300 
                       hover:scale-[1.04] hover:shadow-2xl active:scale-95"
          >
            Create Free Account ⚔️
          </button>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl 
                         border-t border-slate-200/60 dark:border-slate-700/50 
                         px-4 sm:px-8 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">⚔️</span>
            <span className="font-bold text-slate-800 dark:text-white">
              Dev
              <span className="bg-linear-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
                Arena
              </span>
            </span>
          </div>

          <p className="text-slate-400 dark:text-slate-500 text-sm">
            Built with Java Spring Boot + React
          </p>

          <div className="flex items-center gap-5">
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              © 2026 DevArena
            </p>
            <span
              onClick={() => navigate("/admin/login")}
              className="text-slate-200 dark:text-slate-700 text-xs cursor-pointer 
                         hover:text-slate-400 dark:hover:text-slate-500 transition-colors"
            >
              ...
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;