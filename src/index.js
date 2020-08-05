import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ListPage from './components/ListPage';
import SongPage from './components/SongPage';
import {Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';

const hist = createBrowserHistory()

ReactDOM.render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Router history={hist}>
    <Switch>
      <Route exact path="/songPage/:songId" component={SongPage} />
      <Route path="/" component={ListPage} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();