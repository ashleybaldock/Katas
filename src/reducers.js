import { LOGIN_STARTED, POST_AUTHENTICATE_SUCCESS, POST_AUTHENTICATE_FAILURE } from './actions';


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
    default:
      return state;
  }
}

