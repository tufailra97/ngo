import { SEARCH_REQEUSTED, SEARCH_FAILED, SEARCH_RESULTS } from 'types'
import { ISearchInitialState, ISearch, ISearchPerson, ISearchMovie, ISearchSerie } from 'interfaces';

const initialState: ISearchInitialState = {
  searchFailed: false,
  searchRequested: false,
  results: {
    series: undefined,
    movies: undefined,
    persons: undefined
  }
}
// TODO :: assign proper type
// Turn off --strictNullChecks and --strictPropertyInitialization
const handleSearchResults = (res: ISearch): any => {
  let persons: Array<ISearchPerson> = [];
  let movies: Array<ISearchMovie> = [];
  let series: Array<ISearchSerie> = [];

  const { results } = res;
  if (results) {
    for (let index = 0; index < results.length; index++) {
      if (results[index].media_type === 'movie') {
        movies.push(results[index]);
      } else if (results[index].media_type === 'tv') {
        series.push(results[index]);
      } else if (results[index].media_type === 'person') {
        persons.push(results[index])
      }
    };
  }

  return { series, movies, persons }
}

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case SEARCH_REQEUSTED:
      return {
        ...state,
        searchRequested: true
      }
    case SEARCH_FAILED:
      return {
        ...state,
        searchFailed: true,
        searchRequested: false
      }
    case SEARCH_RESULTS:
      return {
        ...state,
        results: handleSearchResults(actions.results),
        searchFailed: false,
        searchRequested: false
      }
    default:
      return state;
  }
}

export default reducer;