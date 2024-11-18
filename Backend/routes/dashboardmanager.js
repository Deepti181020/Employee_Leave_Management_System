const express = require('express')
const AuthMidleware = require('../Middleware/AuthMidleware')
const {getSummary} = require('../Controllers/dashboardController')

const route = express.Router();

route.get('/summary', AuthMidleware, getSummary )

module.exports = route;