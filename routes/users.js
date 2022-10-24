const path = require('path');

const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.post('/user/add-user', usersController.addUser);

router.get('/user/get-users', usersController.getUser);

router.delete('/user/delete-user/:id', usersController.deleteUser);

module.exports = router;