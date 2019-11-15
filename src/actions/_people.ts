import axios from 'axios';
import { Dispatch } from 'redux';
import {
  REQUEST_FETCH,
  FETCH_FAILED,
  PEOPLE_GET_DETAILS,
  PEOPLE_GET_MOVIE_CREDITS,
  PEOPLE_GET_SERIE_CREDITS
} from 'types';
import { IPersonDetails } from 'interfaces';

/**
 * Get the primary person details by id.
 * @param id
 */
export const getDetails = (id: number) => async (dispatch: Dispatch) => {
  dispatch({
    type: REQUEST_FETCH
  });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/person/${id}?api_key=${process.env.REACT_APP_TMDB_API}`;

  const request = await axios.get(url);
  const data: IPersonDetails = request.data;

  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: PEOPLE_GET_DETAILS,
      payload: data
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};

/**
 * Get the movie credits for a person.
 * @param id
 */
export const getMovieCredits = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_API}`;
  const request = await axios.get(url);
  const data: IPersonDetails = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: PEOPLE_GET_MOVIE_CREDITS,
      payload: data
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};

/**
 * Get the TV show credits for a person.
 * @param id
 */
export const getSerieCredits = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/person/${id}/tv_credits?api_key=${process.env.REACT_APP_TMDB_API}`;
  const request = await axios.get(url);
  const data: IPersonDetails = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: PEOPLE_GET_SERIE_CREDITS,
      payload: data
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};
