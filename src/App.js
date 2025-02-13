import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';

// layouts 
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';

// pages
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Signup from './pages/Signup';

// global styles
import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route path="/signup" render={() => (
          <MainLayout>
            <Signup />
          </MainLayout>
        )} />
        <Route path="/login" render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
          )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
          )} />
          <Route path="/admin" render={() => (
            <MainLayout>
              <Admin />
            </MainLayout>
          )} />
      </Switch>
    </div>
  );
}

export default App;
