
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import './App.css'
import ProblemPage from './Pages/ProblemPage'
import Navbar from './Component/Navbar'
import ProblemDetail from './Pages/ProblemDetail'
import LoginPage from './Pages/loginPage'
import { AuthProvider } from './Context/AuthContext'
import RegisterPage from './Pages/Register'
import { ProtectedRoute } from './Component/ProtectedRoute'
import BattlePage from './Pages/BattlePage'
import LobbyPage from './Pages/LobbyPage'
import { Leaderboard } from './Pages/LeaderBoard'
import LandingPage from './Pages/LandinPage'
import AdminLoginPage from './Pages/AdminLoginPage'
import AdminDashboard from './Pages/AdminDashbord'


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
