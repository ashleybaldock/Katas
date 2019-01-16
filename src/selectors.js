
export const getLoginState = (state, ownProps) => ({
  submitDisabled: state.auth.inProgress,
  error: state.auth.error
});

export const getAuthState = (state, ownProps) => ({
  authenticated: state.auth.token !== null
});
