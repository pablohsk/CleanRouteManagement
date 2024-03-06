const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bd1', 'seu_usuario', 'sua_senha', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;