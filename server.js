import express from 'express';
import graphqlHTTP from 'express-graphql';

// import {schema} from './data/schema'; 
import schema from './data/schema'; 

const PORT = process.env.PORT || 8080;

const graphQLServer = express();

// GraphQL endpoint
graphQLServer.use('/graphql', graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
}));

// Client side
graphQLServer.use(express.static(__dirname + '/public'));

// Force all remaining to public/index.html
graphQLServer.get('/*', 
  (req, res) => res.sendFile(__dirname + '/public/index.html')
);

graphQLServer.listen(
  PORT, 
  () => console.log(`GraphQL server on localhost:${PORT}`)
);