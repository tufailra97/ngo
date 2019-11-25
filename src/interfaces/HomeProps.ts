import { IMovie } from './MovieProps';
import { ISerie } from 'interfaces';

export interface HomeInitialProps {
  carouselsContents?: Array<IMovie>;
  fetchFailed: boolean;
  fetchRequested: boolean;
  trendingMovies?: Array<IMovie>;
  trendingSeries?: Array<ISerie>;
}
