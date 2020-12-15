import express from 'express';
import { RegisteredRoute } from '../src/RegisteredRoute';
import { param } from '../src/Route';

const app = express();

const getArtikel = new RegisteredRoute<{ articleId: string }, {}>(
  app,
  'GET',
  ['articles', param('articleId')],
  (req, res) => {
    res.send(`<b>${req.params.articleId}</b>`);
    return res;
  },
);

export const ROUTES = {
  getArtikel,
};

app.listen(8000, () => console.log('listening on :8000'));
