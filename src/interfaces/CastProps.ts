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