import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { roosterApp } from './reducers';
import AppRouter from './AppRouter';
import './App.css';


const initialState = {
  auth: {
    token: null, // null indicates unauthenticated
    error: null,
    inProgress: false
  },
  balances: [
  ],
  goals: [
  ]
};

const store = createStore(
  roosterApp,
  initialState,
  applyMiddleware(thunk)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter { ...{ containerClass: 'App' } } />
      </Provider>
    );
  }
}

export default App;
