import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Afiliate from './pages/Afiliate'
import Creditos from './pages/Creditos'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/afiliate" element={<Afiliate />} />
      <Route path="/creditos" element={<Creditos />} />
    </Routes>
  )
}

export default App