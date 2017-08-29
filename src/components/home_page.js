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
      query homePageQuery($limit: Int) {
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
  />
);
  
export default HomePage;  
