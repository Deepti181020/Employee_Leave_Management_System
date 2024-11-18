const express = require('express');
const Authmidleware = require('../Middleware/AuthMidleware');
const { addLeave,getLeave,getLeaves, getLeaveDetail ,updateLeave } = require('../Controllers/leaveController');

const route = express.Router();
route.post('/add',Authmidleware,addLeave)
route.get('/detail/:id',Authmidleware,getLeaveDetail)
route.get('/:id/:role',Authmidleware,getLeave)
route.get('/',Authmidleware, getLeaves)
route.put('/:id',Authmidleware,updateLeave)


module.exports = route;