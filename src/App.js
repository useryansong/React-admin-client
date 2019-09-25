import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import WrapLogin from './pages/login/login'
import Admin from './pages/admin/admin'

/**
 * app component
 */
class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={WrapLogin}></Route>
          <Route path="/" component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}
export default App;
