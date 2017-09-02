import React from 'react';

import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../environment';
import Store from './store';

const HomePage = () => (
  <QueryRenderer
    environment={environment}
    query={graphql.experimental`
      query homePageQuery(
        $count: Int!
      ) {
        store {
          ...store_store @arguments(count: $count)
        }
      }
    `}
    variables={{count: 3}}
    render={({error, props}) => {
      if (error) {
        return <div>{error.message}</div>;
      } else if (props) {
        return <Store store={props.store} />;
      }
      return <div>Loading...</div>;
    }}
  />
);
  
export default HomePage;

