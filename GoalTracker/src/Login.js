import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  login = (e) => {
    this.props.handleSubmit({
      username: this.state.username,
      password: this.state.password
    });
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="Login">
        <ul>
          <li className="Login__Error">{this.props.error}</li>
          <li>
            <label htmlFor="Login__Username" className="Login__Username_Label">Username</label>
            <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} id="Login__Username" className="Login__Username" />
          </li>

          <li>
            <label htmlFor="Login__Password" className="Login__Password_Label">Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} id="Login__Password" className="Login__Password" />
          </li>

          <li>
            <button type="submit" disabled={this.props.submitDisabled} onClick={this.login}>Login</button>
          </li>
          <li style={{ fontSize: 'smaller' }}>
            This demo has been modified to not call out<br/> to the API, anything will work for the login.
          </li>
        </ul>
      </div>
    );
  }
}

export default Login;
