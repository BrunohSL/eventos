const express = require('express');

const routes = express.Router();

const EventController = require('./controllers/EventController');
const ParticipateController = require('./controllers/ParticipateController');
const UserController = require('./controllers/UserController');

routes.get('/events', EventController.index);
routes.post('/events', EventController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// routes.post('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/teste', UserController.teste);

routes.post('/participate/:id', ParticipateController.participate);

module.exports = routes;
