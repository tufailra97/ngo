import axios from 'axios';
import { Dispatch } from 'redux';
import {
  REQUEST_FETCH,
  FETCH_FAILED,
  HOME_GET_TRENDING_MOVIES,
  HOME_GET_TRENDING_SERIES
} from 'types';
import { IMovieResponse } from 'interfaces';

/**
 * Get the daily or weekly trending movies.
 */
export const getTrendingMovies = () => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });

  const url = `${process.env.REACT_APP_TMDB_END_POINT}/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=1`;

  const request = await axios.get(url);
  const data: IMovieResponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: HOME_GET_TRENDING_MOVIES,
      payload: data.results
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};

/**
 * Get the daily or weekly trending series.
 */
export const getTrendingSeries = () => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });

  const url = `${process.env.REACT_APP_TMDB_END_POINT}/trending/tv/week?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=1`;

  const request = await axios.get(url);
  const data: IMovieResponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: HOME_GET_TRENDING_SERIES,
      payload: data.results
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};
