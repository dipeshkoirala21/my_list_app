import * as types from './app.types';

export const setLoading = loading => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: token,
});

export const logout = payload => ({
  type: types.CLEAR_TOKEN,
  payload,
});
