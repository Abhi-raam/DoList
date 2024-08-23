import React from 'react'
import HomePage from './Pages/HomePage'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
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
import Footer from './Components/Footer'
import { Toaster } from 'react-hot-toast'

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <div>
      <AuthContextProvider>
        {/* <ProtectedRoute> */}
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        
        <Toaster position="top-center" reverseOrder={false} />
        {/* </ProtectedRoute> */}
          
        <Routes>
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<SignupPage />} />

          <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path='/projects' element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
          <Route path='/add-projects' element={<ProtectedRoute><AddProjects /></ProtectedRoute>} />
          <Route path='/recyclebin' element={<ProtectedRoute><Reayclebin/></ProtectedRoute>} />
          <Route path='/recyclebin-details/:id' element={<ProtectedRoute><RecycleBinDetails/></ProtectedRoute>} />
          <Route path='/project-details/:id' element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
          <Route path='/edit-project/:id' element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
        </Routes>
        {!hideNavbarRoutes.includes(location.pathname) && <Footer />}
      </AuthContextProvider>
    </div>
  )
}

export default App