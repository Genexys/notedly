import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import { typeDefs, resolvers } from './graphql';
import { NoteModel } from './db/models/note';
import { UserModel } from './db/models/user';
import type { INote } from './db/models/note';
import type { IUser } from './db/models/user';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

interface MyContext {
  models: {
    Note: Model<INote>;
    User: Model<IUser>;
  };
}

const PORT = process.env.PORT || 3000;
const DB = process.env.DB_HOST || 'localhost';

const app = express();
const httpServer = http.createServer(app);

const getUser = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };

    const user = await UserModel.findById(userId);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    new Error('Not authenticated');
  }
};

const startApolloServer = async () => {
  try {
    await mongoose
      .connect(DB)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });

    const server = new ApolloServer<MyContext>({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(
      '/api',
      expressMiddleware(server, {
        context: async ({ req }): Promise<MyContext> => {
          const token = req.headers.authorization;
          const user = await getUser(token);

          // if (!user) {
          //   throw new GraphQLError('Not authenticated', {
          //     extensions: {
          //       code: 'UNAUTHORIZED',
          //     },
          //   });
          // }

          return {
            models: {
              Note: NoteModel,
              User: UserModel,
            },
          };
        },
      }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
};

startApolloServer();
