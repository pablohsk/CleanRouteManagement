const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para listar clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await clientesController.listarClientes();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar clientes.');
    }
});

// Rota para cadastrar cliente
router.post('/', async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
    
    try {
        const novoCliente = await clientesController.cadastrarCliente(nome, email, telefone, coordenada_x, coordenada_y);
        res.status(201).json(novoCliente);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar cliente.');
    }
});

// Rota para atualizar coordenadas
router.put('/:id', async (req, res) => {
    const clienteId = req.params.id;
    const { coordenada_x, coordenada_y } = req.body;

    try {
        const clienteAtualizado = await clientesController.atualizarCoordenadas(clienteId, coordenada_x, coordenada_y);
        res.json(clienteAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar coordenadas do cliente.');
    }
});

// Rota para calcular rota
router.get('/rota', async (req, res) => {
    try {
        const rotaCalculada = await clientesController.calcularRota();
        res.json(rotaCalculada);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao calcular rota.');
    }
});

module.exports = router;
