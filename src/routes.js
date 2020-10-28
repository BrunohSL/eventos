const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController');
const EventController = require('./controllers/EventController');
const UserController = require('./controllers/UserController');

routes.post('/users/store', UserController.store);
routes.post('/login', UserController.login);

// routes.use(AuthController.auth);

routes.get('/events', EventController.index);
routes.post('/events/store', EventController.store);
routes.post('/events/update/:id', EventController.update);
routes.delete('/events/:id', EventController.delete);
routes.post('/events/participate/:id', EventController.participate);
routes.post('/events/quit/:id', EventController.quitEvent);

routes.get('/users', UserController.index);
routes.post('/users/store', UserController.store);
routes.post('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;
