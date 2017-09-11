import { createStore } from 'redux';
import reducers from './reducers';

const initialValues = {
  admin: {},
};

const store = createStore(reducers, initialValues);

export default store;
