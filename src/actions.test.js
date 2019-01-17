import mockStore from './util/test.mockStore';
import getAction from './util/test.getAction';
import { submitLogin, LOGIN_STARTED, POST_AUTHENTICATE_SUCCESS, POST_AUTHENTICATE_FAILURE } from './actions';

describe('actions', () => {
  it('submitLogin dispatches correct actions on successful response', async () => {
    const mockResponse = { token: 'testToken' };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      ok: true,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const store = mockStore();
    store.dispatch(submitLogin({ username: 'username', password: 'password' }));

    expect(await getAction(store, LOGIN_STARTED)).toEqual({ type: LOGIN_STARTED });
    expect(await getAction(store, POST_AUTHENTICATE_SUCCESS)).toEqual({type: POST_AUTHENTICATE_SUCCESS, token: 'testToken'});
  });

  it('submitLogin dispatches correct actions on failure response', async () => {
    const mockResponse = {};
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      ok: false,
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const store = mockStore();
    store.dispatch(submitLogin({ username: 'username', password: 'password' }));

    expect(await getAction(store, LOGIN_STARTED)).toEqual({ type: LOGIN_STARTED });
    expect((await getAction(store, POST_AUTHENTICATE_FAILURE)).type).toEqual(POST_AUTHENTICATE_FAILURE);
  });
});

