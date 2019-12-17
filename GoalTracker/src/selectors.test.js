import { getLoginState, getAuthState, getGoalsForChildren } from './selectors';

describe('getLoginState', () => {
  it('submitDisabled set to state.auth.inProgress', () => {
    expect(getLoginState({
      auth: { inProgress: false }
    }).submitDisabled).toEqual(false);

    expect(getLoginState({
      auth: { inProgress: true }
    }).submitDisabled).toEqual(true);
  });
});

describe('getAuthState', () => {
  it('authenticated set based on auth token value', () => {
    expect(getAuthState({
      auth: { token: null }
    }).authenticated).toEqual(false);

    expect(getAuthState({
      auth: { token: 'something' }
    }).authenticated).toEqual(true);
  });
});

describe('getGoalsForChildren', () => {
  const testBalances = [
    {
      "childUsername": "Arya844976",
      "totalBalance": 19.3,
      "savingsBalance": 0,
      "charityPotBalance": 0,
      "goalBalance": 0,
      "walletBalance": 19.3
    },
    {
      "childUsername": "Sansa637680",
      "totalBalance": 304,
      "savingsBalance": 0,
      "charityPotBalance": 0,
      "goalBalance": 0,
      "walletBalance": 304
    }
  ];

  const testGoals = [
    {
      "goalProgress": 0,
      "goalTotal": 20,
      "goalStatus": "Saving",
      "goalCreated": "2019-01-12T12:28:50.950Z",
      "goalImages": "/images/googleimages/526255-76dcd13e-86fc-4e23-9d4c-975429f50ed9.jpg",
      "goalDescription": "A new sword",
      "childUsername": "Arya844976"
    },
    {
      "goalProgress": 0,
      "goalTotal": 40,
      "goalStatus": "Saving",
      "goalCreated": "2019-01-17T11:49:11.543Z",
      "goalImages": "/images/googleimages/526255-6135b933-3e54-4824-b43e-18a4ba297140.jpg",
      "goalDescription": "Another goal",
      "childUsername": "Arya844976"
    },
    {
      "goalProgress": 0,
      "goalTotal": 100,
      "goalStatus": "Saving",
      "goalCreated": "2019-01-17T11:49:55.230Z",
      "goalImages": "/images/googleimages/526255-18ebf167-14bf-4f84-a67c-510bf58ef9a3.jpg",
      "goalDescription": "New bike",
      "childUsername": "Sansa637680"
    }
  ];

  it('returns empty array when state.balances empty', () => {
    const testState = {
      balances: [],
      goals: []
    };
    expect(getGoalsForChildren(testState)).toEqual({
      goalsForChildren: []
    });
  });

  it('sets goalsForChildren correctly from state.balances', () => {
    const testState = {
      balances: testBalances,
      goals: []
    };
    expect(getGoalsForChildren(testState)).toEqual({
      goalsForChildren: [
        {
          username: testState.balances[0].childUsername,
          goalsTotal: testState.balances[0].goalBalance,
          total: testState.balances[0].totalBalance,
          goals: []
        },
        {
          username: testState.balances[1].childUsername,
          goalsTotal: testState.balances[1].goalBalance,
          total: testState.balances[1].totalBalance,
          goals: []
        }
      ]
    });
  });

  it('sets goalsForChildren.goals correctly from matching username', () => {
    const testState = {
      balances: testBalances,
      goals: testGoals
    };
    expect(getGoalsForChildren(testState).goalsForChildren[0].goals).toEqual([
      {
        description: testGoals[0].goalDescription,
        image: 'https://legacy.roostermoney.com/' + testGoals[0].goalImages,
        progress: testGoals[0].goalProgress,
        target: testGoals[0].goalTotal
      },
      {
        description: testGoals[1].goalDescription,
        image: 'https://legacy.roostermoney.com/' + testGoals[1].goalImages,
        progress: testGoals[1].goalProgress,
        target: testGoals[1].goalTotal
      }
    ]);
    expect(getGoalsForChildren(testState).goalsForChildren[1].goals).toEqual([
      {
        description: testGoals[2].goalDescription,
        image: 'https://legacy.roostermoney.com/' + testGoals[2].goalImages,
        progress: testGoals[2].goalProgress,
        target: testGoals[2].goalTotal
      }
    ]);
  });
});
