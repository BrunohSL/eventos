const express = require('express');

const routes = express();

const AuthController = require('./controllers/AuthController');
const EventController = require('./controllers/EventController');
const ParticipateController = require('./controllers/ParticipateController');
const UserController = require('./controllers/UserController');

// routes.post('/authTest', AuthController.auth);

routes.get('/events', AuthController.auth, EventController.index);
routes.post('/events', AuthController.auth, EventController.store);

routes.get('/users', AuthController.auth, UserController.index);
routes.post('/users', AuthController.auth, UserController.store);
// routes.post('/users', UserController.update);
routes.delete('/users/:id', AuthController.auth, UserController.delete);

routes.post('/login', AuthController.auth, UserController.login);

routes.post('/participate/:id', AuthController.auth, ParticipateController.participate);

module.exports = routes;
