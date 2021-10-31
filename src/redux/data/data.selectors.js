import {createSelector} from 'reselect';

const selectData = state => state.data;

export const selectLoading = createSelector([selectData], data => data.loading);

export const selectRepos = createSelector([selectData], data => data.repo);

export const selectLoadMore = createSelector(
  [selectData],
  data => data.loadMore,
);
