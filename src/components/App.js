import React, { useState, useEffect } from 'react'

import AppRouter from 'components/Router'
import { authService } from 'fbase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      setUser(
        user
          ? {
              displayName: user.displayName,
              uid: user.uid,
              updateProfile: (args) => user.updateProfile(args),
            }
          : null
      )
      setIsLoggedIn(!!user)
      setInit(true)
    })
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser
    setUser({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    })
  }
  return init && <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} user={user} />
}

export default App
