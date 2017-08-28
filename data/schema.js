import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql';

import {
  // Node interface
  fromGlobalId,
  nodeDefinitions,
  // Connection and globalId
  globalIdField,
  connectionDefinitions,
  connectionFromPromisedArray,
  connectionArgs,
  mutationWithClientMutationId
} from 'graphql-relay';

import {
  getVideoById,
  getVideos,
  createVideo,
  getObjectById
} from './database';

const {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    const {type, id} = fromGlobalId(globalId);
    return getObjectById(type.toLowerCase(), id);
  },
  (object) => {
    if (object.title) {
      return videoType
    };
    return null;
  }
)

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'The video type.',
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString,
      description: 'The title of the video.'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in secondes).'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Wether or not the viewer has watched the video.'
    }
  }),
  interfaces: [nodeInterface]
});

const {connectionType: VideoConnection} = connectionDefinitions({
  nodeType: videoType,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      description: 'Total count of the video on this connection.',
      resolve: conn => conn.edges.length
    }
  })
});

// Store entry point, can be anything
// usually called viewer
const storeType = new GraphQLObjectType({
  name: 'Store',
  description: 'The store query type.',
  fields: () => ({
    node: nodeField,
    videos: {
      type: VideoConnection,
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(
        getVideos(),
        args
      )
    },
    video: {
      type: videoType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of the video.'
        }
      },
      resolve: (_, args) => getVideoById(args.id)
    }
  })
});

const store = {};
const queryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query type.',
  fields: () => ({
    store: {
      type: storeType,
      resolve: () => store
    }
  })
});

const videoMutation = new mutationWithClientMutationId({
  name: 'AddVideo',
  inputFields: {
    title: {
      type: GraphQLString,
      description: 'The title of the video.'
    },
    duration: {
      type: GraphQLInt,
      description: 'The duration of the video (in secondes).'
    },
    watched: {
      type: GraphQLBoolean,
      description: 'Wether or not the viewer has watched the video.'
    }
  },
  outputFields: {
    video: {
      type: videoType
    }
  },
  mutateAndGetPayload: args => new Promise((resolve, reject) => {
    Promise.resolve(createVideo(args))
      .then(video => resolve({video}))
    .catch(reject);
  })
});

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type.',
  fields: () => ({
    createVideo: videoMutation
  })
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

export default schema;