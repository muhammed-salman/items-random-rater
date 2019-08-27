import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/js/bootstrap.min';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.scss';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
