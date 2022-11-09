const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense', 'root', 'Simba12$', {
    dialect: 'mysql', 
    host:'localhost'
});

module.exports = sequelize;

