import _ from 'lodash';
import { BOOKS_LOAD, BOOKS_LOAD_ERROR, BOOK_RATED, BOOK_RATED_ERROR  } from './types';
import items from '../data/items.json';

export const loadBooks = () => async (dispatch) => {
  try {
    if(!_.isEmpty(items.books))
      dispatch({ type: BOOKS_LOAD, payload: items.books });
    else
      dispatch({ type: BOOKS_LOAD_ERROR, payload: 'No Books found in the file.' });  
  } catch (e) {
    dispatch({ type: BOOKS_LOAD_ERROR, payload: 'Not able to load books.' });
  }
};

export const updateBooks = (book) => async (dispatch) => {
  try {
    if(!_.isEmpty(book)){
      let newBooks=items.books;
      const i = newBooks.findIndex(_book => _book.title === book.title);
      if (i > -1)
        newBooks[i] = book;
      dispatch({ type: BOOK_RATED, payload: newBooks });
    }
    else
      dispatch({ type: BOOK_RATED_ERROR, payload: 'No Book recieved.' });  
  } catch (e) {
    dispatch({ type: BOOK_RATED_ERROR, payload: 'Not able to rate the books.' });
  }
};