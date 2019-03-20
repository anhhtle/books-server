import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHeader from './components/header/main-header';
import MainFooter from './components/footer/main-footer';
import LandingPage from './components/landing-page';

import PasswordReset from './components/password-reset/';

class App extends Component {
  render() {
    const App = () => (
      <div>
          <Route path='/' component={MainHeader}/>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/password-reset/:key' component={PasswordReset}/>
          </Switch>
          <Route path='*' component={MainFooter}/>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
