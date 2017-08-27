import {
  fromGlobalId,
  nodeDefinitions
} from 'graphql-relay';

import {getObjectById} from './database';

import {videoType} from './schema';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id);
  },
  (object) => {
    
    console.log(videoType);
    
    if (object.title) {
      return videoType
    };
    return null;
  }
)

export {
  nodeInterface,
  nodeField
};
