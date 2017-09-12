import { ACTIONS } from '../actions';

export default (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SET_SALERS:
      return payload;
    default:
      return state;
  }
};
