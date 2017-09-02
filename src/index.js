import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { Router, browserHistory } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

import './app.css';
// import routes from './routes';
import App from './components/app';

main();

function main() {
  const app = document.getElementById('app');
  render(
    <Router>
      <App />
    </Router>
    ,
    app
  );
}

// function main() {
//   const app = document.getElementById('app');
//   render(
//     <Router history={browserHistory} routes={routes} />,
//     app
//   );
// }