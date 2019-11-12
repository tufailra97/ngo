import axios from 'axios';
import { Dispatch } from 'redux';
import { REQUEST_FETCH, FETCH_FAILED, SERIE_GET_TOP_RATED, SERIE_GET_SERIE_DETAILS, SERIE_GET_CREDITS, SERIE_GET_RECCOMENDATION } from 'types';
import { ISeriesReponse, ICredits } from 'interfaces';

/**
 * Get a list of top rated series.
 * @param page
 */
export const getTopRaped = (page: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/tv/top_rated?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US&page=${page}`;

  const request = await axios.get(url);
  const data: ISeriesReponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: SERIE_GET_TOP_RATED,
      series: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};

/**
 * Get the primary information about a serie
 * @param id
 */
export const getSerieDetails = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });

  const url = `${process.env.REACT_APP_TMDB_END_POINT}/tv/${id}?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US`;

  const request = await axios.get(url);
  const data: ISeriesReponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: SERIE_GET_SERIE_DETAILS,
      serie: data
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};

/**
 * Get the cast and crew for a serie.
 * @param id
 */
export const getCredits = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/tv/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API}`;

  const request = await axios.get(url);
  const data: ICredits = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: SERIE_GET_CREDITS,
      cast: data.cast
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};


/**
 * Get a list of recommended movies for a movie
 * @param id
 */
export const getRecommendations = (id: number) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_API}&language=en-US`;

  const request = await axios.get(url);
  const data: ISeriesReponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: SERIE_GET_RECCOMENDATION,
      recommendations: data.results,
      total_pages: data.total_pages,
      total_results: data.total_results
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};