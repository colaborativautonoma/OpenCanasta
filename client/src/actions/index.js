export const ACTIONS = {
  SET_ADMIN: 'SET_ADMIN',
  SET_LOADING: 'SET_LOADING',
};

export const adminAction = admin => ({
  type: ACTIONS.SET_ADMIN,
  payload: admin,
});

export const loadingAction = isLoading => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});
