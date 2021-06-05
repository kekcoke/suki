import React from 'react';
import { Switch, Route } from 'react-router-dom';

// layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';

// global styles
import './default.scss';

function App() {
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
        )} />
      </Switch>
    </div>
  );
}

export default App;
