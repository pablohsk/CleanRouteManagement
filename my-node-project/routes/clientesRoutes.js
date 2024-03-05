const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

router.get('/', clientesController.listarClientes);
router.post('/', clientesController.cadastrarCliente);
router.put('/:id', clientesController.atualizarCoordenadas);
router.get('/rota', clientesController.calcularRota);

module.exports = router;