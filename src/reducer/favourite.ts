import {
  FAVOURITE_REQUEST_INIT,
  FAVOURITE_GET_FAVOURITES,
  FAVOURITE_GET_FAVOURITES_FAILED
} from 'types';
import { IFavouriteState } from 'interfaces';

const initialState: IFavouriteState = {
  items: null,
  error: false,
  fetchRequested: false
};

const reducer = (state = initialState, actions: any): any => {
  switch (actions.type) {
    case FAVOURITE_REQUEST_INIT:
      return {
        fetchRequested: true,
        error: false,
        items: null
      };
    case FAVOURITE_GET_FAVOURITES:
      return {
        items: actions.payload.items,
        fetchRequested: false,
        error: false
      };
    case FAVOURITE_GET_FAVOURITES_FAILED:
      return {
        fetchRequested: false,
        error: true
      };
    default:
      return state;
  }
};

export default reducer;
