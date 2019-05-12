import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combineReducer from './redux/reducers/combineReducer';

// components
import MainHeader from './components/header/main-header';
import BookcasePage from './components/bookcase-page';
import BookSearchPage from './components/book-search-page';
import DashboardHeader from './components/header/dashboard-header';
import DashboardPage from './components/dashboard';
import MainFooter from './components/footer/main-footer';
import LandingPage from './components/landing-page';
import PasswordReset from './components/password-reset/';

import TestPage from './components/test';

import PrivateRoute from './components/auth/PrivateRoute.js';

const store = createStore(combineReducer, applyMiddleware(thunk));

class App extends Component {

  render() {
    const App = () => (
      <Provider store={ store } >
        <div id="App">
            <Switch>
              <Route exact path='/' component={MainHeader}/>
              <Route path='/dashboard' component={DashboardHeader}/>
              <Route path='/bookcase' component={DashboardHeader}/>
              <Route path='/book-search' component={DashboardHeader}/>
            </Switch>
            <Switch>
              <Route exact path='/' component={LandingPage}/>
              <PrivateRoute exact path='/bookcase' component={BookcasePage} />
              <PrivateRoute exact path='/book-search' component={BookSearchPage} />
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
