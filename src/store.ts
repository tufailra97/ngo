import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

const loadState = (): Object => {
  return JSON.parse(localStorage.getItem('store')!) || {};
};

const saveState = (state: Store): void => {
  localStorage.setItem('store', JSON.stringify(state.getState()));
};

// initial state
const initialState: any = loadState();
// set middlewares
const middlewares = [thunk];
// create store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

// save store to localStorage
store.subscribe(() => {
  saveState(store);
});

export default store;
