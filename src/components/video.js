import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Video = ({video}) => (
  <div>
    <dl className="dl-horizontal">
      <dt>Internal ID</dt>
      <dd>{video.internalId}</dd>
      <dt>Title</dt>
      <dd>{video.title}</dd>
      <dt>Duration</dt>
      <dd>{video.duration}</dd>
      <dt>Watched</dt>
      <dd>{video.watched ? "true" : "false"}</dd>
    </dl>
  </div>
);

export default createFragmentContainer(Video, {
  video: graphql`
    fragment video_video on Video {
      internalId,
      title,
      duration,
      watched
    }
  `,
});