//get ready for trial and error and maybe some changes in the future... but for now this is the basic structure of the app.
import { useState } from 'react'
import {Routes, Route}  from 'react-router-dom'
//pages
import AccManagementPage from './pages/AccManagementPage'
import CustomerSegementPage from './pages/CustomerSegementPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
//components if maybe possible to touch it but if not necessary then remove it... in the future.
import AccManage from './components/AccManage'
import AdminDash from './components/AdminDash'
import CustomerUser from './components/CustomerUser'
import NavBar from './components/NavBar'
import './App.css'

function App(){


  return (
    <>
    <LoginPage/>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/SignUp" element={<SignUpPage/>}/>
    </Routes>


    </>
  )
}

export default App
