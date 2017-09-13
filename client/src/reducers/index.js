import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import loadingReducer from './loadingReducer';
import salersReducer from './salersReducer';

export default combineReducers({
  admin: adminReducer,
  loading: loadingReducer,
  salers: salersReducer
});
