import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class LoginRedirector extends Component {
  render() {
    if (this.props.authenticated) {
      return <Redirect to={{ pathname: '/', state: {from: this.props.location } }}/>
    }
    return this.props.children;
  }
}

export default LoginRedirector;

