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

// function main() {
//   const app = document.getElementById('app');
//   render(
//     <QueryRenderer
//       environment={environment}
//       query={graphql`
//         query appQuery {
//           videos(first: 3) {
//             ...videos_videos
//           }
//         }
//       `}
//       variables={{}}
//       render={({error, props}) => {
//         if (error) {
//           return <div>{error.message}</div>;
//         } else if (props) {
//           return <Videos videos={props.videos} />;
//           // console.log(props);
//           // return <p>ok</p>;
//         }
//         return <div>Loading...</div>;
//       }}
//     />,
//     app
//   );
// }

// function main() {
//   const app = document.getElementById('app');
//   render(
//     <QueryRenderer
//       environment={environment}
//       query={graphql`
//         query appQuery {
//           store {
//             videos(first: 1) {
//               totalCount,
//               pageInfo {
//                 hasNextPage
//                 hasPreviousPage
//                 startCursor
//                 endCursor
//               },
//               edges {
//                 node {
//                   id
//                   title
//                   duration
//                   watched
//                 }
//               }
//             }
//           }
//         }
//       `}
//       variables={{}}
//       render={({error, props}) => {
//         if (error) {
//           return <div>{error.message}</div>;
//         } else if (props) {
//           return <Videos videos={props.store.videos} />;
//           // console.log(props);
//           // return <p>ok</p>;
//         }
//         return <div>Loading...</div>;
//       }}
//     />,
//     app
//   );
// }

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
          // console.log(props);
          // return <p>ok</p>;
        }
        return <div>Loading...</div>;
      }}
    />,
    app
  );
}