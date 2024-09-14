import { Router } from 'express';
import { syncController } from '../../controllers/syncController';

const router = Router();

router.post('/api/telegram-user', syncController);

export default router;
