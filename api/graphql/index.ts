import { readFileSync } from 'fs';
import path from 'path';
import { noteResolvers } from './resolvers/note.resolvers';

const noteTypes = readFileSync(path.join(__dirname, './typeDefs/note.graphql'), {
  encoding: 'utf-8',
});

export const typeDefs = `#graphql
  ${noteTypes}
`;

export const resolvers = {
  Query: {
    ...noteResolvers.Query,
  },
  Mutation: {
    ...noteResolvers.Mutation,
  },
};
