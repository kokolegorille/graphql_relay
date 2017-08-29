import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { Router, browserHistory } from 'react-router';
import routes from './routes';

// import {
//   QueryRenderer,
//   graphql,
// } from 'react-relay';
// 
// import environment from './environment';
// import Store from './components/store';
//
// main();
// 
// function main() {
//   const app = document.getElementById('app');
//   render(
//     <QueryRenderer
//       environment={environment}
//       query={graphql.experimental`
//         query appQuery($limit: Int) {
//           store {
//             ...store_store @arguments(limit: $limit)
//           }
//         }
//       `}
//       variables={{limit: 2}}
//       render={({error, props}) => {
//         if (error) {
//           return <div>{error.message}</div>;
//         } else if (props) {
//           return <Store store={props.store} />;
//         }
//         return <div>Loading...</div>;
//       }}
//     />,
//     app
//   );
// }

main();

function main() {
  const app = document.getElementById('app');
  render(
    <Router history={browserHistory} routes={routes} />,
    app
  );
}