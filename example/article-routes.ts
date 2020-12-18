import express from 'express';
import { param } from '../src/Route';
import { RouteRegistry } from '../src/RouteRegistry';

export const articleRouter = express.Router();

const registry = new RouteRegistry(articleRouter);

export const getArticle = registry.register<{ articleId: string }, {}>(
  'GET',
  ['articles', param('articleId')],
  (req, res) => res.send(
      `<b>Article ${req.params.articleId}</b>\n<a href="${addArticle.buildUri({}, {})}">Add new article</a>`
  ),
);

export const addArticle = registry.register<{}, {}>(
    'POST', 
    ['articles'], 
    (req, res) => res.send('Added article ' + JSON.stringify(req.body)),
);
