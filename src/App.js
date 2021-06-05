import React from 'react';
import { Switch, Route } from 'react-router-dom';

// layouts 
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import './default.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => (
          <MainLayout>
            <Homepage />
          </MainLayout>
        )}/>
        <Route path="/registration" component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
