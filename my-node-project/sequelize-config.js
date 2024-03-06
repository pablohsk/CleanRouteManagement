const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'seu-usuario',
  password: 'sua-senha',
  database: 'seu-banco-de-dados',
});

module.exports = sequelize;