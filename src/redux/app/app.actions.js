import * as types from './app.types';

export const setLoading = loading => ({
  type: types.SET_LOADING,
  payload: loading,
});

export const setToken = token => ({
  type: types.SET_TOKEN,
  payload: token,
});
