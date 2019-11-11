import axios from 'axios';
import { Dispatch } from 'redux';
import { REQUEST_FETCH, FETCH_FAILED, SERIE_GET_TOP_RATED } from 'types';
import { ISeriesReponse } from 'interfaces';

/**
 * Get a list of movies in theatres.
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