import { useState } from "react"
// import { useAuth } from "../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "../api/axiosInstance"

function AdminDashboard() {
   
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const fetchProblems = async () => {
        setLoading(true)
        setMessage(null)
        try {
            const response = await axios.post(
                "/api/admin/fetch-problems",
                {}
            )
            setMessage({
                success: true,
                text: `✅ ${response.data.message} — ${response.data.count} problems added`
            })
        } catch (err) {
            setMessage({
                success: false,
                text: "❌ Failed to fetch problems. Are you logged in as admin?"
            })
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploading(true)
    setMessage(null)

    try {
        // Read file content
        const text = await file.text()
        const data = JSON.parse(text)

        // Send to backend
        const response = await axios.post("/api/admin/upload-problems", data)
        setMessage({
            success: true,
            text: `✅ ${response.data.message} — ${response.data.count} problems updated`
        })
    } catch (err) {
        setMessage({
            success: false,
            text: "❌ Failed to upload. Check your JSON format."
        })
        console.log(err)
    } finally {
        setUploading(false)
    }
}

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            🛡️ Admin <span className="text-violet-400">Dashboard</span>
                        </h1>
                        <p className="text-slate-400 mt-1">Manage DevArena</p>
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ← Back to site
                    </button>
                </div>

                {/* Message */}
                {message && (
                    <div className={`p-4 rounded-lg mb-6 ${
                        message.success
                            ? "bg-green-900/50 border border-green-700 text-green-300"
                            : "bg-red-900/50 border border-red-700 text-red-300"
                    }`}>
                        {message.text}
                    </div>
                )}

                {/* Cards */}
                <div className="grid grid-cols-2 gap-6">

                    {/* Fetch Problems */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <span className="text-3xl mb-4 block">📥</span>
                        <h2 className="text-xl font-bold text-white mb-2">
                            Fetch Problems
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Fetch 300 problems from Codeforces API and save to database.
                            Skips already existing problems.
                        </p>
                        <button
                            onClick={fetchProblems}
                            disabled={loading}
                            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            {loading ? "Fetching..." : "Fetch from Codeforces"}
                        </button>
                    </div>

                    {/* View Problems */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <span className="text-3xl mb-4 block">📋</span>
                        <h2 className="text-xl font-bold text-white mb-2">
                            View Problems
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Browse all problems in the database.
                            Check titles, difficulties and tags.
                        </p>
                        <button
                            onClick={() => navigate("/problems")}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            View All Problems
                        </button>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <span className="text-3xl mb-4 block">🏆</span>
                        <h2 className="text-xl font-bold text-white mb-2">
                            Leaderboard
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            View the global leaderboard and player rankings.
                        </p>
                        <button
                            onClick={() => navigate("/leaderboard")}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            View Leaderboard
                        </button>
                    </div>

                    {/* Battle Lobby */}
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                        <span className="text-3xl mb-4 block">⚔️</span>
                        <h2 className="text-xl font-bold text-white mb-2">
                            Battle Lobby
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Go to the battle lobby to test the battle system.
                        </p>
                        <button
                            onClick={() => navigate("/lobby")}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            Go to Lobby
                        </button>
                    </div>
                    {/* Upload Problems JSON */}
         <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <span className="text-3xl mb-4 block">📤</span>
             <h2 className="text-xl font-bold text-white mb-2">
                   Upload Problems JSON
                   </h2>
            <p className="text-slate-400 text-sm mb-6">
              Upload a JSON file with problem descriptions and test cases.
            </p>
          <input
             type="file"
             accept=".json"
             onChange={handleFileUpload}
             className="hidden"
             id="jsonUpload"
            />
            <label
            htmlFor="jsonUpload"
                   className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer block text-center"
                 >
                  {uploading ? "Uploading..." : "Choose JSON File"}
                </label>
               </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard