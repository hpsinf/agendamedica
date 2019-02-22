'use strict'

const express = require('express');
const userRoute = express.Router();
const controller = require('../controllers/user');
const auth = require('../../services/auth');

userRoute.get('/', auth.authorize, controller.get);
userRoute.get('/:email/:password/auth', controller.getAuth);
userRoute.post('/:name/:email/:password/create', controller.post);

module.exports = userRoute;
