import { Schema, model, Document, Model, Types } from 'mongoose';

export interface INote {
  title: string;
  content: string;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface INoteDocument extends INote, Document {}

export interface INoteModel extends Model<INoteDocument> {}

const noteSchema = new Schema<INoteDocument, INoteModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, any>) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

noteSchema.index({ owner: 1, createdAt: -1 });
noteSchema.index({ _id: 1, owner: 1 });
noteSchema.index({ createdAt: -1 });

export const Note = model<INoteDocument, INoteModel>('Note', noteSchema);
