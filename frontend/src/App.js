import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import Signup from './pages/Signup/signup';


import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

function App() {

  const [userData ,login, logout] = useAuth();

  let content;

  if(!userData.token) {
    content = (
      <Router>
          <Switch>
            <Route path='/login'>
                <Login />
            </Route>

            <Route path='/signup'>
                <Signup />
            </Route>

            <Redirect to='/login' />

          </Switch>
      </Router>
    );
  } else {
    content = (
      <Router>
        <Switch>
          <Route path='/' exact>
              <Home />
          </Route>

          <Redirect to='/' />

        </Switch>
      </Router>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userData.token,
        login,
        logout,
        userId: userData.userId,
        username: userData.username,
        token: userData.token
      }}
    >
      {content}
    </AuthContext.Provider>
  );
}

export default App;
