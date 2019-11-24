import { FETCH_FAILED, REQUEST_FETCH } from 'types';
import { HomeInitialProps } from 'interfaces/HomeProps';

const initialState: HomeInitialProps = {
  fetchFailed: false,
  fetchRequested: false
};

// TODO: assign proper type to actions
const reducer = (state = initialState, actions: any): any => {
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
    default:
      return state;
  }
};

export default reducer;
