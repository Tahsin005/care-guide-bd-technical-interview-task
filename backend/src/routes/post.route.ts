import { Router } from 'express';
import { postController } from '../controllers/post.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, postController.createPost);
router.get('/', postController.listPosts);

export default router;
