import axios from 'axios';
import { Dispatch } from 'redux';
import { REQUEST_FETCH, FETCH_FAILED, FETCH_SUCCESS } from 'types';
import { IMovieResponse } from 'interfaces';

export const getNowPlaying = (page: number) => async (dispatch: Dispatch) => {
  dispatch({ type: REQUEST_FETCH });
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

  const request = await axios.get(url);
  const data: IMovieResponse = request.data;
  const status = request.status;

  if (status === 200) {
    return dispatch({
      type: FETCH_SUCCESS,
      movies: data.results,
      totalPage: data.total_pages,
      totalResults: data.total_results
    });
  }
  return dispatch({
    type: FETCH_FAILED
  });
};
