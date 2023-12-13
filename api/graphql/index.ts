import { readFileSync } from 'fs';
import path from 'path';

import { noteResolvers } from './resolvers/note.resolvers';
import { userResolvers } from './resolvers/user.resolvers';

const noteTypes = readFileSync(path.join(__dirname, './typeDefs/note.graphql'), {
  encoding: 'utf-8',
});

const userTypes = readFileSync(path.join(__dirname, './typeDefs/user.graphql'), {
  encoding: 'utf-8',
});

export const typeDefs = `#graphql
  scalar Date
  
  ${noteTypes}
  ${userTypes}
`;

export const resolvers = {
  Query: {
    ...noteResolvers.Query,
    ...userResolvers.Query,
  },
  Mutation: {
    ...noteResolvers.Mutation,
    ...userResolvers.Mutation,
  },
  User: {
    ...userResolvers.User,
  },
  Note: {
    ...noteResolvers.Note,
  },
};
