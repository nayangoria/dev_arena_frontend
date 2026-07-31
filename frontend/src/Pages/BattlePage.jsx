import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBattleSocket } from "../hook/useBattelHook";
import { CodeEditor } from "./CodeEditor";
import axios from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function BattlePage() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [problem, setproblem] = useState(null);
  const [room, setRoom] = useState(null);
  const [results, setResults] = useState([]);
  const [battleOver, setBattleOver] = useState(false);
  const [winnerEmail, setWinnerEmail] = useState(null);
  const [notification, setNotification] = useState(null);
  const [eloChange, setEloChange] = useState(null);

  const { sendSubmission } = useBattleSocket(
    roomCode,
    (message) => {
      setResults((prev) => [...prev, message]);
      if (message.submitterEmail !== user.email) {
        setNotification({
          submitter: message.submitterEmail,
          success: message.success,
        });
        setTimeout(() => setNotification(null), 4000);
      }
      if (message.battleOver) {
        setBattleOver(true);
        setWinnerEmail(message.winnerEmail);
        setEloChange({
          winnerChange: message.winnerEloChange,
          loserChange: message.loserEloChange,
        });
      }
    },
    (update) => {
      setRoom((prev) => ({
        ...prev,
        player2Email: update.player2Email,
        status: update.status,
      }));
    }
  );

  useEffect(() => {
    async function loadRoom() {
      try {
        const roomResp = await axios.get(`/api/room/${roomCode}`);
        setRoom(roomResp.data);

        const problemResp = await axios.get(
          `/api/problems/${roomResp.data.problemId}`
        );
        setproblem(problemResp.data);
      } catch (error) {
        console.log("Error Loading Room :-", error);
      } finally {
        setLoading(false);
      }
    }
    loadRoom();
  }, [roomCode, token]);

  const iWon = winnerEmail === user.email;

  if (loading)
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 border-[5px] border-teal-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-teal-200 dark:shadow-teal-900/40"></div>
          <p className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">
            Loading battle room...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col">
      {/* Opponent submission popup */}
      {notification && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3.5 sm:px-7 sm:py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-sm animate-bounce max-w-[90vw] ${
            notification.success
              ? "bg-red-50/95 dark:bg-red-950/90 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300"
              : "bg-amber-50/95 dark:bg-amber-950/90 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
          }`}
        >
          <p className="font-bold text-center text-sm">
            {notification.success
              ? `⚠️ ${notification.submitter} just submitted successfully!`
              : `💨 ${notification.submitter} submitted but failed`}
          </p>
        </div>
      )}

      {/* Winner banner */}
      {battleOver && (
        <div
          className={`w-full py-4 sm:py-5 text-center border-b-2 shadow-sm ${
            iWon
              ? "bg-linear-to-r from-emerald-400 to-teal-500 text-white border-emerald-300"
              : "bg-linear-to-r from-rose-400 to-red-500 text-white border-rose-300"
          }`}
        >
          <p className="font-bold text-lg sm:text-xl tracking-wide px-4">
            {iWon
              ? "🏆 You Won! Congratulations!"
              : `😔 You Lost! ${winnerEmail} solved it first!`}
          </p>
          {eloChange && (
            <p className="text-sm mt-1.5 opacity-90 font-medium">
              {iWon
                ? `ELO: +${eloChange.winnerChange} points`
                : `ELO: ${eloChange.loserChange} points`}
            </p>
          )}
        </div>
      )}

      {/* Battle header */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="text-slate-800 dark:text-slate-100 font-bold text-base sm:text-lg tracking-tight">
            ⚔️ Battle Room
          </span>

          <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-mono font-semibold border border-slate-200 dark:border-slate-700">
            {roomCode}
          </span>

          {/* Verdict only after battle is over */}
          {battleOver && (
            <button
              onClick={() => navigate(`/verdict/${roomCode}`)}
              className="inline-flex items-center gap-1.5 bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full shadow-md shadow-teal-200 dark:shadow-teal-900/40 transition-all duration-200 hover:shadow-lg hover:scale-[1.03] active:scale-95"
            >
              📊 Verdict
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-300"></div>
            <span className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium truncate max-w-30 sm:max-w-none">
              {room?.player1Email}
            </span>
          </div>

          <span className="text-slate-400 dark:text-slate-500 font-bold text-xs sm:text-sm tracking-wider">
            VS
          </span>

          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-slate-200 dark:border-slate-700">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                room?.player2Email
                  ? "bg-emerald-400 shadow-sm shadow-emerald-300"
                  : "bg-slate-300 dark:bg-slate-600 animate-pulse"
              }`}
            ></div>
            <span className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-medium truncate max-w-30 sm:max-w-none">
              {room?.player2Email || "Waiting for opponent..."}
            </span>
          </div>
        </div>

        <span
          className={`text-[10px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full tracking-wide uppercase self-start sm:self-auto ${
            battleOver
              ? "bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-700"
              : room?.status === "WAITING"
              ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 border border-amber-200 dark:border-amber-700"
              : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700"
          }`}
        >
          {battleOver ? "FINISHED" : room?.status}
        </span>
      </div>

      {/* Main content – stacks on mobile */}
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Left – Problem + Results */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-6 lg:p-7 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-700/80 bg-white/40 dark:bg-slate-900/40">
          {problem && (
            <>
              <div className="flex items-center gap-3 mb-4 sm:mb-5 flex-wrap">
                <h2 className="text-slate-800 dark:text-slate-100 text-xl sm:text-2xl font-bold tracking-tight">
                  {problem.title}
                </h2>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full tracking-wide ${
                    problem.difficulty === "EASY"
                      ? "text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-700"
                      : problem.difficulty === "MEDIUM"
                      ? "text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700"
                      : "text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/40 border border-rose-200 dark:border-rose-700"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[14px] sm:text-[15px]">
                {problem.description}
              </p>
              <div className="border-t border-slate-200 dark:border-slate-700 my-5 sm:my-7"></div>
            </>
          )}

          <h3 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
            Submissions
          </h3>

          {results.length === 0 ? (
            <p className="text-slate-400 dark:text-slate-500 text-sm italic">
              No submissions yet...
            </p>
          ) : (
            results.map((result, index) => (
              <div
                key={index}
                className={`p-3.5 sm:p-4 rounded-2xl mb-3 text-sm border shadow-sm ${
                  result.success
                    ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200"
                    : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2 gap-2">
                  <p className="font-bold">
                    {result.success ? "✅ Accepted" : "❌ Failed"}
                  </p>
                  <p className="text-xs opacity-70 font-medium truncate">
                    by{" "}
                    {result.submitterEmail === user.email
                      ? "You"
                      : result.submitterEmail}
                  </p>
                </div>
                <pre className="whitespace-pre-wrap text-xs font-mono bg-white/60 dark:bg-slate-900/60 rounded-xl p-3 border border-black/5 dark:border-white/5 overflow-x-auto">
                  {result.success ? result.output : result.error}
                </pre>
              </div>
            ))
          )}
        </div>

        {/* Right – Code Editor */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white/60 dark:bg-slate-900/60 min-h-[50vh] lg:min-h-0">
          <CodeEditor
            onSubmit={(code, language) =>
              sendSubmission(code, language, user.email)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default BattlePage;