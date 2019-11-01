export interface IMovieInistialState extends IMovieResponse, IMovieDetailsResponse, ICredits {
  fetchRequested?: boolean,
  fetchFailed?: boolean
}
export interface IMovie {
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

export interface IMovieDetails extends IMovie {
  budget: number
  homepage: string
  imdb_id: string
  production_companies: Array<IProductionCompany>
  revenue: string | number
  runtime: string | number
  status: string
  tagline: string
}

interface IProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

export interface ICast {
  cast_id: number
  character: string
  credit_id: string
  gender: string
  id: number
  name: string
  profile_path: null | string
}

export interface ICredits {
  cast?: Array<ICast>
}

export interface IMovieDetailsResponse {
  movie?: IMovieDetails,
}

export interface IMovieResponse {
  results?: Array<IMovie>,
  total_pages?: number
  total_results?: number
  page?: number
}