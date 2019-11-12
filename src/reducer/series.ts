import { REQUEST_FETCH, FETCH_FAILED, SERIE_GET_TOP_RATED, SERIE_GET_SERIE_DETAILS, SERIE_GET_CREDITS, SERIE_GET_RECCOMENDATION } from 'types';
import { ISeriesInistialState } from 'interfaces';

const initialState: ISeriesInistialState = {
  fetchRequested: false,
  fetchFailed: false
}

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        requestFetch: true
      }
    case FETCH_FAILED:
      return {
        ...state,
        requestFetch: false,
        requestFailed: true
      }
    case SERIE_GET_TOP_RATED:
      return {
        ...state,
        requestFailed: false,
        requestFetch: false,
        results: actions.series,
        total_pages: actions.total_pages,
        total_results: actions.total_results
      }
    case SERIE_GET_SERIE_DETAILS:

      return {
        ...state,
        serie: actions.serie,
        fetchRequested: false
      }
    case SERIE_GET_CREDITS:
      return {
        ...state,
        cast: actions.cast,
        fetchRequested: false
      }
    case SERIE_GET_RECCOMENDATION:
      return {
        ...state,
        recommendations: actions.recommendations,
        fetchRequested: false
      }
    default:
      return state;
  }
}

export default reducer;