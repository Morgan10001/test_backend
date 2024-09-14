import express from 'express';
import telegramUserRoutes from './telegram-user';

const router = express.Router();

// 使用 /api/telegram-user 路由
router.use(telegramUserRoutes);

export default router;
