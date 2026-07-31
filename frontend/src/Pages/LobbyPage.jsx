import axios from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LobbyPage() {
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState(null);
  const [joinCode, setJoinCode] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  async function createRoom() {
    setError(null);
    setCreating(true);
    try {
      const response = await axios.post("/api/room/create", {
        email: user.email,
      });
      navigate(`/battle/${response.data.roomCode}`);
    } catch (err) {
      console.log(err);
      setError("Failed to create room");
    } finally {
      setCreating(false);
    }
  }

  async function joinRoom() {
    if (!joinCode.trim()) {
      setError("Please enter a room code");
      return;
    }
    setError(null);
    setJoining(true);
    try {
      const response = await axios.post("/api/room/join", {
        emailPlayer2: user.email,
        roomCode: joinCode.toUpperCase(),
      });
      navigate(`/battle/${response.data.roomCode}`);
    } catch (err) {
      console.log(err);
      setError("Room not found or already full");
    } finally {
      setJoining(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/30 to-emerald-50/20 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                    flex items-center justify-center px-4 py-10 sm:py-16
                    transition-colors duration-300">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-5xl sm:text-6xl drop-shadow-sm inline-block 
                           hover:scale-110 hover:rotate-12 transition-transform duration-300">
            ⚔️
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mt-4 tracking-tight">
            Battle{" "}
            <span className="bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Lobby
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Welcome{" "}
            <span className="font-semibold text-teal-600 dark:text-teal-400">
              {user?.name}
            </span>
            ! Create or join a battle room.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50/90 dark:bg-rose-950/50 backdrop-blur-sm
                          border border-rose-200 dark:border-rose-800/50 
                          text-rose-600 dark:text-rose-400 text-sm 
                          px-4 py-3 rounded-2xl mb-6 text-center font-medium
                          shadow-sm shadow-rose-100/40 dark:shadow-rose-950/20
                          animate-pulse">
            {error}
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

          {/* Create Room */}
          <div className="relative overflow-hidden
                          bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                          border border-teal-200/60 dark:border-teal-800/40
                          rounded-2xl sm:rounded-3xl p-6 sm:p-8
                          shadow-lg shadow-teal-100/30 dark:shadow-teal-950/20
                          text-center
                          hover:shadow-xl hover:shadow-teal-200/40 dark:hover:shadow-teal-900/30
                          hover:scale-[1.02] transition-all duration-300 group">
            {/* soft glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 
                            bg-teal-400/15 dark:bg-teal-500/10 rounded-full blur-2xl
                            group-hover:bg-teal-400/25 transition-colors duration-500" />

            <div className="relative">
              <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                🏟️
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Create Room
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Start a new battle and share the room code with your opponent
              </p>
              <button
                onClick={createRoom}
                disabled={creating}
                className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white
                           bg-linear-to-r from-teal-500 to-emerald-500
                           hover:from-teal-600 hover:to-emerald-600
                           disabled:from-teal-400 disabled:to-emerald-400 disabled:cursor-not-allowed
                           shadow-md shadow-teal-200/50 dark:shadow-teal-900/40
                           hover:shadow-lg hover:shadow-teal-300/40
                           active:scale-95 transition-all duration-200"
              >
                {creating ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </span>
                ) : (
                  "Create Room"
                )}
              </button>
            </div>
          </div>

          {/* Join Room */}
          <div className="relative overflow-hidden
                          bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                          border border-cyan-200/60 dark:border-cyan-800/40
                          rounded-2xl sm:rounded-3xl p-6 sm:p-8
                          shadow-lg shadow-cyan-100/30 dark:shadow-cyan-950/20
                          text-center
                          hover:shadow-xl hover:shadow-cyan-200/40 dark:hover:shadow-cyan-900/30
                          hover:scale-[1.02] transition-all duration-300 group">
            {/* soft glow */}
            <div className="absolute -top-10 -left-10 w-32 h-32 
                            bg-cyan-400/15 dark:bg-cyan-500/10 rounded-full blur-2xl
                            group-hover:bg-cyan-400/25 transition-colors duration-500" />

            <div className="relative">
              <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                🔗
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Join Room
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed">
                Enter the room code shared by your opponent
              </p>
              <input
                type="text"
                placeholder="ROOM CODE"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                           border border-slate-200/80 dark:border-slate-700/60
                           rounded-xl px-4 py-3 
                           text-slate-800 dark:text-slate-100 
                           placeholder-slate-400 dark:placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-cyan-500/40 
                           focus:border-cyan-400 dark:focus:border-cyan-600
                           mb-3 text-center font-mono tracking-[0.3em] text-sm sm:text-base
                           transition-all duration-200"
                maxLength={6}
              />
              <button
                onClick={joinRoom}
                disabled={joining}
                className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white
                           bg-linear-to-r from-cyan-500 to-teal-500
                           hover:from-cyan-600 hover:to-teal-600
                           disabled:from-cyan-400 disabled:to-teal-400 disabled:cursor-not-allowed
                           shadow-md shadow-cyan-200/50 dark:shadow-cyan-900/40
                           hover:shadow-lg hover:shadow-cyan-300/40
                           active:scale-95 transition-all duration-200"
              >
                {joining ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Joining...
                  </span>
                ) : (
                  "Join Room"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LobbyPage;