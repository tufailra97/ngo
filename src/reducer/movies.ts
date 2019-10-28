import { FETCH_FAILED, MOVIE_GET_NOW_PLAYING, REQUEST_FETCH, MOVIE_GET_MOVIE_DETAILS, MOVIE_GET_RECCOMENDATION } from 'types';
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
    case MOVIE_GET_NOW_PLAYING:
      return {
        ...state,
        fetchRequested: false,
        results: actions.movies,
        totalPage: actions.totalPage,
        totalResults: actions.totalResults
      }
    case MOVIE_GET_RECCOMENDATION:
      return {
        ...state,
        fetchRequested: false,
        results: actions.movies,
        totalPage: actions.totalPage,
        totalResults: actions.totalResults
      }
    case MOVIE_GET_MOVIE_DETAILS:
      return {
        ...state,
        movie: actions.movie,
        fetchRequested: false
      }
    default:
      return state;
  }
};

export default reducer;
