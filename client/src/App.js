import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from './pages/home/';

import PasswordReset from './pages/password-reset/';

class App extends Component {
  render() {
    const App = () => (
      <div>
          <Switch>
            <Route exact path='/' component={Index}/>
            <Route path='/password-reset/:key' component={PasswordReset}/>
          </Switch>
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
