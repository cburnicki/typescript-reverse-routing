import express from 'express';
import { articleRouter } from './article-routes';

const app = express();
app.use(articleRouter);

app.listen(8000, () => console.log('listening on :8000'));
