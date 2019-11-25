import { ProctionCompanyProps } from './ProctionCompanyProps';
import { ICast } from './CastProps';

export interface ISeriesInistialState extends ISeriesReponse, ICredits {
  fetchRequested?: boolean;
  fetchFailed?: boolean;
  serie?: ISeries;
  recommendations?: Array<ISeries>;
}

export interface ISeries {
  id: number;
  name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_title: string;
  original_language: string;
  number_of_episodes: number;
  number_of_seasons: number;
  genres: Array<{ id: number; name: string }>;
  episode_run_time: Array<number>;
  production_companies: Array<ProctionCompanyProps>;
}

export interface ISeriesReponse {
  results?: Array<ISeries>;
  total_pages?: number;
  total_results?: number;
  page?: number;
}

export interface ICredits {
  cast?: Array<ICast>;
}
