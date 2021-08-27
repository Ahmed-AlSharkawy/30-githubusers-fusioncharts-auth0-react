import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import AppWrapper from './AppWrapper'

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute exact path='/'>
            <Dashboard />
          </PrivateRoute>
          <Route exact path='/login'>
            <Login />
          </Route>
          <PrivateRoute exact path='/:login'>
            <AppWrapper />
          </PrivateRoute>
          <Route path='*'>
            <Error />
          </Route>
          <Route exact path='/'>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </AuthWrapper>
  )
}

export default App
