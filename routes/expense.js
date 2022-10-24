const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

router.post('/expense/add-expense', expenseController.addExpense);

router.get('/expense/get-expense', expenseController.getExpense);

router.delete('/expense/delete-expense/:id', expenseController.deleteExpense);

module.exports = router;