import mongoose, { Schema, Document, Model } from 'mongoose';

interface INote extends Document {
  _id: mongoose.Types.ObjectId;
  content: string;
  author: string;
}

const NoteSchema = new Schema(
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

export type Note = {
  _id: mongoose.Types.ObjectId;
  content: string;
  author: string;
};

export const NoteModel: Model<INote> = mongoose.model<INote>('Note', NoteSchema);
