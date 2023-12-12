import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { GraphQLError } from 'graphql';
import { IUser } from '../../db/models/user';

export const userResolvers = {
  Query: {
    user: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { User: Model<IUser> } },
    ) => {
      if (!args.username) {
        throw new GraphQLError('Please provide a username');
      }

      return await contextValue.models.User.findOne({ username: args.username });
    },
    users: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { User: Model<IUser> } },
    ) => {
      return await contextValue.models.User.find().limit(100);
    },
    me: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { User: Model<IUser> }; user: IUser },
    ) => {
      if (!contextValue.user) {
        throw new GraphQLError('Not authenticated');
      }

      return await contextValue.models.User.findById(contextValue.user.id);
    },
  },
  Mutation: {
    signIn: async (
      parent: any,
      { loginUser: { email, password } }: Record<string, Record<string, string>>,
      contextValue: { models: { User: Model<IUser> } },
    ) => {
      const user = await contextValue.models.User.findOne({ email });

      if (!user) {
        throw new GraphQLError('User not found');
      }

      const isEqual = await bcrypt.compare(password, user.password);

      if (!isEqual) {
        throw new GraphQLError('Password is incorrect');
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      );

      return token;
    },
    signUp: async (
      parent: any,
      { newUser: { username, email, password } }: Record<string, Record<string, string>>,
      contextValue: { models: { User: Model<IUser> } },
    ) => {
      if (!username || !email || !password) {
        throw new GraphQLError('Please provide username, email and password');
      }

      if (password.length < 6) {
        throw new GraphQLError('Password must be at least 6 characters long');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        throw new GraphQLError('Invalid email address');
      }

      const usernameRegex = /^[a-zA-Z0-9]+$/;

      if (!usernameRegex.test(username)) {
        throw new GraphQLError('Invalid username');
      }

      email = email.trim().toLowerCase();
      const emailExists = await contextValue.models.User.findOne({ email });
      const user = await contextValue.models.User.findOne({ email });

      if (user || emailExists) {
        throw new GraphQLError('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new contextValue.models.User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' },
      );

      return token;
    },
  },
  User: {
    notes: async (
      user: IUser,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<any> } },
    ) => {
      return await contextValue.models.Note.find({ author: user.id }).sort({
        _id: -1,
      });
    },
    favorites: async (
      user: IUser,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<any> } },
    ) => {
      return await contextValue.models.Note.find({ favoritedBy: user.id }).sort({
        _id: -1,
      });
    },
  },
};
