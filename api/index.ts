import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Model } from 'mongoose';
import { typeDefs, resolvers } from './graphql';
import { NoteModel } from './db/models/note';
import type { Note } from './db/models/note';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../.env'),
});

interface MyContext {
  models: {
    Note: Model<Note>;
  };
}

const PORT = process.env.PORT || 3000;
const DB = process.env.DB_HOST || 'localhost';

const app = express();
const httpServer = http.createServer(app);

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
        context: async ({ req }): Promise<MyContext> => ({
          models: {
            Note: NoteModel,
          },
        }),
      }),
    );

    await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
};

startApolloServer();
