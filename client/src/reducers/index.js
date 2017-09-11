import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  admin: adminReducer,
  loading: loadingReducer,
});
