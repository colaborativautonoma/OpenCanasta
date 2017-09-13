export const ACTIONS = {
  SET_ADMIN: 'SET_ADMIN',
  SET_LOADING: 'SET_LOADING',
  SET_SALERS: 'SET_SALERS',
};

export const adminAction = admin => ({
  type: ACTIONS.SET_ADMIN,
  payload: admin,
});

export const loadingAction = isLoading => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});

export const salersAction = salers => ({
  type: ACTIONS.SET_SALERS,
  payload: salers,
});
