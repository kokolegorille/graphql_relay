import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import PageInfo from './pageInfo';
import Video from './video';

const Store = ({store}) => (
  <div>  
    <ul>
      {
        store.videos.edges.map(edge => <Video video={edge.node} />)
      }
    </ul>
    <hr/>
    <p>Total count : {store.videos.totalCount}</p>
    <PageInfo pageInfo={store.videos.pageInfo} />
  </div>
);

export default createFragmentContainer(Store, {
  store: graphql`
    fragment store_store on Store {
      videos(first: 2) {
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
});