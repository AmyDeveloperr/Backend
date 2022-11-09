const { json } = require('body-parser');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/signup', userController.addUserDetails); 
module.exports = router;