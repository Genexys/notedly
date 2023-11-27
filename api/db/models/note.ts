import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  author: string;
}

const NoteSchema = new Schema<INote>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const NoteModel = mongoose.model<INote>('Note', NoteSchema);
