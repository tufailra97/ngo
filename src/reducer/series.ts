import { REQUEST_FETCH, FETCH_FAILED, SERIE_GET_TOP_RATED, SERIE_GET_SERIE_DETAILS } from 'types';

const initialState = {

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
        serie: actions.movie,
        fetchRequested: false
      }
    default:
      return state;
  }
}

export default reducer;