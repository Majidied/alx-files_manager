import express from 'express';
import AppController from '../controllers/AppController';

/**
 * Sets up the routing for the controllers in the application.
 * @param {Object} app - The Express application object.
 */
function controllerRouting(app) {
  const router = express.Router();
  app.use('/', router);

  router.get('/status', (_req, res) => {
    res.status(200).send(AppController.getStatus());
  });

  router.get('/stats', (_req, res) => {
    res.status(200).send(AppController.getStats());
  });
}

export default controllerRouting;
