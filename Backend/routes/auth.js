const express = require('express');
const { UserLogin,verify } = require('../Controllers/AuthController');
const Authmidleware = require('../Middleware/AuthMidleware');

const route = express.Router();

route.post('/login-page' , UserLogin);
route.get('/verify',Authmidleware,verify);

module.exports = route;