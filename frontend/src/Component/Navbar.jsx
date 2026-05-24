import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"

function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
            {/* Logo */}
            <div
                onClick={() => navigate("/problems")}
                className="flex items-center gap-2 cursor-pointer"
            >
                <span className="text-2xl">⚔️</span>
                <span className="text-xl font-bold text-slate-800">
                    Dev<span className="text-violet-600">Arena</span>
                </span>
            </div>

            {/* Nav links */}
            <div className="flex items-center gap-6">
                <button
                    onClick={() => navigate("/problems")}
                    className="text-slate-600 hover:text-violet-600 font-medium transition-colors duration-200"
                >
                    Problems
                </button>
                 <button
                    onClick={() => navigate("/leaderboard")}
                    className="text-slate-600 hover:text-violet-600 font-medium transition-colors duration-200"
                >
                    LeaderBoard
                </button>
                <button 
                onClick={() => navigate("/lobby")}
                className="text-slate-600 hover:text-violet-600 font-medium transition-colors duration-200">Battle</button>

                {/* Show different buttons based on login state */}
                {user ? (
                    // User is logged in
                    <div className="flex items-center gap-4">
                        <span className="text-slate-600 font-medium">
                            👋 {user.name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="border border-red-300 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // User is not logged in
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/register")}
                            className="border border-violet-600 text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Register
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                        >
                            Login
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar