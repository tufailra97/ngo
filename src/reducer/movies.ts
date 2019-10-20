import { FETCH_FAILED, FETCH_SUCCESS, REQUEST_FETCH } from 'types';
import { IMovieInistialState } from 'interfaces';

const initialState: IMovieInistialState = {
  fetchFailed: false,
  fetchRequested: false
};

const reducer = (state = initialState, actions: any): any => {
  switch (actions.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        fetchRequested: true
      }
    case FETCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        fetchRequested: false,
        results: actions.movies,
        totalPage: actions.totalPage,
        totalResults: actions.totalResults
      }
    default:
      return state;
  }
};

export default reducer;
