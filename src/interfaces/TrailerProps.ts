export interface TrailerResponse {
  id: number;
  results: Array<Trailer>;
}

export interface Trailer {
  id?: string;
  key?: string;
  name?: string;
  site?: string;
  type?:
    | 'Trailer'
    | 'Teaser'
    | 'Clip'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Bloopers';
}
