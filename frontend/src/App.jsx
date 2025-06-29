import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import AppContext from './context/AppContext'
import SignUp from './pages/SignUp'

const App = () => {
  const { loggedIn, authUser, nav, loading } = useContext(AppContext);

  if (loading) return null;

  return (
      <div className={`bg-black h-screen ${loggedIn && nav && 'px-12 py-8'}`}>
        <Toaster />

        {/* Navbar is visible only of the user is logged in */}
        {loggedIn && nav && <Navbar />}
        <Routes>

          {/* Home is only accessible when the user is logged in */}
          <Route 
            path='/' 
            element={
              loggedIn ? <>{authUser !== null ? <Home /> : <Navigate to={'/profile'} />}</> : <Navigate to={'/login'} />
            } 
          />

          {/* Profile Section is also only accessible when the user is logged in */}
          <Route path='/profile' element={
            loggedIn ? <Profile /> : <Navigate to={'/login'} />
          } />

          {/* Login Page will be rendered */}
          <Route path='/login' element={
            !loggedIn ? <Login /> : <Navigate to={'/'} />
          } />

          {/* Sign Up Page will be rendered if the user is not already registered */}
          <Route path='/sign-up' element={
            !loggedIn ? <SignUp /> : <Navigate to={'/'} />
          } />

          {/* Default routes to login to handle all the routes */}
          <Route path='*' element={
            <Navigate to={
              loggedIn ? '/' : '/login'
            } />
          } />
        </Routes>
      </div>
  )
}

export default App
