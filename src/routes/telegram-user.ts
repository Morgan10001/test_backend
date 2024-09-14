import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const userData = req.body;

    if (userData) {
        // 在这里处理用户数据
        res.json({
            message: 'User data received successfully',
            data: userData
        });
    } else {
        res.status(400).json({
            message: 'No user data provided'
        });
    }
});

export default router;
