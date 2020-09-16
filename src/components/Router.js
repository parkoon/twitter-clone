import React, { useState } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Navigation from 'components/Navigation'
import Profile from 'routes/Profile'

function AppRouter({ isLoggedIn, user }) {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home user={user} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  )
}

export default AppRouter
