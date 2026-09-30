import { Router } from 'express';
import healthRoutes from './health.route';
import authRoutes from './auth.route';
import noteRoutes from './note.route';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/notes', noteRoutes);

export default router;
