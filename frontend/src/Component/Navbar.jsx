import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileOpen(false);
  };

  const navItems = [
    { label: "Problems", path: "/problems", color: "hover:text-cyan-500 dark:hover:text-cyan-400" },
    { label: "LeaderBoard", path: "/leaderboard", color: "hover:text-amber-500 dark:hover:text-amber-400" },
    { label: "Battle", path: "/lobby", color: "hover:text-rose-500 dark:hover:text-rose-400" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-teal-200/40 dark:border-teal-800/40 
                    bg-linear-to-r from-white via-teal-50/30 to-emerald-50/20 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
                    backdrop-blur-xl shadow-md shadow-teal-100/30 dark:shadow-teal-950/20
                    transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/problems");
              setMobileOpen(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 drop-shadow-sm">
              ⚔️
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              Dev
              <span className="bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                Arena
              </span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative px-4 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 
                           ${item.color}
                           transition-all duration-200 rounded-xl
                           hover:bg-white/80 dark:hover:bg-slate-800/80
                           hover:shadow-sm`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side – desktop */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl 
                         bg-amber-50 dark:bg-amber-950/40
                         text-amber-500 dark:text-amber-400
                         border border-amber-200/60 dark:border-amber-800/40
                         hover:bg-amber-100 dark:hover:bg-amber-900/50
                         hover:scale-105 active:scale-90
                         transition-all duration-300"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile pill */}
                <button
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full
                             bg-linear-to-r from-teal-50 to-emerald-50 
                             dark:from-teal-950/50 dark:to-emerald-950/40
                             border border-teal-200/70 dark:border-teal-700/50
                             hover:border-teal-400 dark:hover:border-teal-500
                             hover:shadow-md hover:shadow-teal-200/40 dark:hover:shadow-teal-900/30
                             transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-teal-400 via-emerald-400 to-cyan-500 
                                  flex items-center justify-center text-white text-sm font-bold
                                  shadow-md shadow-teal-300/50 dark:shadow-teal-800/40
                                  ring-2 ring-white dark:ring-slate-800
                                  group-hover:scale-105 transition-transform duration-300">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-semibold text-teal-800 dark:text-teal-200 max-w-30 truncate">
                    {user.name}
                  </span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-semibold rounded-xl
                             bg-rose-50 dark:bg-rose-950/40
                             border border-rose-200 dark:border-rose-800/60
                             text-rose-600 dark:text-rose-400
                             hover:bg-rose-100 dark:hover:bg-rose-900/50
                             hover:border-rose-300 dark:hover:border-rose-700
                             hover:shadow-md hover:shadow-rose-200/40
                             transition-all duration-300 active:scale-95"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-sm font-semibold rounded-xl
                             bg-cyan-50 dark:bg-cyan-950/40
                             border border-cyan-200 dark:border-cyan-800/50
                             text-cyan-700 dark:text-cyan-300
                             hover:bg-cyan-100 dark:hover:bg-cyan-900/50
                             hover:border-cyan-400 dark:hover:border-cyan-600
                             transition-all duration-300 active:scale-95"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm font-semibold rounded-xl text-white
                             bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500
                             hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600
                             shadow-md shadow-teal-300/40 dark:shadow-teal-900/40
                             hover:shadow-lg hover:shadow-teal-400/40 dark:hover:shadow-teal-800/50
                             hover:scale-[1.03] active:scale-95
                             transition-all duration-300"
                >
                  Login
                </button>
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl 
                         bg-amber-50 dark:bg-amber-950/40
                         text-amber-500 dark:text-amber-400
                         border border-amber-200/60 dark:border-amber-800/40
                         transition-all duration-300"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="p-2 rounded-xl 
                         bg-teal-50 dark:bg-teal-950/40
                         text-teal-600 dark:text-teal-400
                         border border-teal-200/60 dark:border-teal-800/40
                         transition-all duration-300"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-112 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 space-y-1.5 border-t border-teal-200/40 dark:border-teal-800/40 
                        bg-lienar-to-b from-white/95 to-teal-50/50 
                        dark:from-slate-900/95 dark:to-slate-950/95 backdrop-blur-xl">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold
                         text-slate-600 dark:text-slate-300
                         ${item.color}
                         hover:bg-white dark:hover:bg-slate-800
                         hover:shadow-sm
                         transition-all duration-200`}
            >
              {item.label}
            </button>
          ))}

          <div className="h-px bg-linear-to-r from-transparent via-teal-300 dark:via-teal-700 to-transparent my-2" />

          {user ? (
            <>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                           bg-linear-to-r from-teal-50 to-emerald-50 
                           dark:from-teal-950/40 dark:to-emerald-950/30
                           border border-teal-200/50 dark:border-teal-800/40
                           hover:shadow-md hover:shadow-teal-200/30
                           transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-teal-400 via-emerald-400 to-cyan-500 
                                flex items-center justify-center text-white text-sm font-bold
                                shadow-md shadow-teal-300/40 ring-2 ring-white dark:ring-slate-800">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-teal-800 dark:text-teal-200">
                    {user.name}
                  </p>
                  <p className="text-xs text-teal-600/70 dark:text-teal-400/70">View profile</p>
                </div>
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold
                           text-rose-600 dark:text-rose-400
                           bg-rose-50 dark:bg-rose-950/30
                           border border-rose-200/50 dark:border-rose-800/40
                           hover:bg-rose-100 dark:hover:bg-rose-900/40
                           transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => {
                  navigate("/register");
                  setMobileOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl text-sm font-semibold
                           bg-cyan-50 dark:bg-cyan-950/40
                           border border-cyan-200 dark:border-cyan-800/50
                           text-cyan-700 dark:text-cyan-300
                           hover:bg-cyan-100 dark:hover:bg-cyan-900/50
                           transition-all duration-200"
              >
                Register
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-white
                           bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500
                           hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600
                           shadow-md shadow-teal-300/30
                           transition-all duration-200"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;