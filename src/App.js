import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom'
import { auth } from './services/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])

  return (
    <Router>
    {
      user ? (<>
           <Routes>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Routes>
      </>) : (<>
        <Routes>
            <Route path='/' element={<Login />}></Route>
          </Routes>
      </>)
    }
    </Router>
  )
}

export default App