import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CenterDialog from './CenterDialog';
import ConnectedLogin from './ConnectedLogin';
import ConnectedLoginRedirector from './ConnectedLoginRedirector';
import ConnectedPrivateRoute from './ConnectedPrivateRoute';
import ConnectedGoals from './ConnectedGoals';

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
          <ConnectedPrivateRoute path="/" component={ConnectedGoals} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default AppRouter;

