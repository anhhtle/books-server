import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducer from './redux/reducers/combineReducer';

// components
import MainHeader from './components/header/main-header';
import MainFooter from './components/footer/main-footer';
import LandingPage from './components/landing-page';
import DashboardPage from './components/dashboard';
import PasswordReset from './components/password-reset/';

import TestPage from './components/test';

import PrivateRoute from './components/auth/PrivateRoute.js';

const store = createStore(combineReducer, applyMiddleware(thunk));

class App extends Component {

  render() {
    const App = () => (
      <Provider store={ store } >
        <div>
            <Route path='/' component={MainHeader}/>
            <Switch>
              <Route exact path='/' component={LandingPage}/>
              <PrivateRoute exact path='/dashboard' component={DashboardPage} />
              <PrivateRoute exact path='/test' component={TestPage} />
              <Route exact path='/password-reset/:key' component={PasswordReset}/>
            </Switch>
            <Route path='*' component={MainFooter}/>
        </div>
      </Provider>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;
