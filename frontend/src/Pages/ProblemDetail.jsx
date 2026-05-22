import { useState,useEffect } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import axios from "../api/axiosInstance";
import { CodeEditor } from "./codeEditor";
// import { useAuth } from "../Context/AuthContext";
function ProblemDetail(){
    const [loading,setloading]=useState(true);
    const [error,seterror]=useState("");
    const [problem,setproblem]=useState([]);
    const {id}=useParams()
    const navigate=useNavigate()
    // const {token}=useAuth
    const location=useLocation();
    const handleBack = () => {
    const from = location.state?.from || "/problems"
    navigate(from)
}

    useEffect(()=>{
        async function getProblem(){
            try{
            const response =await axios.get(`/api/problems/${id}`)
            const data=response.data
            setproblem(data)
            
            }catch(error){
                console.log("error getting data",error)
                seterror(error)
            }finally{
                setloading(false)

            }

        }
        getProblem();

    },[id])
        function getDifficultyStyle(difficulty) {
        if (difficulty === "EASY") return "text-green-600 bg-green-50 border border-green-200";
        if (difficulty === "MEDIUM") return "text-yellow-600 bg-yellow-50 border border-yellow-200";
        if (difficulty === "HARD") return "text-red-600 bg-red-50 border border-red-200";
    }
 

    if(loading) return(
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium">Loading problem...</p>
            </div>
        </div>
    )
    if(error){ return(
       <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <p className="text-red-500 font-semibold text-lg">{error}</p>
                <button
                    onClick={() => navigate("/problems")}
                    className="mt-4 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
    }

    return(        
    <div className="min-h-screen bg-slate-50">
    {/* Header */}
   
    <div className="bg-linear-to-r from-violet-600 to-indigo-600 px-4 py-4">
        <div className="max-w-7xl mx-auto">
            
            <button
                onClick={handleBack}
                className="text-violet-200 hover:text-white flex items-center gap-2 mb-2 transition-colors"
            >
                ← Back to Problems
            </button>

            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold text-white">
                    {problem.title}
                </h1>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyStyle(problem.difficulty)}`}>
                    {problem.difficulty}
                </span>
            </div>
        </div>
    </div>
   
    {/* Content */}
    <div className="max-w-8xl mx-auto px-6 py-8 flex gap-4">
        <div className="w-1/2 mt-4">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Problem Description
            </h2>
            <p className="text-slate-600 leading-relaxed">
                {problem.description}
            </p>
        </div>
        </div>
       <div className="w-1/2">
        
          {/* Code Editor */}
      <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <CodeEditor />
        </div>
        </div>
     </div>
    </div>
  

    )
}
export default ProblemDetail;