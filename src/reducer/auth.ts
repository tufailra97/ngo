import { AUTH_LOGIN_USER, AUTH_LOGOUT_USER } from 'types';
import { AuthState } from 'interfaces';

const initialState: AuthState = {
  isUserLoggedIn: false,
  userDetails: {
    token: null,
    userID: null
  }
};

// TODO: assign proper type to actions
const reducer = (state = initialState, actions: any): any => {
  console.log('type', actions);
  switch (actions.type) {
    case AUTH_LOGIN_USER:
      return {
        ...state,
        isUserLoggedIn: true,
        userDetails: {
          token: actions.payload.token,
          userID: actions.payload.userID
        }
      };
    case AUTH_LOGOUT_USER:
      return {
        isUserLoggedIn: false,
        userDetails: {
          token: null,
          userID: null
        }
      };
    default:
      return state;
  }
};

export default reducer;
