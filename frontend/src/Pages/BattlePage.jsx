import { useEffect, useState } from "react";
// import { useAuth } from "../Context/AuthContext";
import { useParams } from "react-router-dom";
import { useBattleSocket } from "../hook/useBattelHook";
import { CodeEditor } from "./CodeEditor"
import axios from "../api/axiosInstance";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function BattlePage(){
    const {user,token}=useAuth()
    const [loading,setLoading]=useState(true);
    const {roomCode}=useParams()
    const navigate=useNavigate()
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
        <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-5">
                <div className="w-14 h-14 border-[5px] border-violet-500 border-t-transparent rounded-full animate-spin shadow-lg shadow-violet-200"></div>
                <p className="text-slate-500 font-medium tracking-wide">Loading battle room...</p>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-violet-50/40 to-indigo-50 flex flex-col">

            {/* Opponent submission popup notification */}
            {notification && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-7 py-4 rounded-2xl shadow-2xl border-2 backdrop-blur-sm animate-bounce ${
                    notification.success
                        ? "bg-red-50/95 border-red-300 text-red-700"
                        : "bg-amber-50/95 border-amber-300 text-amber-700"
                }`}>
                    <p className="font-bold text-center text-sm">
                        {notification.success
                            ? `⚠️ ${notification.submitter} just submitted successfully!`
                            : `💨 ${notification.submitter} submitted but failed`
                        }
                    </p>
                </div>
            )}

            {/* Winner banner */}
            {battleOver && (
                <div className={`w-full py-5 text-center border-b-2 shadow-sm ${
                    iWon
                        ? "bg-linear-to-r from-emerald-400 to-green-500 text-white border-emerald-300"
                        : "bg-linear-to-r from-rose-400 to-red-500 text-white border-rose-300"
                }`}>
                    <p className="font-bold text-xl tracking-wide">
                        {iWon
                            ? "🏆 You Won! Congratulations!"
                            : `😔 You Lost! ${winnerEmail} solved it first!`
                        }
                    </p>
                    {eloChange && (
                        <p className="text-sm mt-1.5 opacity-90 font-medium">
                            {iWon
                                ? `ELO: +${eloChange.winnerChange} points`
                                : `ELO: ${eloChange.loserChange} points`
                            }
                        </p>
                    )}
                </div>
            )}
            
            {/* Battle header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <span className="text-slate-800 font-bold text-lg tracking-tight">⚔️ Battle Room</span>
                    
                    <span className="bg-violet-100 text-violet-700 text-sm px-3.5 py-1.5 rounded-full font-mono font-semibold border border-violet-200">
                        {roomCode}
                    </span>

                    {/* Properly aligned Verdict button */}
                    <button 
                        onClick={() => navigate(`/battle/verdict/${roomCode}`)}
                        className="ml-1 inline-flex items-center gap-1.5 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md shadow-violet-200 transition-all duration-200 hover:shadow-lg hover:scale-[1.03] active:scale-95"
                    >
                        📊 Verdict
                    </button>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-300"></div>
                        <span className="text-slate-700 text-sm font-medium">{room?.player1Email}</span>
                    </div>
                    
                    <span className="text-slate-400 font-bold text-sm tracking-wider">VS</span>
                    
                    <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                        <div className={`w-2.5 h-2.5 rounded-full ${room?.player2Email ? "bg-emerald-400 shadow-sm shadow-emerald-300" : "bg-slate-300 animate-pulse"}`}></div>
                        <span className="text-slate-700 text-sm font-medium">
                            {room?.player2Email || "Waiting for opponent..."}
                        </span>
                    </div>
                </div>

                <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full tracking-wide uppercase ${
                    battleOver
                        ? "bg-rose-100 text-rose-600 border border-rose-200"
                        : room?.status === "WAITING"
                        ? "bg-amber-100 text-amber-600 border border-amber-200"
                        : "bg-emerald-100 text-emerald-600 border border-emerald-200"
                }`}>
                    {battleOver ? "FINISHED" : room?.status}
                </span>
            </div>

            {/* Main content */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left - Problem + Results */}
                <div className="w-1/2 overflow-y-auto p-7 border-r border-slate-200/80 bg-white/40">
                    {problem && (
                        <>
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-slate-800 text-2xl font-bold tracking-tight">{problem.title}</h2>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full tracking-wide ${
                                    problem.difficulty === "EASY"
                                        ? "text-emerald-700 bg-emerald-100 border border-emerald-200"
                                        : problem.difficulty === "MEDIUM"
                                        ? "text-amber-700 bg-amber-100 border border-amber-200"
                                        : "text-rose-700 bg-rose-100 border border-rose-200"
                                }`}>
                                    {problem.difficulty}
                                </span>
                            </div>
                            <p className="text-slate-600 leading-relaxed text-[15px]">{problem.description}</p>
                            <div className="border-t border-slate-200 my-7"></div>
                        </>
                    )}

                    {/* Submissions */}
                    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
                        Submissions
                    </h3>
                    {results.length === 0 ? (
                        <p className="text-slate-400 text-sm italic">No submissions yet...</p>
                    ) : (
                        results.map((result, index) => (
                            <div key={index} className={`p-4 rounded-2xl mb-3 text-sm border shadow-sm ${
                                result.success
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                                    : "bg-rose-50 border-rose-200 text-rose-800"
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-bold">
                                        {result.success ? "✅ Accepted" : "❌ Failed"}
                                    </p>
                                    <p className="text-xs opacity-70 font-medium">
                                        by {result.submitterEmail === user.email ? "You" : result.submitterEmail}
                                    </p>
                                </div>
                                <pre className="whitespace-pre-wrap text-xs font-mono bg-white/60 rounded-xl p-3 border border-black/5">
                                    {result.success ? result.output : result.error}
                                </pre>
                            </div>
                        ))
                    )}
                </div>

                {/* Right - Code Editor */}
                <div className="w-1/2 flex flex-col bg-white/60">
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

export default BattlePage;