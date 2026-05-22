import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import axios from "../api/axiosInstance"

function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleLogin = async () => {
        setError("")
        if (!email || !password) {
            setError("Please enter email and password")
            return
        }
        try {
            setLoading(true)
            const response = await axios.post(
                "/api/auth/login",
                { email, password }
            )
            const data = response.data
            login({ email: data.email, name: data.name }, data.token)
            navigate("/admin/dashboard")
        } catch (err) {
            setError("Invalid credentials or not an admin account",err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <span className="text-4xl">🛡️</span>
                    <h1 className="text-2xl font-bold text-white mt-3">
                        Admin <span className="text-violet-400">Portal</span>
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">Restricted access only</p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 text-sm px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="admin@devArena.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    {loading ? "Logging in..." : "Login to Admin"}
                </button>
            </div>
        </div>
    )
}

export default AdminLoginPage