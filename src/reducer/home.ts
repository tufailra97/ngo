import {
  FETCH_FAILED,
  REQUEST_FETCH,
  HOME_GET_TRENDING_MOVIES,
  HOME_GET_TRENDING_SERIES
} from 'types';

import { HomeInitialProps } from 'interfaces/HomeProps';

const initialState: HomeInitialProps = {
  fetchFailed: false,
  fetchRequested: false
};

// TODO: assign proper type to actions
const reducer = (state = initialState, actions: any): any => {
  switch (actions.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        fetchRequested: true
      };
    case FETCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      };

    case HOME_GET_TRENDING_MOVIES:
      return {
        ...state,
        trendingMovies: actions.payload
      };
    case HOME_GET_TRENDING_SERIES:
      return {
        ...state,
        trendingSeries: actions.payload
      };
    default:
      return state;
  }
};

export default reducer;
