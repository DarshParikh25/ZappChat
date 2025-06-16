import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import AppContextProvider from './context/AppContext'

const App = () => {
  return (
    <AppContextProvider>
      <div className='bg-[#000] h-screen px-12 py-8'>
        <Navbar />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/profile' element={ <Profile /> } />
        </Routes>
      </div>
    </AppContextProvider>
  )
}

export default App
