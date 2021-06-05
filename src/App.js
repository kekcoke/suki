import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
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
      if (!userAuth) return;

      this.setState({
        currentUser: userAuth
      });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}/>
          <Route path="/signup" render={() => (
            <MainLayout>
              <Signup />
            </MainLayout>
          )}/>
          <Route path="/login" render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}/>
        </Switch>
      </div>
    );
  }
}

export default App;
