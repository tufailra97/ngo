import { PEOPLE_GET_DETAILS, FETCH_FAILED, REQUEST_FETCH } from 'types';

const initialState = {

}

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        fetchRequested: true,
      }
    case FETCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      }
    case PEOPLE_GET_DETAILS:
      return {
        ...state,
        fetchRequested: false,
        people: actions.payload
      }
    default:
      return state;
  }
}

export default reducer;