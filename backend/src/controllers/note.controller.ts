import { Request, Response } from 'express';
import { NoteService, noteService } from '../services/note.service';
import { sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { AppError } from '../utils/app-error';

export class NoteController {
  constructor(private readonly service: NoteService = noteService) {}

  public createNote = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      const note = await this.service.createNote(req.user.userId, req.body);
      sendSuccess(res, note, 'Note created successfully', 201);
    }
  );

  public listNotes = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      const result = await this.service.listNotes(
        req.user.userId,
        req.user.role,
        req.query
      );

      sendSuccess(
        res,
        result.notes,
        'Notes retrieved successfully',
        200,
        result.pagination
      );
    }
  );

  public getNoteById = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      const note = await this.service.getNoteById(
        req.params.id as string,
        req.user.userId,
        req.user.role
      );

      sendSuccess(res, note, 'Note retrieved successfully', 200);
    }
  );

  public updateNote = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      const updated = await this.service.updateNote(
        req.params.id as string,
        req.user.userId,
        req.user.role,
        req.body
      );

      sendSuccess(res, updated, 'Note updated successfully', 200);
    }
  );

  public deleteNote = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      if (!req.user) {
        throw AppError.unauthorized('Authentication required');
      }

      await this.service.deleteNote(
        req.params.id as string,
        req.user.userId,
        req.user.role
      );

      sendSuccess(res, null, 'Note deleted successfully', 200);
    }
  );
}

export const noteController = new NoteController();
