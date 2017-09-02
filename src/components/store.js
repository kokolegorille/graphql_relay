import React, {Component} from 'react';
import { 
  createRefetchContainer,
  createPaginationContainer, 
  graphql 
} from 'react-relay';

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
      e => {if (e) console.log(e)}
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


// export default createRefetchContainer(
//   Store,
//   {
//     store: graphql.experimental`
//       fragment store_store on Store
//       @connection(key: "storeRefetch_store") {
//         videos {
//           edges {
//             node {
//               id
//               ...video_video
//             }
//           }
//           pageInfo {
//             hasNextPage
//             hasPreviousPage
//             startCursor
//             endCursor
//           }
//         }
//       }
//     `
//   },
//   graphql.experimental`
//     query storeRefetchQuery {
//       store {
//         ...store_store
//       }
//     }
//   `,
// );
