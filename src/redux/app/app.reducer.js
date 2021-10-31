import produce from 'immer';
import * as types from './app.types';

const INITIAL_STATE = {
  loading: true,
  token: null,
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SET_TOKEN:
        draft.token = action.payload;
        break;
      case types.CLEAR_TOKEN:
        draft.token = INITIAL_STATE.token;
        break;
      case types.SET_LOADING:
        draft.loading = action.payload;
        break;
    }
  });

export default reducer;
