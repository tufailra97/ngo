export interface ISearchInitialState {
  searchRequested: boolean
  searchFailed: boolean
  results: {
    movies?: Array<ISearchMovie> | ISearchMovie
    series?: Array<ISearchSerie> | ISearchSerie
    persons?: Array<ISearchPerson> | ISearchPerson
  }
}

export interface ISearch {
  results: Array<ISearchMovie | ISearchSerie | ISearchPerson>
}

export interface ISearchMovie {
  id: number
  title?: string
  media_type: string
  poster_path?: string
  backdrop_path?: string
}

export interface ISearchPerson {
  id: number
  name?: string
  media_type: string
  profile_path?: string
}

export interface ISearchSerie {
  id: number
  name?: string
  media_type: string
  poster_path?: string
  backdrop_path?: string
  original_name?: string
}