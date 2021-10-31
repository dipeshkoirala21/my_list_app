import {createSelector} from 'reselect';

const selectApp = state => state.app;

export const selectLoading = createSelector([selectApp], app => app.loading);

export const selectToken = createSelector([selectApp], app => app.token);
