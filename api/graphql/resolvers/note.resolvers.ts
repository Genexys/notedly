import { GraphQLError } from 'graphql';
import mongoose, { Model } from 'mongoose';

import type { INote } from '../../db/models/note';
import { IUser } from '../../db/models/user';
import dateScalar from '../scalars/dateScalar';

export const noteResolvers = {
  Date: dateScalar,
  Query: {
    notes: async (
      parent: unknown,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      return await contextValue.models.Note.find().limit(100);
    },
    note: async (
      parent: unknown,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      return await contextValue.models.Note.findById(args.id);
    },
    noteFeed: async (
      parent: unknown,
      { cursor }: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      const limit = 10;
      let hasNextPage = false;
      let cursorQuery = {};

      if (cursor) {
        cursorQuery = { _id: { $lt: cursor } };
      }

      let notes = await contextValue.models.Note.find(cursorQuery)
        .sort({ _id: -1 })
        .limit(limit + 1);

      if (notes.length > limit) {
        hasNextPage = true;
        notes = notes.slice(0, -1);
      }

      const newCursor = notes[notes.length - 1]._id;

      return {
        notes,
        cursor: newCursor,
        hasNextPage,
      };
    },
  },
  Mutation: {
    createNote: async (
      parent: unknown,
      { newNote: newNoteData }: Record<string, Record<string, unknown>>,
      contextValue: { models: { Note: Model<INote> }; user: IUser },
    ) => {
      if (!contextValue.user) {
        throw new GraphQLError('You must be authenticated to create a note');
      }

      const authorId =
        typeof contextValue.user.id === 'string'
          ? new mongoose.Types.ObjectId(contextValue.user.id)
          : contextValue.user.id;

      const newNote = new contextValue.models.Note({
        content: String(newNoteData.content),
        author: authorId,
      });

      await newNote.save();
      return newNote;
    },
    updateNote: async (
      parent: unknown,
      { updateNote: { id, content } }: Record<string, Record<string, unknown>>,
      contextValue: { models: { Note: Model<INote> }; user: IUser },
    ) => {
      if (!contextValue.user) {
        throw new GraphQLError('You must be authenticated to create a note');
      }

      const note = await contextValue.models.Note.findById(id);

      if (note && note.author.toString() !== contextValue.user.id) {
        throw new GraphQLError('You do not have permission to delete this note');
      }

      return await contextValue.models.Note.findByIdAndUpdate(id, { content }, { new: true });
    },
    deleteNote: async (
      parent: unknown,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> }; user: IUser },
    ) => {
      if (!contextValue.user) {
        throw new GraphQLError('You must be authenticated to create a note');
      }

      const note = await contextValue.models.Note.findById(args.id);

      if (note && note.author.toString() !== contextValue.user.id) {
        throw new GraphQLError('You do not have permission to delete this note');
      }

      await contextValue.models.Note.findByIdAndDelete(args.id)
        .then((result) => {
          if (!result) {
            throw new Error('Note not found');
          }

          return true;
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    toggleFavorite: async (
      parent: unknown,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> }; user: IUser },
    ) => {
      if (!contextValue.user) {
        throw new GraphQLError('You must be authenticated to create a note');
      }

      const noteCheck = await contextValue.models.Note.findById(args.id);
      const hasUser = noteCheck?.favoritedBy.indexOf(contextValue.user.id);

      if (hasUser === -1) {
        return await contextValue.models.Note.findByIdAndUpdate(
          args.id,
          {
            $addToSet: { favoritedBy: contextValue.user.id },
            $inc: { favoriteCount: 1 },
          },
          { new: true },
        );
      } else {
        return await contextValue.models.Note.findByIdAndUpdate(
          args.id,
          {
            $pull: { favoritedBy: contextValue.user.id },
            $inc: { favoriteCount: -1 },
          },
          { new: true },
        );
      }
    },
  },
  Note: {
    author: async (
      note: INote,
      args: Record<string, unknown>,
      contextValue: { models: { User: Model<IUser> } },
    ) => {
      return await contextValue.models.User.findById(note.author);
    },
    favoritedBy: async (
      note: INote,
      args: Record<string, unknown>,
      contextValue: { models: { User: Model<IUser> } },
    ) => {
      return await contextValue.models.User.find({ _id: { $in: note.favoritedBy } });
    },
  },
};
