import { createStore } from 'redux';
import reducers from './reducers';

const initialValues = {
  admin: {},
  loading: true,
  section: 'salers',
  salers: [],
  admins: [
    {
      email: 'email1@mail.com',
      password: 'password1',
    },
  ],
};

const store = createStore(reducers, initialValues);

export default store;
