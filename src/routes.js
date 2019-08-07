const express = require('express');
const DevControllers = require('./controllers/DevController');
const LinkController = require('./controllers/LikeController');
const routes = express.Router();

routes.post('/devs', DevControllers.store);
routes.post('/devs/:devId/likes', LinkController.store);

module.exports = routes;
