const express = require('express');
const routes = express.Router()
const Usuario = require('./controllers/usuarios.controllers')


routes.get('/', Usuario.index);
routes.post('/api/users', Usuario.create);
routes.get('/api/users', Usuario.index);
routes.get('/api/users.details/:_id', Usuario.details);
routes.delete('/api/users/:_id', Usuario.delete);
routes.put('/api/users', Usuario.update);
routes.post('/api/users/login', Usuario.login);

module.exports = routes;


