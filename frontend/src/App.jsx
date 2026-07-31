import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
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
import VerifyPage from './Pages/VerifyPage'
import VerdictDashboard from './Pages/VerdictDashBoard'
import ProfilePage from './Pages/ProfilePage'
import { ThemeProvider } from './Context/ThemeContext'

function MainLayout(){
  return(
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50">
        
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            

            <Route element={<MainLayout/>}>
            <Route path="/verdict/:roomCode" 
            element={<ProtectedRoute><VerdictDashboard/></ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>

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
            </Route>
          </Routes>
        </div>
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App