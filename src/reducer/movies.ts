
interface IInistialState {
  movies: string
}

const initialState: IInistialState = {
  movies: ''
};

const reducer = (state = initialState, actions: any): any => {
  switch(actions.type){
    case "movie":
        return {
          ...state,
          movies: actions.payload
        }
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
