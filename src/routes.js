const express = require('express');

const routes = express.Router();

const AuthController = require('./controllers/AuthController');
const EventController = require('./controllers/EventController');
// const ParticipateController = require('./controllers/ParticipateController');
const UserController = require('./controllers/UserController');

// if (AuthController.tes)
routes.post('/authTest', AuthController.auth);

routes.get('/events', EventController.index);
routes.post('/events', EventController.store);
routes.delete('/events/:id', EventController.delete);
routes.post('/events/participate/:id', EventController.participate);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// routes.post('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/login', UserController.login);


module.exports = routes;
