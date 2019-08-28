import { combineReducers } from 'redux';
import books from './books';

const appReducer = combineReducers({
  books
});

const rootReducer = (state, action) => {
  if (action.type === '') {
    state = undefined;
  }
  return appReducer(state, action);
}


export default rootReducer;