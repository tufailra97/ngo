import { FETCH_FAILED, FETCH_SUCCESS, REQUEST_FETCH } from 'constant';
import { IMovieResponse } from 'interfaces/MovieProps';

interface IInistialState {
  movies: IMovieResponse | null | undefined,
  fetchRequested: boolean,
  fetchFailed: boolean
}

const initialState: IInistialState = {
  movies: null,
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
        movies: actions.payload
      }
    default:
      return state;
  }
};

export default reducer;
