import { createStore } from 'redux';
import reducers from './reducers';

const initialValues = {
  admin: {},
  loading: true,
  salers: [],
  reserves: []
};

const store = createStore(reducers, initialValues);

export default store;
