// index.js
const { ApolloServer } = require('apollo-server-lambda');
const { server } = require('./server');

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false,
  },
  endpointURL: '/graphql',
});