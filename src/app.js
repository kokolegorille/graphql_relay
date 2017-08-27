import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { 
  QueryRenderer, 
  graphql,
} from 'react-relay';

import environment from './environment';

main();

function main() {
  const app = document.getElementById('app');
  render(
    <QueryRenderer
      environment={environment}
      query={graphql`
        query appQuery {
          videos(first: 2) {
            totalCount,
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            },
            edges {
              node {
                id
                title
                duration
                watched
              }
            }
          }
        }
      `}
      variables={{}}
      render={({error, props}) => {
        if (error) {
          return <div>{error.message}</div>;
        } else if (props) {
          // return <Videos videos={props.videos} />;
          console.log(props);
          return <p>ok</p>;
        }
        return <div>Loading...</div>;
      }}
    />,
    app
  );
}