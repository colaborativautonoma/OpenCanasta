import { ACTIONS } from '../actions';

export default (state = 'salers', action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.SET_SECTION:
      return payload;
    default:
      return state;
  }
};
