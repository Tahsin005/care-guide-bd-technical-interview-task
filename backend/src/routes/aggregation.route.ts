import { Router } from 'express';
import { aggregationController } from '../controllers/aggregation.controller';

const router = Router();

router.get(
  '/users/grouped-by-interests',
  aggregationController.getUsersGroupedByInterests
);
router.get(
  '/users/:userId/posts',
  aggregationController.getUserPosts
);

export default router;
