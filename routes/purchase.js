
const express = require('express');

const userAuth = require('../middleware/auth');

const purchaseController = require('../controllers/purchase');

const router = express.Router();

router.get('/premiummembership', userAuth.auth, purchaseController.purchasePremium);

router.post('/updatetransactionstatus', userAuth.auth, purchaseController.updateTransactionStatus);

module.exports = router;