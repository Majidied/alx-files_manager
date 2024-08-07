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
    AppController.getStatus(_req, res);
  });

  router.get('/stats', (_req, res) => {
    AppController.getStats(_req, res);
  });

  router.post('/users', (req, res) => {
    AppController.postNew(_req, res);
  });
}

export default controllerRouting;
