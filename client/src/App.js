import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './pages/home/';
import PasswordReset from './pages/password-reset/';

class App extends Component {
  render() {
    const App = () => (
      <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/password-reset/:id' component={PasswordReset}/>
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
