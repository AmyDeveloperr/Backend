const { json } = require('body-parser');
const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.addUserDetails); 

router.post('/login', userController.addLoginDetails);

module.exports = router;