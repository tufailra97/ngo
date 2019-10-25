import axios from 'axios';
import { Dispatch } from 'redux';
import {
  REQUEST_FETCH,
  FETCH_FAILED,
  FETCH_SUCCESS,
  FETCH_MOVIE_DETAILS
} from 'types';
import { IMovieResponse, IMovieDetailsResponse } from 'interfaces';

export const getNowPlaying = (page: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=${page}`;

  const request = await axios.get(url);
  const data: IMovieResponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: FETCH_SUCCESS,
      movies: data.results,
      totalPage: data.total_pages,
      totalResults: data.total_results
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};

export const getMovieDetails = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US`;

  const request = await axios.get(url);
  const data: IMovieDetailsResponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: FETCH_MOVIE_DETAILS,
      movie: data
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};
