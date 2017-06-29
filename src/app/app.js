import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router';
import store from './store';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import './app.css';

const history = createHistory();

ReactDOM.render(
  <Provider store={store({ history })}>
    <Router history={history} />
  </Provider>,
  document.getElementById('root')
);
