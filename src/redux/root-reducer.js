import {combineReducers} from 'redux';

import appReducer from './app/app.reducer';
import dataReducer from './data/data.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  data: dataReducer,
});

export default rootReducer;
