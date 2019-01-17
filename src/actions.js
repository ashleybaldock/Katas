import handleErrors from './handleErrors';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const POST_AUTHENTICATE_SUCCESS = 'POST_AUTHENTICATE_SUCCESS';
export const POST_AUTHENTICATE_FAILURE = 'POST_AUTHENTICATE_FAILURE';

export function submitLogin({ username, password }) {
  return (dispatch, getState) => {
    dispatch(loginStarted());
    dispatch(postAuthenticate({ accessKey: username, accessPassword: password }));
  };
}

export function loginStarted() {
  return {
    type: LOGIN_STARTED
  };
}

export function postAuthenticate({ accessKey, accessPassword }) {
  return (dispatch, getState) => {
    fetch('https://api.roostermoney.com/v1/auth/', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessKey, accessPassword })
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => dispatch(postAuthenticateSuccess(json)))
    .catch(error => dispatch(postAuthenticateFailure(error.message)));
  };
}

export function postAuthenticateSuccess(response) {
  return {
    type: POST_AUTHENTICATE_SUCCESS,
    token: response.token
  };
}

export function postAuthenticateFailure(error) {
  return {
    type: POST_AUTHENTICATE_FAILURE,
    error
  };
}

export const UPDATE_BALANCES_SUCCESS = 'UPDATE_BALANCES_SUCCESS';
export const UPDATE_BALANCES_FAILURE = 'UPDATE_BALANCES_FAILURE';

export function updateBalances() {
  return (dispatch, getState) => {
    fetch('https://api.roostermoney.com/v1/balance/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getState().auth.token
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => dispatch(updateBalancesSuccess(json)))
    .catch(error => dispatch(updateBalancesFailure(error.message)));
  };
}

export function updateBalancesSuccess(response) {
  return {
    type: UPDATE_BALANCES_SUCCESS,
    response
  };
}

export function updateBalancesFailure(error) {
  return {
    type: UPDATE_BALANCES_FAILURE,
    error
  };
}

export const UPDATE_GOALS_SUCCESS = 'UPDATE_GOALS_SUCCESS';
export const UPDATE_GOALS_FAILURE = 'UPDATE_GOALS_FAILURE';

export function updateGoals() {
  return (dispatch, getState) => {
    fetch('https://api.roostermoney.com/v1/goals/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': getState().auth.token
      }
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(json => dispatch(updateGoalsSuccess(json)))
    .catch(error => dispatch(updateGoalsFailure(error.message)));
  };
}

export function updateGoalsSuccess(response) {
  return {
    type: UPDATE_GOALS_SUCCESS,
    response
  };
}

export function updateGoalsFailure(error) {
  return {
    type: UPDATE_GOALS_FAILURE,
    error
  };
}
