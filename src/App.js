import React, { Component, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './firebase/utils';

// layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';

// global styles
import './default.scss';

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  authListener = null;

  componentDidMount() {
    this.auth = auth.onAuthStateChanged(userAuth => {
      if (!userAuth) {
        this.setState({
          ...initialState
        });
      };

      this.setState({
        currentUser: userAuth
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )}/>
          <Route path="/signup" render={() => (
            <MainLayout currentUser={currentUser}>
              <Signup />
            </MainLayout>
          )}/>
          <Route path="/login" 
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
