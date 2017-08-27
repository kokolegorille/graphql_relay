import express from 'express';
import graphqlHTTP from 'express-graphql';

import {schema} from './data/schema'; 

const GRAPHQL_PORT = 8080;

const graphQLServer = express();

// GraphQL endpoint
graphQLServer.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
}));

// Client side
// graphQLServer.use(express.static('public'));

graphQLServer.listen(
  GRAPHQL_PORT, 
  () => console.log(`GraphQL server on localhost:${GRAPHQL_PORT}`)
);