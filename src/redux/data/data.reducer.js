import produce from 'immer';
import * as types from './data.types';

const INITIAL_STATE = {
  loading: false,
  error: null,
  repo: {total_count: 11, incomplete_results: false, items: []},
  loadMore: false,
};

const reducer = (state = INITIAL_STATE, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_LIST_REQUEST:
        draft.loading = true;
        break;
      case types.GET_LIST_SUCCESS:
        draft.loading = false;
        draft.repo = action.payload;
        break;
      case types.GET_LIST_FAILURE:
        draft.error = action.payload;
        draft.loading = false;
        break;

      case types.LOAD_MORE_SUCCESS:
        draft.loadMore = false;
        const dataID = new Set(state.repo.items.map(({id}) => id));
        const combined = [
          ...state.repo.items,
          ...action.payload.items.filter(({id}) => !dataID.has(id)),
        ];
        draft.repo = {
          ...action.payload,
          items: combined,
        };
        break;

      case types.SET_LOAD_MORE_INDICATOR:
        draft.loadMore = action.payload;
        break;

      case types.CLEAR_LIST_DATA:
        draft.repo = INITIAL_STATE.repo;
        break;
    }
  });

export default reducer;
