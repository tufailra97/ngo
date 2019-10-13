import { FETCH_FAILED, FETCH_SUCCESS, REQUEST_FETCH } from 'constant';

interface IMovie {
  adult?: boolean
  backdrop_path?: string
  genre_ids?: Array<number>
  id: number
  original_language: string
  original_title: string
  overview?: string
  popularity?: string
  poster_path?: string
  release_date?: string
  title: string
  video?: boolean
  vote_average?: number
  vote_count?: number
}

interface IMovieResponse {
  page: number
  results: Array<IMovie>
  total_pages: number
  total_results: number
}
interface IInistialState {
  movies: IMovieResponse | null | undefined,
  fetchRequested: boolean,
  fetchFailed: boolean
}

const initialState: IInistialState = {
  movies: null,
  fetchFailed: false,
  fetchRequested: false
};

const reducer = (state = initialState, actions: any): any => {
  switch (actions.type) {
    case REQUEST_FETCH:
      return {
        ...state,
        fetchRequested: true
      }
      break;
    case FETCH_FAILED:
      return {
        ...state,
        fetchFailed: true,
        fetchRequested: false
      }
      break;
    case FETCH_SUCCESS:
      return {
        ...state,
        fetchRequested: false,
        movies: actions.payload
      }
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
