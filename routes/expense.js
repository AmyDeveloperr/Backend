
const exp = require('constants');
const express = require('express');
// we are importing our middleware 
const userAuth = require('../middleware/auth');

const router = express.Router();

const expenseController = require('../controllers/expenses');

router.post('/add', userAuth.auth, expenseController.addExpense);


router.get('/get', userAuth.auth, expenseController.getExpenses);

router.delete('/delete-expense/:id', userAuth.auth, expenseController.deleteExpense);

router.get('/download',userAuth.auth, expenseController.downloadexpense);


module.exports = router;
