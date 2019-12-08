export interface IFavouriteState {
  items: Array<IFavourite> | null;
  error: boolean;
  fetchRequested: boolean;
}

export interface IFavourite {
  type: 'serie' | 'movie';
  id: number;
  original_title: string;
  poster_path: string;
}
