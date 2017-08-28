import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { 
  QueryRenderer, 
  graphql,
} from 'react-relay';

import environment from './environment';
import Store from './components/store';

main();

function main() {
  const app = document.getElementById('app');
  render(
    <QueryRenderer
      environment={environment}
      query={graphql.experimental`
        query appQuery($limit: Int) {
          store {
            ...store_store @arguments(limit: $limit)
          }
        }
      `}
      variables={{limit: 2}}
      render={({error, props}) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          return <Store store={props.store} />;
        }
        return <div>Loading...</div>;
      }}
    />,
    app
  );
}