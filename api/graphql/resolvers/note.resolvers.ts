import { GraphQLResolveInfo } from 'graphql';
import { Model } from 'mongoose';
import dateScalar from '../scalars/dateScalar';
import type { INote } from '../../db/models/note';

export const noteResolvers = {
  Date: dateScalar,
  Query: {
    notes: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      return await contextValue.models.Note.find();
    },
    note: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      return await contextValue.models.Note.findById(args.id);
    },
  },
  Mutation: {
    createNote: async (
      parent: any,
      { newNote: newNoteData }: Record<string, Record<string, unknown>>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      const newNote = new contextValue.models.Note({
        content: String(newNoteData.content),
        author: String(newNoteData.author),
      });

      await newNote.save();
      return newNote;
    },
    updateNote: async (
      parent: any,
      { updateNote: { id, content } }: Record<string, Record<string, unknown>>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      return await contextValue.models.Note.findByIdAndUpdate(id, { content });
    },
    deleteNote: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<INote> } },
    ) => {
      await contextValue.models.Note.findByIdAndDelete(args.id)
        .then((result) => {
          if (!result) {
            throw new Error('Note not found');
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
};
