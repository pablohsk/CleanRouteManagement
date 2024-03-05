const { Pool } = require('pg');

// Configurações da conexão com o PostgreSQL
const pool = new Pool({
    user: 'seu-usuario',
    host: 'localhost',
    database: 'nome-do-seu-banco-de-dados',
    password: 'sua-senha',
    port: 5432,
});

// Testar a conexão
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erro na conexão com o PostgreSQL', err);
    } else {
        console.log('Conexão com o PostgreSQL estabelecida em', res.rows[0].now);
    }
    pool.end();
});
