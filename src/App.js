import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//hoc
import WithAuth from './hoc/withAuth';

// layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';

// global styles
import './default.scss';

const App = props => {
  const { setCurrentUser, currentUser } = props;

  useEffect(() => {
    // akin inside in componentDidMount
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
          });
      }
      
      setCurrentUser(userAuth);
    });

    return () => {
      // unsubscribe to event listener, akin inside in componentWillUnmount
      authListener();
    }
  }, []);

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
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
