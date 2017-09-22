export const ACTIONS = {
  SET_ADMIN: 'SET_ADMIN',
  SET_LOADING: 'SET_LOADING',
  SET_SALERS: 'SET_SALERS',
  SET_RESERVES: 'SET_RESERVES',
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

export const reservesAction = reserves => ({
  type: ACTIONS.SET_RESERVES,
  payload: reserves,
});
