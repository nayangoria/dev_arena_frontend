import { useEffect, useState } from "react";
// import { useAuth } from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import { useBattleSocket } from "../hook/useBattelHook";
import { CodeEditor } from "./codeEditor";
import axios from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";

function BattlePage(){
    const {user,token}=useAuth()
    const [loading,setLoading]=useState(true);
    const {roomCode}=useParams()
    // const navigate=useNavigate()
    const [problem,setproblem]=useState(null);
    const [room,setRoom]=useState(null)
    const [results,setResults]=useState([])
    const [battleOver, setBattleOver] = useState(false)
    const [winnerEmail, setWinnerEmail] = useState(null)
    const [notification, setNotification] = useState(null)
    const [eloChange, setEloChange] = useState(null)
    const { sendSubmission } = useBattleSocket( roomCode,(message) => {
        setResults(prev => [...prev, message])

        if (message.submitterEmail !== user.email) {
            setNotification({
                submitter: message.submitterEmail,
                success: message.success
            })
            setTimeout(() => setNotification(null), 4000)
        }

        if (message.battleOver) {
            setBattleOver(true)
            setWinnerEmail(message.winnerEmail)
            setEloChange({
            winnerChange: message.winnerEloChange,
             loserChange: message.loserEloChange
           })
        }
     },
    // This third callback handles room updates
     (update) => {
        setRoom(prev => ({
            ...prev,
            player2Email: update.player2Email,
            status: update.status
         }))
      }
   )

    useEffect(()=>{
        async function loadRoom(){
        try{
            const roomResp= await axios.get(`/api/room/${roomCode}`)
            console.log(roomResp.data)
            setRoom(roomResp.data)
        
        const problemResp=await axios.get(`/api/problems/${roomResp.data.problemId}`)
        console.log(problemResp.data)
        setproblem(problemResp.data)
        }
        catch(error){
            console.log("Error Loading Room :-",error )
        }finally{
            setLoading(false)
        }
        
    }
    loadRoom()

    },[roomCode,token])
     const iWon = winnerEmail === user.email
    // const iLost = battleOver && !iWon

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading battle room...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">

            {/* Opponent submission popup notification */}
            {notification && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-2xl border animate-bounce ${
                    notification.success
                        ? "bg-red-900 border-red-500 text-red-200"
                        : "bg-yellow-900 border-yellow-500 text-yellow-200"
                }`}>
                    <p className="font-bold text-center">
                        {notification.success
                            ? `⚠️ ${notification.submitter} just submitted successfully!`
                            : `💨 ${notification.submitter} submitted but failed`
                        }
                    </p>
                </div>
            )}

            {/* Winner banner */}
            {battleOver && (
    <div className={`w-full py-5 text-center border-b ${
        iWon
            ? "bg-green-500 text-white border-green-400"
            : "bg-red-500 text-white border-red-400"
              }`}>
                <p className="font-bold text-xl">
               {iWon
                 ? "🏆 You Won! Congratulations!"
                  : `😔 You Lost! ${winnerEmail} solved it first!`
               }
              </p>
              {eloChange && (
                <p className="text-sm mt-1 opacity-90">
                  {iWon
                    ? `ELO: +${eloChange.winnerChange} points`
                    : `ELO: ${eloChange.loserChange} points`
                 }
                  </p>
                     )}
                  </div>
                     )}

            {/* Battle header */}
            <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <span className="text-white font-bold text-lg">⚔️ Battle Room</span>
                    <span className="bg-violet-600 text-white text-sm px-3 py-1 rounded-full font-mono">
                        {roomCode}
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300 text-sm">{room?.player1Email}</span>
                    </div>
                    <span className="text-slate-500 font-bold">VS</span>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${room?.player2Email ? "bg-green-400" : "bg-slate-500 animate-pulse"}`}></div>
                        <span className="text-slate-300 text-sm">
                            {room?.player2Email || "Waiting for opponent..."}
                        </span>
                    </div>
                </div>

                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    battleOver
                        ? "bg-red-400/10 text-red-400"
                        : room?.status === "WAITING"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-green-400/10 text-green-400"
                }`}>
                    {battleOver ? "FINISHED" : room?.status}
                </span>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left - Problem + Results */}
                <div className="w-1/2 overflow-y-auto p-6 border-r border-slate-700">
                    {problem && (
                        <>
                            <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-white text-xl font-bold">{problem.title}</h2>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                    problem.difficulty === "EASY"
                                        ? "text-green-400 bg-green-400/10"
                                        : problem.difficulty === "MEDIUM"
                                        ? "text-yellow-400 bg-yellow-400/10"
                                        : "text-red-400 bg-red-400/10"
                                }`}>
                                    {problem.difficulty}
                                </span>
                            </div>
                            <p className="text-slate-300 leading-relaxed">{problem.description}</p>
                            <div className="border-t border-slate-700 my-6"></div>
                        </>
                    )}

                    {/* Submissions */}
                    <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-3">
                        Submissions
                    </h3>
                    {results.length === 0 ? (
                        <p className="text-slate-500 text-sm">No submissions yet...</p>
                    ) : (
                        results.map((result, index) => (
                            <div key={index} className={`p-4 rounded-lg mb-3 text-sm border ${
                                result.success
                                    ? "bg-green-400/10 border-green-400/20 text-green-400"
                                    : "bg-red-400/10 border-red-400/20 text-red-400"
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-semibold">
                                        {result.success ? "✅ Accepted" : "❌ Failed"}
                                    </p>
                                    <p className="text-xs opacity-70">
                                        by {result.submitterEmail === user.email ? "You" : result.submitterEmail}
                                    </p>
                                </div>
                                <pre className="whitespace-pre-wrap text-xs font-mono">
                                    {result.success ? result.output : result.error}
                                </pre>
                            </div>
                        ))
                    )}
                </div>

                {/* Right - Code Editor */}
                <div className="w-1/2 flex flex-col">
                    <CodeEditor
                        onSubmit={(code, language) =>
                            sendSubmission(code, language, user.email)
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default BattlePage
