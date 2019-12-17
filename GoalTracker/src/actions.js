import handleErrors from './util/handleErrors';

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

const demoToken = { response: { token: 'fakeToken' } };

export function postAuthenticate({ accessKey, accessPassword }) {
  return (dispatch) =>
    Promise.resolve()
      .then(() => dispatch(postAuthenticateSuccess(demoToken)));
}

/*
 * This originally called out to an API using this code
 * But I've changed it so it's usable without real API credentials
 */
export function postAuthenticate_real({ accessKey, accessPassword }) {
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

const demoBalances = [{"childUsername":"Arya844976","totalBalance":189.3,"savingsBalance":0,"charityPotBalance":2.8,"goalBalance":48.53,"walletBalance":137.97},{"childUsername":"Sansa637680","totalBalance":19504,"savingsBalance":50,"charityPotBalance":0,"goalBalance":64,"walletBalance":19390},{"childUsername":"Kitt361011","totalBalance":0,"savingsBalance":0,"charityPotBalance":0,"goalBalance":0,"walletBalance":0}];

export function updateBalances() {
  return (dispatch) =>
    Promise.resolve()
      .then(() => dispatch(updateBalancesSuccess(demoBalances)));
}

/*
 * This originally called out to an API using this code
 * But I've changed it so it's usable without real API credentials
 */
export function updateBalances_real() {
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

const demoGoals = [{"goalProgress":5.89,"goalTotal":20,"goalStatus":"Saving","goalCreated":"2019-01-12T12:28:50.950Z","goalImages":"/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg","goalDescription":"A new sword","childUsername":"Arya844976"},{"goalProgress":42.64,"goalTotal":200,"goalStatus":"Saving","goalCreated":"2019-01-17T18:06:18.570Z","goalImages":"/images/googleimages/526255-7005cd55-0949-4779-923a-826ac1f26c6e.jpg","goalDescription":"Another new bike","childUsername":"Arya844976"},{"goalProgress":64,"goalTotal":100,"goalStatus":"Saving","goalCreated":"2019-01-17T11:49:55.230Z","goalImages":"/images/googleimages/526255-18ebf167-14bf-4f84-a67c-510bf58ef9a3.jpg","goalDescription":"New bike","childUsername":"Sansa637680"}];

export function updateGoals() {
  return (dispatch) =>
    Promise.resolve()
      .then(() => dispatch(updateGoalsSuccess(demoGoals)));
}

/*
 * This originally called out to an API using this code
 * But I've changed it so it's usable without real API credentials
 */
export function updateGoals_real() {
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
