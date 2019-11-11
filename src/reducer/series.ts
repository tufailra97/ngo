import { REQUEST_FETCH, FETCH_FAILED, SERIE_GET_TOP_RATED } from 'types';

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
      console.log('results ', actions);

      return {
        ...state,
        requestFailed: false,
        requestFetch: false,
        results: actions.series,
        total_pages: actions.total_pages,
        total_results: actions.total_results
      }
    default:
      return state;
  }
}

export default reducer;