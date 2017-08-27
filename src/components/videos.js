import React from 'react';
// import { createFragmentContainer, graphql } from 'react-relay';

import Video from './video';
import PageInfo from './page_info';

const Videos = ({videos}) => (
  <div>
    <ul>
      {
        videos.edges.map(
          edge => <Video key={edge.node.id} video={edge.node} />
        )
      }
    </ul>
      
    <PageInfo {...videos.pageInfo} />

    <dl>
      <dt>Total Count</dt>
      <dd>{videos.totalCount}</dd>
    </dl>    
  </div>  
);

export default Videos;