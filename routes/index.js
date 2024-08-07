import express from 'express';
import AppController from '../controllers/AppController';

function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/status', (req, res) => {
    res.status(200).send(AppController.getStatus());
  });

  router.get('/stats', (req, res) => {
    res.status(200).send(AppController.getStats());
  });
}

export default controllerRouting;
