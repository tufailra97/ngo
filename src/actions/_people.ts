import axios from 'axios';
import { Dispatch } from 'redux';
import {
  REQUEST_FETCH,
  FETCH_FAILED,
  PEOPLE_GET_DETAILS
} from 'types';
import { IPersonDetails } from 'interfaces';

/**
 * Get a list of movies in theatres.
 * @param id
 */
export const getDetails = (id: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `${process.env.REACT_APP_TMDB_END_POINT}/person/${id}?api_key=${process.env.REACT_APP_TMDB_API}`

  const request = await axios.get(url);
  const data: IPersonDetails = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: PEOPLE_GET_DETAILS,
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
}