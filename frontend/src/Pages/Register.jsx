import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosInstance";

function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { login } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [adminKey, setAdminKey] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const handleRegistration = async () => {
        setErrorMsg("");

        if (!name && !email && !password) {
            setErrorMsg("All fields are empty");
            return;
        }
        if (!name) {
            setErrorMsg("Please enter your name");
            return;
        }
        if (!email) {
            setErrorMsg("Please enter your email");
            return;
        }
        if (!password) {
            setErrorMsg("Please enter your password");
            return;
        }

        try {
            setLoading(true);
            // const response = await axios.post(
            //     "/api/auth/register",
            //     { name, email, password }
            // );

            // to craete admin

            const response = await axios.post("/api/auth/register", {
                   name, email, password, adminSecretKey: adminKey
                  })
            const data = response.data;
            login({ name: data.name, email: data.email }, data.token);
            setSuccessMsg("✅ Registration successful! Please check your email to verify your account before logging in.")
        } catch (err) {
            if (err.response?.status === 400) {
                setErrorMsg("Email already in use");
            } else {
                setErrorMsg("Something went wrong. Try again.");
            }
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 w-full max-w-md p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-4xl">⚔️</span>
                    <h1 className="text-2xl font-bold text-slate-800 mt-3">
                        Join <span className="text-violet-600">DevArena</span>
                    </h1>
                    <p className="text-slate-400 mt-1 text-sm">Create your account and start battling</p>
                </div>
                {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 rounded-lg mb-6">
                    {successMsg}
                    </div>
                  )}
                {/* Error message */}
                {errorMsg && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
                        {errorMsg}
                    </div>
                )}

                {/* Name field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    />
                </div>

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
                        onKeyDown={(e) => e.key === "Enter" && handleRegistration()}
                        className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
                    />
                </div>
                {/* admin test purpose */}
                <input
                    type="text"
                   value={adminKey}
                   placeholder="Admin key (optional)"
                   onChange={(e) => setAdminKey(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
                   />

                {/* Register button */}
                <button
                    onClick={handleRegistration}
                    disabled={loading}
                    className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                >
                    {loading ? "Creating account..." : "Create Account"}
                </button>

                {/* Login link */}
                <p className="text-center text-slate-500 text-sm mt-6">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-violet-600 font-medium cursor-pointer hover:underline"
                    >
                        Sign in here
                    </span>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage;