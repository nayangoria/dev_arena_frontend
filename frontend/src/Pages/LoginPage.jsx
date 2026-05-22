import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import axios from "../api/axiosInstance";
import { useSearchParams } from "react-router-dom"
function LoginPage(){
    const [searchParams] = useSearchParams()
    const sessionExpired = searchParams.get("expired")
 
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {login}=useAuth();
    const [errormsg,seterrormsg]=useState("")
 
    const [loading,setloading]=useState(false)
    
    const handleLogin=async()=>{
        seterrormsg("")
        if(!email && !password){
            seterrormsg("Please enter email and password")
            return
        }
         if(!email){
            seterrormsg("Please enter email")
            return 
        }
        if(!password){
            seterrormsg("Please enter password")
            return
        }
         try{
                setloading(true)
                const response =await axios.post("/api/auth/login",{email,password});
                const data=response.data
                login({email:data.email,name:data.name},data.token)
                navigate("/problems")
                
            }catch(error){
                seterrormsg("Unable to Login  INVALID PASSWORD OR EMAIL" ,error)
                console.log(error)
            }
            finally{
                setloading(false);
            }      

    }


    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 w-full max-w-md p-8">
                {sessionExpired && (
                  <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm px-4 py-3 rounded-lg mb-6">
                  ⏰ Your session expired. Please login again.
           </div>
         )}

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-4xl">⚔️</span>
                    <h1 className="text-2xl font-bold text-slate-800 mt-3">
                        Welcome back to <span className="text-violet-600">DevArena</span>
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">Sign in to continue your journey</p>
                </div>

                {/* Error message */}
                {errormsg && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
                        {errormsg}
                    </div>
                )}

                {/* Email field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    />
                </div>

                {/* Password field */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    />
                </div>

                {/* Login button */}
                <button
                    onClick={()=>handleLogin()}
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                {/* Register link */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-violet-600 font-medium cursor-pointer hover:underline"
                    >
                        Register here
                    </span>
                </p>
            </div>
        </div>
    )
}
export default LoginPage;