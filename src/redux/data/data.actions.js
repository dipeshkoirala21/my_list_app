import * as types from './data.types';
import {searchRepo} from '../../api';

export const getRepoLists = (payload, page) => async dispatch => {
  dispatch({type: types.GET_LIST_REQUEST, payload});
  try {
    console.log(payload, 'payload');
    const response = await searchRepo(payload, page);
    console.log(response.data, 'response');
    dispatch({type: types.GET_LIST_SUCCESS, payload: response.data});
  } catch (err) {
    dispatch({type: types.GET_LIST_FAILURE, payload: err.response.data});
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const getMoreRepoLists = (payload, page) => async dispatch => {
  dispatch({type: types.LOAD_MORE_REQUEST, payload});
  try {
    console.log(payload, 'payload');
    const response = await searchRepo(payload, page);
    console.log(response.data, 'response');
    dispatch({type: types.LOAD_MORE_SUCCESS, payload: response.data});
  } catch (err) {
    dispatch({type: types.LOAD_MORE_SUCCESS, payload: err.response.data});
    console.log(err.response.data, 'error');
    throw err;
  }
};

export const setLoadMore = payload => dispatch => {
  dispatch({
    type: types.SET_LOAD_MORE_INDICATOR,
    payload,
  });
};

export const clearListData = payload => dispatch => {
  dispatch({
    type: types.CLEAR_LIST_DATA,
    payload,
  });
};
