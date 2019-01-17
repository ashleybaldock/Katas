import { LOGIN_STARTED, POST_AUTHENTICATE_SUCCESS, POST_AUTHENTICATE_FAILURE, UPDATE_BALANCES_SUCCESS, UPDATE_BALANCES_FAILURE, UPDATE_GOALS_SUCCESS, UPDATE_GOALS_FAILURE } from './actions';


export function roosterApp(state, action) {
  if (!action) { return state; }
  switch (action.type) {
    case LOGIN_STARTED:
      return Object.assign({}, state, {
        auth: Object.assign({}, state.auth, {
          error: null,
          inProgress: true
        })
      });
    case POST_AUTHENTICATE_SUCCESS:
      return Object.assign({}, state, {
        auth: Object.assign({}, state.auth, {
          error: null,
          inProgress: false,
          token: action.token
        })
      });
    case POST_AUTHENTICATE_FAILURE:
      return Object.assign({}, state, {
        auth: Object.assign({}, state.auth, {
          error: action.error,
          inProgress: false
        })
      });
    case UPDATE_BALANCES_SUCCESS:
      console.log(action.response);
      return state;
    case UPDATE_BALANCES_FAILURE:
      if (action.error === '401: Unauthorized') {
        return Object.assign({}, state, {
          auth: Object.assign({}, state.auth, {
            error: 'Please login again',
            token: null
          })
        });
      }
      return state;
    case UPDATE_GOALS_SUCCESS:
      console.log(action.response);
      return state;
    case UPDATE_GOALS_FAILURE:
      if (action.error === '401: Unauthorized') {
        return Object.assign({}, state, {
          auth: Object.assign({}, state.auth, {
            error: 'Please login again',
            token: null
          })
        });
      }
      return state;
    default:
      return state;
  }
}

