import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';

const Video = ({video}) => (
  <dl>
    <dt>Title</dt>
    <dd>{video.title}</dd>
    <dt>Duration</dt>
    <dd>{video.duration}</dd>
    <dt>Watched</dt>
    <dd>{video.watched ? "true" : "false"}</dd>
  </dl>
);

export default createFragmentContainer(Video, {
  video: graphql`
    fragment video_video on Video {
      title,
      duration,
      watched
    }
  `,
});