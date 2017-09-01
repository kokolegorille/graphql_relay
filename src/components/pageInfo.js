import React from 'react';

const PageInfo = ({pageInfo}) => (
  <dl className="dl-horizontal">
    <dt>Has previous page</dt>
    <dd>{pageInfo.hasPreviousPage ? "true" : "false"}</dd>
    <dt>Has next page</dt>
    <dd>{pageInfo.hasNextPage ? "true" : "false"}</dd>
    <dt>Start cursor</dt>
    <dd>{pageInfo.startCursor}</dd>
    <dt>End cursor</dt>
    <dd>{pageInfo.endCursor}</dd>
  </dl>
);

export default PageInfo;