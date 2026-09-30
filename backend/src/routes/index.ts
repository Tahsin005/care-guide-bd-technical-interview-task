import { Router } from 'express';
import healthRoutes from './health.route';
import authRoutes from './auth.route';
import noteRoutes from './note.route';
import adminUserRoutes from './admin-user.route';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);
router.use('/admin/users', adminUserRoutes);

export default router;
