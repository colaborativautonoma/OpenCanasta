import { combineReducers } from 'redux';

import adminReducer from './adminReducer';
import loadingReducer from './loadingReducer';
import sectionReducer from './sectionReducer';
import salersReducer from './salersReducer';
import adminsReducer from './adminsReducer';

export default combineReducers({
  admin: adminReducer,
  loading: loadingReducer,
  section: sectionReducer,
  salers: salersReducer,
  admins: adminsReducer,
});
