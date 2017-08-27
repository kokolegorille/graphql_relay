import React from 'react';

const PageInfo = ({
  hasPreviousPage,
  hasNextPage,
  startCursor,
  endCursor
  }) => (
  <dl>
    <dt>Has previous page</dt>
    <dd>{hasPreviousPage ? "true" : "false"}</dd>
    <dt>Has next page</dt>
    <dd>{hasNextPage ? "true" : "false"}</dd>
    <dt>Start cursor</dt>
    <dd>{startCursor}</dd>
    <dt>End cursor</dt>
    <dd>{endCursor}</dd>
  </dl>
);

export default PageInfo;