import React, {Component} from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import PageInfo from './pageInfo';
import Video from './video';

class Store extends Component {
  render() {
    const {store} = this.props;
    return (
      <div>  
        <ul>
          {
            store.videos.edges.map(edge => <Video video={edge.node} />)
          }
        </ul>
        <button
          onClick={this._loadMore}
          title="Load More">
          Load more...
        </button>
        <hr/>
        <p>Total count : {store.videos.totalCount}</p>
        <PageInfo pageInfo={store.videos.pageInfo} />
      </div>
    );
  }
  
  _loadMore = () => {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) {
      return;
    }
    
    this.props.relay.loadMore(
      3, // Fetch the next 3 feed items
      e => {console.log(e)}
    );
  }
}

export default createPaginationContainer(
  Store, 
  {
    store: graphql.experimental`
      fragment store_store on Store 
      @argumentDefinitions(
        count: {type: "Int", defaultValue: 20}
        cursor: {type: "String"}
      ) 
      {
        videos(
          first: $count
          after: $cursor
          ) @connection(key: "store_videos") {
          edges {
            node {
              id,
              ...video_video
            }
          },
          totalCount,
          pageInfo {
            hasPreviousPage,
            hasNextPage,
            startCursor,
            endCursor
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.store && props.store.videos;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, {count, cursor}, fragmentVariables) {
      return {
        count,
        cursor,
        // in most cases, for variables other than connection filters like
        // `first`, `after`, etc. you may want to use the previous values.
        // orderBy: fragmentVariables.orderBy,
      };
    },
    query: graphql.experimental`
      query storeQuery(
        $count: Int!
        $cursor: String
      ) {
        store {
          videos(
            first: $count
            after: $cursor
          ) @connection(key: "store_videos") {
            edges {
              node {
                id,
                ...video_video
              }
            },
            totalCount,
            pageInfo {
              hasPreviousPage,
              hasNextPage,
              startCursor,
              endCursor
            }
          }
        }
      }
    `
  }
);

// export default createFragmentContainer(Store, {
//   store: graphql.experimental`
//     fragment store_store on Store
//     @argumentDefinitions(
//       count: {type: "Int", defaultValue: 3}
//     )
//     {
//       videos(first: $count) {
//         edges {
//           node {
//             id,
//             ...video_video
//           }
//         },
//         totalCount,
//         pageInfo {
//           hasPreviousPage,
//           hasNextPage,
//           startCursor,
//           endCursor
//         }
//       }
//     }
//   `,
// });




// import React from 'react';
// import { createFragmentContainer, graphql } from 'react-relay';
// import PageInfo from './pageInfo';
// import Video from './video';
//
// const Store = ({store}) => (
//   <div>
//     <ul>
//       {
//         store.videos.edges.map(edge => <Video video={edge.node} />)
//       }
//     </ul>
//     <hr/>
//     <p>Total count : {store.videos.totalCount}</p>
//     <PageInfo pageInfo={store.videos.pageInfo} />
//   </div>
// );
//
// export default createFragmentContainer(Store, {
//   store: graphql.experimental`
//     fragment store_store on Store
//     @argumentDefinitions(
//       limit: {type: "Int", defaultValue: 10}
//     )
//     {
//       videos(first: $limit) {
//         edges {
//           node {
//             id,
//             ...video_video
//           }
//         },
//         totalCount,
//         pageInfo {
//           hasPreviousPage,
//           hasNextPage,
//           startCursor,
//           endCursor
//         }
//       }
//     }
//   `,
// });