const { Pool } = require('pg');

const pool = new Pool({
    user: 'pablo.dias', //nome do seu usuário
    host: 'localhost', //local do host
    database: 'bd1', //nome do banco
    password: 'root', //senha do usuário postgresql
    port: 5432, //porta padrão do banco
});

module.exports = pool;
