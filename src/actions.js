import { withRouter } from "react-router-dom";

export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const LOGIN_STARTED = 'LOGIN_STARTED';
export const POST_AUTHENTICATE = 'POST_AUTHENTICATE';
export const POST_AUTHENTICATE_SUCCESS = 'POST_AUTHENTICATE_SUCCESS';
export const POST_AUTHENTICATE_FAILURE = 'POST_AUTHENTICATE_FAILURE';
export const EXPIRE_AUTH_TOKEN = 'EXPIRE_AUTH_TOKEN';

export const GET_BALANCE = 'GET_BALANCE';
export const GET_BALANCE_SUCCESS = 'GET_BALANCE_SUCCESS';
export const GET_BALANCE_FAILURE = 'GET_BALANCE_FAILURE';

function handleErrors(response) {
  console.log(response);
  if (!response.ok) {
    throw Error(`${response.status}: ${response.statusText}`);
  }
  return response;
}

/* Action creators */

export function submitLogin({ username, password }) {
  return (dispatch, getState) => {
    dispatch(loginStarted());
    dispatch(postAuthenticate({ accessKey: username, accessPassword: password }));
  };
};

export function loginStarted() {
  return {
    type: LOGIN_STARTED
  };
};

export function postAuthenticate({ accessKey, accessPassword }) {
  return (dispatch, getState) => {
    console.log(`token: ${getState().auth.token}`);
    fetch('https://api.roostermoney.com/v1/auth/', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessKey, accessPassword })
    })
    .then(handleErrors)
    .then(response => console.log(response) || response.json())
    .then(json => dispatch(postAuthenticateSuccess(json)))
    .catch(error => dispatch(postAuthenticateFailure(error.message)));
  };
};

export function postAuthenticateSuccess(response) {
  return {
    type: POST_AUTHENTICATE_SUCCESS,
    token: response.token
  };
};

export function postAuthenticateFailure(error) {
  return {
    type: POST_AUTHENTICATE_FAILURE,
    error
  };
};

export function expireAuthToken() {
  return {
    type: EXPIRE_AUTH_TOKEN
  };
};


