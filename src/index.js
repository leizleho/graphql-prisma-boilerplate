import { GraphQLServer, PubSub } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';
import * as resolvers from './resolvers';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    pubsub,
    prisma
  })
});

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up!');
});
