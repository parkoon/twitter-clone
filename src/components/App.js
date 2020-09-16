import React, { useState, useEffect } from 'react'

import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
      setInit(true)
      setUser(user ? user : null)
    })
  }, [])
  return init && <AppRouter isLoggedIn={isLoggedIn} user={user} />
}

export default App
