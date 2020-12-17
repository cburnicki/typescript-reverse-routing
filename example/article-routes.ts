import express from 'express';
import { param } from '../src/Route';
import { RouteRegistry } from '../src/RouteRegistry';

export const articleRouter = express.Router();

const registry = new RouteRegistry(articleRouter);
export const articleRoutes = {
  getArticle: registry.register<{ articleId: string }, {}>('GET', ['articles', param('articleId')], (req, res) => {
    return res.send(`<b>Article ${req.params.articleId}</b>`);
  }),
  addArticle: registry.register<{}, {}>('POST', ['articles'], (req, res) => {
    return res.send('Added article ' + JSON.stringify(req.body));
  }),
};
