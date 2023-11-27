import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
  email: string;
  notes: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    notes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Note',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
