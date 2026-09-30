import { Router } from 'express';
import { noteController } from '../controllers/note.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.post('/', noteController.createNote);
router.get('/', noteController.listNotes);
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.patch('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

export default router;
