import express from 'express';
import cors from 'cors';  // 导入 cors 中间件
import bodyParser from 'body-parser';
import telegramUserRouter from './routes/telegram-user';

const app = express();

// 使用 CORS 中间件
app.use(cors({
    origin: 'https://taskcenter.framer.website',  // 允许的源，确保替换为你的前端网址
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());

// 路由
app.use('/api/telegram-user', telegramUserRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
