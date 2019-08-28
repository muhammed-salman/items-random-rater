import { BOOKS_LOAD, BOOKS_LOAD_ERROR, BOOK_RATED, BOOK_RATED_ERROR  } from '../actions/types';

const INITIAL_STATE = { 'books': '', 'error': '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOKS_LOAD:
    case BOOK_RATED:
        return { ...action.payload };
    case BOOKS_LOAD_ERROR:
    case BOOK_RATED_ERROR:
        return { 'books': '', 'error': action.payload };
    default:
      return state;
  }
};