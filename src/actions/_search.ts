import { SEARCH_REQEUSTED, SEARCH_FAILED, SEARCH_RESULTS } from 'types'
import axios from 'axios';
import { Dispatch } from 'redux'
import { ISearch } from 'interfaces';

export const search = (keywords: string) => async (dispatch: Dispatch) => {
  dispatch({ type: SEARCH_REQEUSTED });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/search/multi?api_key=${process.env.REACT_APP_TMDB_API}&query=${keywords}&language=en-US`;

  const request = await axios.get(url);
  const data: ISearch = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: SEARCH_RESULTS,
      results: data
    });
  }
  return dispatch({
    type: SEARCH_FAILED
  });
};