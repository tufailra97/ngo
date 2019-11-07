import { SEARCH_REQEUSTED, SEARCH_FAILED, SEARCH_RESULTS } from 'types'

const initialState = {

}

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case SEARCH_REQEUSTED:
      return {
        ...state,
        fetchRequested: true
      }
    case SEARCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      }
    case SEARCH_RESULTS:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      }
    default:
      return state;
  }
}

export default reducer;