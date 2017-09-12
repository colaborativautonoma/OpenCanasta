export const ACTIONS = {
  SET_ADMIN: 'SET_ADMIN',
  SET_LOADING: 'SET_LOADING',
  SET_SECTION: 'SET_SECTION',
  SET_SALERS: 'SET_SALERS',
  SET_ADMINS: 'SET_ADMINS',
};

export const adminAction = admin => ({
  type: ACTIONS.SET_ADMIN,
  payload: admin,
});

export const loadingAction = isLoading => ({
  type: ACTIONS.SET_LOADING,
  payload: isLoading,
});

export const sectionAction = section => ({
  type: ACTIONS.SET_SECTION,
  payload: section,
});

export const salersAction = salers => ({
  type: ACTIONS.SET_SALERS,
  payload: salers,
});

export const adminsAction = admins => ({
  type: ACTIONS.SET_ADMINS,
  payload: admins,
});
