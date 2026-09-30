import { Router } from 'express';
import { healthController } from '../controllers/health.controller';

const router = Router();

router.get('/', healthController.checkHealth);
router.get('/live', healthController.checkLiveness);

export default router;
