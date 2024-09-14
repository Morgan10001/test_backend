import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // 引入 cors
import routes from './routes';

const app = express();

// 使用 cors 中间件
app.use(cors({
    origin: 'https://taskcenter.framer.website', // 允许的源地址
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // 允许的方法
    allowedHeaders: 'Content-Type,Authorization' // 允许的请求头
}));

app.use(bodyParser.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
