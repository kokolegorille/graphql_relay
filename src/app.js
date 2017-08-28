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
      query={graphql`
        query appQuery {
          store {
            ...store_store
          }
        }
      `}
      variables={{}}
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