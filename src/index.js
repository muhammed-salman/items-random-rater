import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/js/bootstrap.min.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';
import '@fortawesome/fontawesome-free/css/all.css'; 

import App from './components/App';
import AppContainer from './components/AppContainer';
import Rater from './containers/Rater';
import RandomRater from './containers/RandomRater';
import reducers from './reducers';

const store = createStore(
    reducers, applyMiddleware(reduxThunk)
  );
  
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <AppContainer>
          <Route path="/" exact component={App} />
          <Route path="/rater/:title" component={Rater} />
          <Route path="/randomrater" component={RandomRater} />
        </AppContainer>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
  );
  
serviceWorker.register();
