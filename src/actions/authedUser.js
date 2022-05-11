export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const UNSET_AUTHED_USER = "UNSET_AUTHED_USER";

export const unsetAuthedUser = () => {
  return {
    type: UNSET_AUTHED_USER,
  };
};

export const setAuthedUser = (id) => {
  return {
    type: SET_AUTHED_USER,
    id,
  };
};

export function handleLoginAction(username, password) {
  return (dispatch, getState) => {
    const { users } = getState();
    if (users[username] != null && users[username].password === password) {
      dispatch(setAuthedUser(username));
    }
  };
}

export function handleLogoutAction() {
  return (dispatch) => {
    dispatch(unsetAuthedUser());
  };
}
