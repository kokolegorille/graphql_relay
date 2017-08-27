import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => "world"
    }
  })
});

export const schema = new GraphQLSchema({
  query: Query
});