import { Note, INote, INoteDocument } from '../models/note.model';

export interface INoteRepository {
  create(noteData: Partial<INote>): Promise<INoteDocument>;
  findById(id: string): Promise<INoteDocument | null>;
  findPaginated(
    filter: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<INoteDocument[]>;
  count(filter: Record<string, any>): Promise<number>;
  updateById(
    id: string,
    updateData: Partial<INote>
  ): Promise<INoteDocument | null>;
  deleteById(id: string): Promise<INoteDocument | null>;
}

export class NoteRepository implements INoteRepository {
  public async create(noteData: Partial<INote>): Promise<INoteDocument> {
    const note = await Note.create(noteData);
    return note.populate('owner', 'name email');
  }

  public async findById(id: string): Promise<INoteDocument | null> {
    return Note.findById(id).populate('owner', 'name email').exec();
  }

  public async findPaginated(
    filter: Record<string, any>,
    skip: number,
    limit: number
  ): Promise<INoteDocument[]> {
    return Note.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('owner', 'name email')
      .exec();
  }

  public async count(filter: Record<string, any>): Promise<number> {
    return Note.countDocuments(filter).exec();
  }

  public async updateById(
    id: string,
    updateData: Partial<INote>
  ): Promise<INoteDocument | null> {
    return Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate('owner', 'name email')
      .exec();
  }

  public async deleteById(id: string): Promise<INoteDocument | null> {
    return Note.findByIdAndDelete(id).exec();
  }
}

export const noteRepository = new NoteRepository();
