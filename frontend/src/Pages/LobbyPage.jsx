import axios from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LobbyPage() {
    const [creating, setCreating] = useState(false)
    const [joining, setJoining] = useState(false)
    const [error, setError] = useState(null)
    const [joinCode, setJoinCode] = useState("")
    const { user } = useAuth()
    const navigate = useNavigate()

    async function createRoom() {
        setError(null)
        setCreating(true)
        try {
            const response = await axios.post(
                "/api/room/create",
                { email: user.email }
            )
            navigate(`/battle/${response.data.roomCode}`)
        } catch (error) {
            console.log(error)
            setError("Failed to create room")
        } finally {
            setCreating(false)
        }
    }

    async function joinRoom() {
        if (!joinCode.trim()) {
            setError("Please enter a room code")
            return
        }
        setError(null)
        setJoining(true)
        try {
            console.log(joinCode)
            const response = await axios.post(
                "/api/room/join",
                {emailPlayer2: user.email,roomCode: joinCode.toUpperCase()}
            )
            console.log(response.data)
            navigate(`/battle/${response.data.roomCode}`)
        } catch (error) {
            console.log(error)
            setError("Room not found or already full")
        } finally {
            setJoining(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl">

                {/* Header */}
                <div className="text-center mb-10">
                    <span className="text-5xl">⚔️</span>
                    <h1 className="text-3xl font-bold text-slate-800 mt-4">
                        Battle <span className="text-violet-600">Lobby</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Welcome {user?.name}! Create or join a battle room.
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6 text-center">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-6">

                    {/* Create Room */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
                        <div className="text-4xl mb-4">🏟️</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">
                            Create Room
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Start a new battle and share the room code with your opponent
                        </p>
                        <button
                            onClick={createRoom}
                            disabled={creating}
                            className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                        >
                            {creating ? "Creating..." : "Create Room"}
                        </button>
                    </div>

                    {/* Join Room */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
                        <div className="text-4xl mb-4">🔗</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">
                            Join Room
                        </h2>
                        <p className="text-slate-400 text-sm mb-4">
                            Enter the room code shared by your opponent
                        </p>
                        <input
                            type="text"
                            placeholder="Enter room code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-3 text-center font-mono tracking-widest"
                            maxLength={6}
                        />
                        <button
                            onClick={joinRoom}
                            disabled={joining}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                        >
                            {joining ? "Joining..." : "Join Room"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LobbyPage;