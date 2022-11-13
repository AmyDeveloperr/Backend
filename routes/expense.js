
const exp = require('constants');
const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expenses');

router.post('/add', expenseController.addExpense);

router.get('/get', expenseController.getExpenses);

router.delete('/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;
