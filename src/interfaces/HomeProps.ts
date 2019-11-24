import { IMovie } from './MovieProps';

export interface HomeInitialProps {
  carouselsContents?: Array<IMovie>;
  fetchFailed: boolean;
  fetchRequested: boolean;
}
