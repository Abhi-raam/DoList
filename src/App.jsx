import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ProjectPage from './Pages/ProjectPage'
import AddProjects from './Pages/AddProjects'
import Loginpage from './Pages/Loginpage'
import SignupPage from './Pages/SignupPage'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/projects' element={<ProjectPage />} />
        <Route path='/add-projects' element={<AddProjects />} />
      </Routes>
    </div>
  )
}

export default App