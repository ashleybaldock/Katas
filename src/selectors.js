
export const getLoginState = (state, ownProps) => ({
  submitDisabled: state.auth.inProgress,
  error: state.auth.error
});

export const getAuthState = (state, ownProps) => ({
  authenticated: state.auth.token !== null
});

export const getGoalsForChildren = (state, ownProps) => ({
  goalsForChildren: state.balances.map(balance => ({
    username: balance.childUsername,
    goalsTotal: balance.goalBalance,
    total: balance.totalBalance,
    goals: state.goals.filter(goal => goal.childUsername === balance.childUsername).map(goal => ({
      description: goal.goalDescription,
      image: 'https://legacy.roostermoney.com/' + goal.goalImages,
      progress: goal.goalProgress,
      target: goal.goalTotal
    }))
  }))
});
