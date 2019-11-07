import { combineReducers } from 'redux';
import movie from './movies';
import search from './search'

export default combineReducers({
  movies: movie,
  search: search
});