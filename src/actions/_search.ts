import { SEARCH_REQEUSTED, SEARCH_FAILED, SEARCH_RESULTS } from 'types'
import axios from 'axios';
import { Dispatch } from 'redux'

export const search = (keywords: string) => async (dispatch: Dispatch) => {
  dispatch({ type: SEARCH_REQEUSTED });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/search/multi?api_key=${process.env.REACT_APP_TMDB_API}&query=${keywords}&language=en-US`;

  const request = await axios.get(url);
  const data: any = request.data;
  const status = request.status;

  console.log('res', data);

  if (status === 200) {
    return dispatch({
      type: SEARCH_RESULTS,
      results: data.results,
    });
  }
  return dispatch({
    type: SEARCH_FAILED
  });
};