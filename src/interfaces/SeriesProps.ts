export interface ISeriesInistialState extends ISeriesReponse {
  fetchRequested?: boolean,
  fetchFailed?: boolean
}

interface ISeries {
  id: number
  title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  vote_average: string
  backdrop_path: string
  original_title: string
  original_language: string
  genres: Array<{ id: number, name: string }>
}

export interface ISeriesReponse {
  results?: Array<ISeries>,
  total_pages?: number
  total_results?: number
  page?: number
}
