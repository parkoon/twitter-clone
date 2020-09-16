import React, { useState, useEffect } from 'react'

import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user)
      setInit(true)
    })
  }, [])
  return init && <AppRouter isLoggedIn={isLoggedIn} />
}

export default App
