const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pablo',
  password: 'root',
  database: 'bd1',
});

module.exports = sequelize;