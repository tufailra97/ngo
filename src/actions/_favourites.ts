import { Dispatch } from 'redux';
import {
  FAVOURITE_REQUEST_INIT,
  FAVOURITE_GET_FAVOURITES,
  FAVOURITE_GET_FAVOURITES_FAILED
} from 'types';
import axios from 'axios';
import { IFavourite } from 'interfaces';

/**
 * Get a list of favourites.
 * @param page
 */
export const getFavourites = (user_id: string, token: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FAVOURITE_REQUEST_INIT });
  const url = `${process.env.REACT_APP_NGO_BACKEND_END_POINT}/favourite/get`;

  try {
    const response = await axios({
      method: 'GET',
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      params: {
        user_id
      }
    });

    const data: IFavourite = response.data;
    dispatch({
      type: FAVOURITE_GET_FAVOURITES,
      payload: data
    });
  } catch (error) {
    console.log('error', error.response);
    dispatch({
      type: FAVOURITE_GET_FAVOURITES_FAILED
    });
  }
};
