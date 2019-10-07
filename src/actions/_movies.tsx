import axios from 'axios';
import { DispatchProp } from 'react-redux';

export const discoverMovie = async (page: number = 1) => {
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=72049b7019c79f226fad8eec6e1ee889&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;
  const request = await axios.get(url);
  const data = request.data;
  const status = request.status;
};
