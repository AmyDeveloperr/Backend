const Sequelize = require('sequelize');

const sequelize = new Sequelize('backend_project', 'root', 'Simba12$', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
