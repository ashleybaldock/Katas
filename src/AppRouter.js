import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import CenterDialog from './CenterDialog';
import ConnectedLogin from './ConnectedLogin';
import ConnectedLoginRedirector from './ConnectedLoginRedirector';
import ConnectedPrivateRoute from './ConnectedPrivateRoute';
import Balances from './Balances';

const Login = () => (
  <CenterDialog>
    <ConnectedLoginRedirector>
      <ConnectedLogin />
    </ConnectedLoginRedirector>
  </CenterDialog>
);

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div className={this.props.containerClass}>
          <ConnectedPrivateRoute path="/" component={Balances} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;

