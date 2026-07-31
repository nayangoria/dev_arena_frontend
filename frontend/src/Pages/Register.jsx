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
  const [adminKey, setAdminKey] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegistration = async () => {
    setErrorMsg("");
    setSuccessMsg("");

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
      const response = await axios.post("/api/auth/register", {
        name,
        email,
        password,
        adminSecretKey: adminKey,
      });
      const data = response.data;

      if (data.token) {
        login({ name: data.name, email: data.email }, data.token);
        navigate("/admin/dashboard");
      } else {
        setSuccessMsg(
          data.message ||
            "✅ Registration successful! Please check your email to verify your account before logging in."
        );
      }
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
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-teal-50/40 to-emerald-50/30 
                    dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
                    flex items-center justify-center px-4 py-10
                    transition-colors duration-300">

      {/* soft background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-72 h-72 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-40 bg-teal-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md
                      bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
                      border border-teal-200/50 dark:border-teal-800/40
                      rounded-3xl shadow-xl shadow-teal-100/30 dark:shadow-teal-950/20
                      p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-7 sm:mb-8">
          <span className="text-4xl sm:text-5xl inline-block drop-shadow-sm
                           hover:scale-110 hover:rotate-12 transition-transform duration-300">
            ⚔️
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mt-3 tracking-tight">
            Join{" "}
            <span className="bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              DevArena
            </span>
          </h1>
          <p className="text-slate-400 dark:text-slate-500 mt-1.5 text-sm">
            Create your account and start battling
          </p>
        </div>

        {/* Success */}
        {successMsg && (
          <div className="bg-emerald-50/90 dark:bg-emerald-950/40 backdrop-blur-sm
                          border border-emerald-200 dark:border-emerald-800/50 
                          text-emerald-700 dark:text-emerald-300 text-sm 
                          px-4 py-3 rounded-2xl mb-6 font-medium text-center">
            {successMsg}
          </div>
        )}

        {/* Error */}
        {errorMsg && (
          <div className="bg-rose-50/90 dark:bg-rose-950/40 backdrop-blur-sm
                          border border-rose-200 dark:border-rose-800/50 
                          text-rose-600 dark:text-rose-400 text-sm 
                          px-4 py-3 rounded-2xl mb-6 font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-slate-200/80 dark:border-slate-700/60
                       rounded-xl px-4 py-3 
                       text-slate-800 dark:text-slate-100 
                       placeholder-slate-400 dark:placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-teal-500/40 
                       focus:border-teal-400 dark:focus:border-teal-600
                       transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-slate-200/80 dark:border-slate-700/60
                       rounded-xl px-4 py-3 
                       text-slate-800 dark:text-slate-100 
                       placeholder-slate-400 dark:placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-teal-500/40 
                       focus:border-teal-400 dark:focus:border-teal-600
                       transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRegistration()}
            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-slate-200/80 dark:border-slate-700/60
                       rounded-xl px-4 py-3 
                       text-slate-800 dark:text-slate-100 
                       placeholder-slate-400 dark:placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-teal-500/40 
                       focus:border-teal-400 dark:focus:border-teal-600
                       transition-all duration-200"
          />
        </div>

        {/* Admin key (optional) */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Admin Key{" "}
            <span className="text-slate-400 dark:text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={adminKey}
            placeholder="Admin key"
            onChange={(e) => setAdminKey(e.target.value)}
            className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm
                       border border-slate-200/80 dark:border-slate-700/60
                       rounded-xl px-4 py-3 
                       text-slate-800 dark:text-slate-100 
                       placeholder-slate-400 dark:placeholder-slate-500
                       focus:outline-none focus:ring-2 focus:ring-amber-500/40 
                       focus:border-amber-400 dark:focus:border-amber-600
                       transition-all duration-200"
          />
        </div>

        {/* Register button */}
        <button
          onClick={handleRegistration}
          disabled={loading}
          className="w-full py-3 sm:py-3.5 rounded-xl font-semibold text-white text-sm sm:text-base
                     bg-linear-to-r from-teal-500 via-emerald-500 to-cyan-500
                     hover:from-teal-600 hover:via-emerald-600 hover:to-cyan-600
                     disabled:from-teal-400 disabled:via-emerald-400 disabled:to-cyan-400 
                     disabled:cursor-not-allowed
                     shadow-md shadow-teal-200/50 dark:shadow-teal-900/40
                     hover:shadow-lg hover:shadow-teal-300/40
                     active:scale-[0.98] transition-all duration-200"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login link */}
        <p className="text-center text-slate-500 dark:text-slate-400 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-teal-600 dark:text-teal-400 font-semibold cursor-pointer 
                       hover:text-teal-700 dark:hover:text-teal-300 
                       hover:underline transition-colors"
          >
            Sign in here
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;