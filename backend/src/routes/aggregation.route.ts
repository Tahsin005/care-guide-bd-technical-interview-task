import { Router } from 'express';
import { aggregationController } from '../controllers/aggregation.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get(
  '/users/grouped-by-interests',
  aggregationController.getUsersGroupedByInterests
);
router.get(
  '/users/:userId/posts',
  aggregationController.getUserPosts
);

export default router;
