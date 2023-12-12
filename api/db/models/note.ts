import mongoose, { Schema, Document } from 'mongoose';

export interface INote extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  favoriteCount: number;
  favoritedBy: mongoose.Types.ObjectId[];
}

const NoteSchema = new Schema<INote>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
    favoritedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const NoteModel = mongoose.model<INote>('Note', NoteSchema);
