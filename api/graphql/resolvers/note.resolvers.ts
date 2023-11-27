import { GraphQLResolveInfo } from 'graphql';
import { Model } from 'mongoose';
import type { Note } from '../../db/models/note';

const notes = [
  {
    id: '1',
    content: 'Buy milk',
    author: 'JK Rowling',
  },
  {
    id: '2',
    content: 'TypeScript course',
    author: 'Max',
  },
  {
    id: '3',
    content: 'GraphQL course',
    author: 'Max',
  },
];

export const noteResolvers = {
  Query: {
    notes: async (
      parent: any,
      args: Record<string, unknown>,
      contextValue: { models: { Note: Model<Note> } },
    ) => {
      return await contextValue.models.Note.find();
    },
    note: async (
      parent: any,
      args: Record<string, unknown>,
      { models }: Record<string, unknown>,
    ) => {
      // return await models.Note.findById(args.id);
    },
  },
  Mutation: {
    createNote: async (
      parent: any,
      { newNote: newNoteData }: Record<string, Record<string, unknown>>,
    ) => {
      console.log('🚀 ~ file: note.resolvers.ts:34 ~ createNote: ~ newNoteData:', newNoteData);
      // const newNote = new models.Note({
      //   content: String(newNoteData.content),
      //   author: String(newNoteData.author),
      // });
      // console.log('🚀 ~ file: note.resolvers.ts:38 ~ createNote: ~ newNote:', newNote);

      // await newNote.save();
      // return newNote;
    },
    updateNote: async (
      parent: any,
      { updateNoteData: { id, content } }: Record<string, Record<string, unknown>>,
    ) => {
      const note = notes.find((note) => note.id === id);

      if (!note) {
        throw new Error('Note not found');
      }

      note.content = String(content);

      return note;
    },
    deleteNote: async (parent: any, args: Record<string, unknown>) => {
      const noteIndex = notes.findIndex((note) => {
        return note.id === args.id;
      });

      if (noteIndex === -1) {
        throw new Error('Note not found');
      }

      notes.splice(noteIndex, 1);

      return notes;
    },
  },
};
