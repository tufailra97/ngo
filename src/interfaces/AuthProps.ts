export interface AuthState {
  isUserLoggedIn: boolean;
  userDetails: {
    token: null | string;
    userID: null | string;
  };
}
