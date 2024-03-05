// my-node-project/routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Lista de Usuários');
});

router.post('/', (req, res) => {
    res.send('Novo Usuário Criado');
});

module.exports = router;