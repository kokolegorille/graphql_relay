import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

main();

function main() {
  const app = document.getElementById('app');
  render(
    <Router history={browserHistory} routes={routes} />,
    app
  );
}