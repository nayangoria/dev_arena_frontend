import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProblemPage from './Pages/ProblemPage'
import Navbar from './Component/Navbar'
import ProblemDetail from './Pages/ProblemDetail'
import LoginPage from './Pages/LoginPage'
import { AuthProvider } from './Context/AuthContext'
import RegisterPage from './Pages/Register'
import { ProtectedRoute } from './Component/ProtectedRoute'
import BattlePage from './Pages/BattlePage'
import LobbyPage from './Pages/LobbyPage'
import { LeaderBoard } from './Pages/LeaderBoard'
import LandingPage from './Pages/LandinPage'
import AdminLoginPage from './Pages/AdminLoginPage'
import AdminDashboard from './Pages/AdminDashbord'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />

            <Route path="/problems" element={
              <ProtectedRoute><ProblemPage /></ProtectedRoute>
            } />
            <Route path="/problems/:id" element={
              <ProtectedRoute><ProblemDetail /></ProtectedRoute>
            } />
            <Route path="/lobby" element={
              <ProtectedRoute><LobbyPage /></ProtectedRoute>
            } />
            <Route path="/leaderboard" element={
              <ProtectedRoute><LeaderBoard /></ProtectedRoute>
            } />
            <Route path="/battle/:roomCode" element={
              <ProtectedRoute><BattlePage /></ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App