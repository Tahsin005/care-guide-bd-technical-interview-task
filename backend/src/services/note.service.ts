import { Types, isValidObjectId } from 'mongoose';
import { INoteRepository, noteRepository } from '../repositories/note.repository';
import { INoteDocument, INote } from '../models/note.model';
import { AppError } from '../utils/app-error';

export interface CreateNoteDto {
  title: string;
  content: string;
}

export interface UpdateNoteDto {
  title?: string;
  content?: string;
}

export interface ListNotesQuery {
  page?: string | number;
  limit?: string | number;
}

export interface PaginatedNotesResult {
  notes: INoteDocument[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export class NoteService {
  constructor(private readonly noteRepo: INoteRepository = noteRepository) {}

  public async createNote(
    userId: string,
    dto: CreateNoteDto
  ): Promise<INoteDocument> {
    const { title, content } = dto;

    if (!title || !content) {
      throw AppError.badRequest('Title and content are required');
    }

    return this.noteRepo.create({
      title: title.trim(),
      content: content.trim(),
      owner: new Types.ObjectId(userId),
    });
  }

  public async listNotes(
    userId: string,
    userRole: string,
    query: ListNotesQuery
  ): Promise<PaginatedNotesResult> {
    const page = Math.max(1, parseInt(String(query.page || '1'), 10) || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(String(query.limit || '10'), 10) || 10)
    );
    const skip = (page - 1) * limit;

    const filter: Record<string, any> =
      userRole === 'admin' ? {} : { owner: new Types.ObjectId(userId) };

    const [notes, total] = await Promise.all([
      this.noteRepo.findPaginated(filter, skip, limit),
      this.noteRepo.count(filter),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return {
      notes,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  public async getNoteById(
    noteId: string,
    userId: string,
    userRole: string
  ): Promise<INoteDocument> {
    if (!isValidObjectId(noteId)) {
      throw AppError.badRequest('Invalid note ID');
    }

    const note = await this.noteRepo.findById(noteId);

    if (!note) {
      throw AppError.notFound('Note not found');
    }

    const ownerId = (note.owner as any)?._id
      ? (note.owner as any)._id.toString()
      : note.owner.toString();

    if (userRole !== 'admin' && ownerId !== userId) {
      throw AppError.forbidden('You do not have permission to access this note');
    }

    return note;
  }

  public async updateNote(
    noteId: string,
    userId: string,
    userRole: string,
    dto: UpdateNoteDto
  ): Promise<INoteDocument> {
    if (!isValidObjectId(noteId)) {
      throw AppError.badRequest('Invalid note ID');
    }

    if (dto.title === undefined && dto.content === undefined) {
      throw AppError.badRequest(
        'At least one field (title or content) must be provided for update'
      );
    }

    const existingNote = await this.noteRepo.findById(noteId);

    if (!existingNote) {
      throw AppError.notFound('Note not found');
    }

    const ownerId = (existingNote.owner as any)?._id
      ? (existingNote.owner as any)._id.toString()
      : existingNote.owner.toString();

    if (userRole !== 'admin' && ownerId !== userId) {
      throw AppError.forbidden('You do not have permission to update this note');
    }

    const updatePayload: Partial<INote> = {};

    if (dto.title !== undefined) {
      if (!dto.title.trim()) {
        throw AppError.badRequest('Title cannot be empty');
      }
      updatePayload.title = dto.title.trim();
    }

    if (dto.content !== undefined) {
      if (!dto.content.trim()) {
        throw AppError.badRequest('Content cannot be empty');
      }
      updatePayload.content = dto.content.trim();
    }

    const updated = await this.noteRepo.updateById(noteId, updatePayload);

    if (!updated) {
      throw AppError.notFound('Note not found');
    }

    return updated;
  }

  public async deleteNote(
    noteId: string,
    userId: string,
    userRole: string
  ): Promise<void> {
    if (!isValidObjectId(noteId)) {
      throw AppError.badRequest('Invalid note ID');
    }

    const existingNote = await this.noteRepo.findById(noteId);

    if (!existingNote) {
      throw AppError.notFound('Note not found');
    }

    const ownerId = (existingNote.owner as any)?._id
      ? (existingNote.owner as any)._id.toString()
      : existingNote.owner.toString();

    if (userRole !== 'admin' && ownerId !== userId) {
      throw AppError.forbidden('You do not have permission to delete this note');
    }

    await this.noteRepo.deleteById(noteId);
  }
}

export const noteService = new NoteService();
