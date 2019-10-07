import {combineReducers} from 'redux';
import movie from './movies';

export default combineReducers({
  movies: movie
});