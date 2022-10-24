const Sequelize = require('sequelize');

const sequelize = require('../util/database');
const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expenseAmount: {
        type: Sequelize.INTEGER,
    },

    expenseDescription: {
        type: Sequelize.STRING,
    },
    expenseCategory: {
        type: Sequelize.STRING
    }
})

module.exports = Expense;