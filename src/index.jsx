import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import './styles/custom.scss';
import 'babel-polyfill';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
