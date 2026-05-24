
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import ProblemPage from './pages/ProblemPage'
import Navbar from './Component/Navbar'
import ProblemDetail from './pages/ProblemDetail'
import LoginPage from './pages/loginPage'
import { AuthProvider } from './Context/AuthContext'
import RegisterPage from './pages/Register'
import { ProtectedRoute } from './Component/ProtectedRoute'
import BattlePage from './pages/BattlePage'
import LobbyPage from './pages/LobbyPage'
import { Leaderboard } from './pages/LeaderBoard'
import LandingPage from './pages/LandinPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashbord'


function App() {


  return (
  <BrowserRouter>
  <AuthProvider>
  <div className="min-h-screen bg-slate-50">
 
    
 
  <Navbar/>
  <Routes>
    
    <Route path="/" element={<LandingPage/>}></Route>
    <Route path="/battle/:roomCode" element={ <ProtectedRoute><BattlePage /></ProtectedRoute>} />
    import AdminLoginPage from './pages/AdminLoginPage'
import AdminDashboard from './pages/AdminDashboard'

<Route path="/admin/login" element={<AdminLoginPage />} />
<Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    <Route path="/problems" element={<ProtectedRoute><ProblemPage/></ProtectedRoute>}></Route>
    <Route path="/problems/:id" element={<ProtectedRoute><ProblemDetail/></ProtectedRoute>}></Route>
    <Route path="/lobby" element={<ProtectedRoute> <LobbyPage /></ProtectedRoute>} />
    <Route path="/leaderboard" element={<ProtectedRoute> <Leaderboard /></ProtectedRoute>} />
    <Route path="/login" element={<LoginPage/>}></Route>
    <Route path="/register" element={<RegisterPage/>}></Route>

  </Routes>
  </div>
  </AuthProvider>
  </BrowserRouter>
     

  )
}

export default App
