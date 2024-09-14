import express, { Request, Response } from 'express';

const router = express.Router();

// 处理 Telegram 用户数据的 POST 请求
router.post('/api/telegram-user', (req: Request, res: Response) => {
    const userData = req.body;

    // 简单的日志记录，检查请求数据
    console.log('Received user data:', userData);

    // 返回成功响应
    res.status(200).json({
        message: 'User data received successfully',
        data: userData
    });
});

export default router;
