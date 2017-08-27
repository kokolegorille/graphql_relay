import React from 'react';

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

export default Video;