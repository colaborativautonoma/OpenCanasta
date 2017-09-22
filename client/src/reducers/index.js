import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import loadingReducer from './loadingReducer';
import salersReducer from './salersReducer';
import reservesReducer from './reservesReducer';

export default combineReducers({
  admin: adminReducer,
  loading: loadingReducer,
  salers: salersReducer,
  reserves: reservesReducer
});
