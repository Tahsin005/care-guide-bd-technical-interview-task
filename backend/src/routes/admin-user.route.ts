import { Router } from 'express';
import { adminUserController } from '../controllers/admin-user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/', adminUserController.listUsers);
router.post('/', adminUserController.createUser);
router.get('/:id', adminUserController.getUserById);
router.put('/:id', adminUserController.updateUser);
router.patch('/:id', adminUserController.updateUser);
router.delete('/:id', adminUserController.deleteUser);

export default router;
