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

export interface IMovieResponse {
  page: number
  results: Array<IMovie>
  total_pages: number
  total_results: number
}