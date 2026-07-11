import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "../api/axiosInstance"

function VerifyPage() {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = useState("verifying")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const token = searchParams.get("token")

    useEffect(() => {
        async function verify() {
            // Handle no token case inside async function
            if (!token) {
                setStatus("error")
                setMessage("No verification token found")
                return
            }

            try {
                const response = await axios.get(`/api/auth/verify?token=${token}`)
                setStatus("success")
                setMessage(response.data.message)
            } catch (err) {
                setStatus("error")
                setMessage(err.response?.data?.error || "Verification failed")
            }
        }
        verify()
    }, [token])

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full max-w-md p-8 text-center">

                {status === "verifying" && (
                    <>
                        <div className="w-12 h-12 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-slate-600">Verifying your email...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <span className="text-5xl mb-4 block">✅</span>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">
                            Email Verified!
                        </h1>
                        <p className="text-slate-500 mb-6">{message}</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            Go to Login
                        </button>
                    </>
                )}

                {status === "error" && (
                    <>
                        <span className="text-5xl mb-4 block">❌</span>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">
                            Verification Failed
                        </h1>
                        <p className="text-red-500 mb-6">{message}</p>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                        >
                            Register Again
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default VerifyPage