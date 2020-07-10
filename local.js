const { ApolloServer } = require('apollo-server');

const { schema } = require('./graphql/schema.graphql');
const { resolvers } = require('./graphql/Resolver');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});