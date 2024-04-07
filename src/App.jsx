import React from 'react'
import LoginPage from './pages/Login'
import SignupPage from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

const App = () => {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>}/>
     </Routes>
    </>
  )
}

export default App
