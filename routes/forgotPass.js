const express = require('express');

const router = express.Router();

const forgotPassController = require('../controllers/forgotPass');

router.post('/forgotpassword', forgotPassController.forgotPassword );

router.get('/resetpassword/:id', forgotPassController.resetpassword);

router.get('/updatepassword/:resetpasswordid', forgotPassController.updatepassword);

module.exports = router;