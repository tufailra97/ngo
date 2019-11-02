export interface IPersonDetails {
  birthday: string,
  known_for_department: string,
  deathday: string | null,
  id: number,
  name: string,
  also_known_as: Array<string> | undefined,
  gender: number,
  biography: string
  popularity: number,
  place_of_birth: string,
  profile_path: string
  adult: boolean,
  imdb_id: string,
  homepage: string | null
}