const { ApolloServer } = require('apollo-server-lambda');

const { schema } = require('./graphql/schema.graphql');
const { resolvers } = require('./graphql/Resolver');


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

module.exports = {
  server,
};