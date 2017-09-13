import { ACTIONS } from '../actions';

export default (state = true, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SET_LOADING:
      return payload;
    default:
      return state;
  }
};
