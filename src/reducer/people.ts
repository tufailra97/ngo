import {
  PEOPLE_GET_DETAILS,
  FETCH_FAILED,
  REQUEST_FETCH,
  PEOPLE_GET_MOVIE_CREDITS,
  PEOPLE_GET_SERIE_CREDITS
} from 'types';
import { IPeopleCredit } from 'interfaces';
import { IPeopleCreditResponse } from 'interfaces/IPeopleProps';

const initialState = {};

const handleResults = (
  credits: IPeopleCreditResponse
): Array<IPeopleCredit> => {
  return credits.cast.length > 5 ? credits.cast.slice(0, 5) : credits.cast;
};

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        fetchRequested: true
      };
    case FETCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      };
    case PEOPLE_GET_DETAILS:
      return {
        ...state,
        fetchRequested: false,
        fetchFailed: false,
        people: actions.payload
      };
    case PEOPLE_GET_MOVIE_CREDITS:
      return {
        ...state,
        fetchRequested: false,
        fetchFailed: false,
        movieCredits: handleResults(actions.payload)
      };
    case PEOPLE_GET_SERIE_CREDITS:
      return {
        ...state,
        fetchRequested: false,
        fetchFailed: false,
        serieCredits: handleResults(actions.payload)
      };
    default:
      return state;
  }
};

export default reducer;
