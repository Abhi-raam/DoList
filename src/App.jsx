import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import ProjectPage from './Pages/ProjectPage'
import AddProjects from './Pages/AddProjects'
import Loginpage from './Pages/Loginpage'
import SignupPage from './Pages/SignupPage'
import { AuthContextProvider } from './Context/AuthContext'
import ProjectDetails from './Pages/ProjectDetails'
import EditProject from './Pages/EditProject'
import ProtectedRoute from './ProtectRoute/ProtectRoute'
import Reayclebin from './Pages/Reayclebin'
import RecycleBinDetails from './Pages/RecycleBinDetails'

function App() {
  return (
    <div>
      <AuthContextProvider>
        {/* <ProtectedRoute> */}
        <Navbar />
        {/* </ProtectedRoute> */}
          
        <Routes>
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/projects' element={<ProjectPage />} />
          <Route path='/add-projects' element={<AddProjects />} />
          <Route path='/recyclebin' element={<Reayclebin/>} />
          <Route path='/recyclebin-details/:id' element={<RecycleBinDetails/>} />
          <Route path='/project-details/:id' element={<ProjectDetails />} />
          <Route path='/edit-project/:id' element={<EditProject />} />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App