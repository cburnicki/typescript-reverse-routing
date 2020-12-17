import express from 'express';
import { RouteRegistry } from '../src/RouteRegistry';
import { articleRouter, articleRoutes } from './article-routes';

const app = express();
app.use(articleRouter);

const registry = new RouteRegistry(app);
const baseRoutes = {
  healthCheck: registry.register('GET', ['health'], (req, res) => {
    return res.status(200);
  }),

  index: registry.register('GET', [], (req, res) => {
    return res.send(`<a href="${articleRoutes.getArticle.buildUri({ articleId: 'foo' }, {})}">Article Foo</a>`);
  }),
};

app.listen(8000, () => console.log('listening on :8000'));
