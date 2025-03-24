import HomePage from './pages/HomePage.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Login from './pages/Login.jsx'
import ManageProject from './pages/ManageProject.jsx'
import ManageSkill from './pages/ManageSkill.jsx'
import ManageTimeline from './pages/ManageTimeline.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import UpdateProject from './pages/UpdateProject.jsx'
import ViewProject from './pages/ViewProject.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from './store/slices/userSlice.js'
import { getAllMessages } from './store/slices/messageSlice.js'
import { getAllProjects } from './store/slices/projectSlice.js'
import { getAllSkill } from './store/slices/skillSlice.js'
import { getAllTimeline } from './store/slices/timelineSlice.js'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUser())
    dispatch(getAllMessages())
    dispatch(getAllProjects())
    dispatch(getAllSkill())
    dispatch(getAllTimeline())
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/password/forgot' element={<ForgotPassword />} />
          <Route path='/password/reset/:token' element={<ResetPassword />} />
          <Route path='/manage/skills' element={<ManageSkill />} />
          <Route path='/manage/timeline' element={<ManageTimeline />} />
          <Route path='/manage/projects' element={<ManageProject />} />
          <Route path='/view/project/:id' element={<ViewProject />} />
          <Route path='/update/project/:id' element={<UpdateProject />} />
        </Routes>
        <ToastContainer position='bottom-right' theme='dark' />
      </Router>
    </>
  )
}

export default App