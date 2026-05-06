import { Routes, Route, useLocation } from 'react-router-dom'
import AccManagementPage from './pages/AccManagementPage'
import CustomerSegementPage from './pages/CustomerSegementPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  const location = useLocation()
  const showNavBar = location.pathname !== '/' && location.pathname !== '/SignUp'

  return (
    <>
      {showNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/DashboardPage" element={<DashboardPage />} />
        <Route path="/CustomerSegementPage" element={<CustomerSegementPage />} />
        <Route path="/AccManagementPage" element={<AccManagementPage />} />
      </Routes>
    </>
  )
}

export default App
