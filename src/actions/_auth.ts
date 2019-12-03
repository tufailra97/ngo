import { AUTH_LOGIN_USER, AUTH_LOGOUT_USER } from 'types';
import { Dispatch } from 'redux';

// login user
export const login = (userID: string, token: string) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: AUTH_LOGIN_USER,
    payload: {
      userID,
      token
    }
  });
};

// logout user
export const logout = () => (dispatch: Dispatch) => {
  dispatch({
    type: AUTH_LOGOUT_USER
  });
};
