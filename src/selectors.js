
export const getLoginState = (state, ownProps) => ({
  submitDisabled: state.auth.inProgress,
  error: state.auth.error
});

export const getAuthState = (state, ownProps) => ({
  authenticated: state.auth.token !== null
});

export const getBalances = (state, ownProps) => ({
  balances: [
    {
      "childUsername": "Freddie",
      "charityPotBalance": 0,
      "goalBalance": 0.05,
      "savingsBalance": 0.5,
      "totalBalance": 2,
      "walletBalance": 1.45
    }
  ]
});

export const getGoalsForChildren = (state, ownProps) => ({
  goalsForChildren: [
    {
      'username': "Arya844976",
      'goalsTotal': 12,
      'total': 50,
      'goals': [
        {
          'description': "A new sword",
          'image': "/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg",
          'progress': 0,
          'status': "Saving",
          'goalTotal': 20
        },
        {
          'description': "Another goal",
          'image': "/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg",
          'progress': 0.4,
          'status': "Saving",
          'goalTotal': 30
        }
      ]
    },
    {
      'username': "AnotherChild",
      'goalsTotal': 33,
      'total': 50,
      'goals': [
        {
          'description': "A new sword",
          'image': "/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg",
          'progress': 0.6,
          'status': "Saving",
          'goalTotal': 20
        },
        {
          'description': "Another goal",
          'image': "/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg",
          'progress': 0.9,
          'status': "Saving",
          'goalTotal': 30
        }
      ]
    }
  ]
});
