import axios from 'axios';
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