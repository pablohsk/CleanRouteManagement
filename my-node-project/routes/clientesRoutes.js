const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Rota para listar clientes
router.get('/', (req, res) => {
    clientesController.listarClientes(req, res);
});

// Rota para cadastrar cliente
router.post('/', async (req, res) => {
    try {
        await clientesController.salvarCliente(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar cliente.');
    }
});

// Rota para atualizar coordenadas
router.put('/:id', async (req, res) => {
    try {
        const clienteAtualizado = await clientesController.atualizarCoordenadas(req.params.id, req.body.coordenada_x, req.body.coordenada_y);
        res.json(clienteAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar coordenadas do cliente.');
    }
});

// Rota para calcular rota com clientes específicos
router.get('/rota', async (req, res) => {
    try {
        // Obtendo os IDs dos clientes da solicitação (assumindo que são passados como parâmetros na URL)
        const clienteIDs = req.query.clienteIDs;

        // Verificando se os IDs dos clientes foram fornecidos
        if (!clienteIDs) {
            return res.status(400).json({ error: 'IDs de clientes não fornecidos.' });
        }

        // Convertendo os IDs de string para array
        const clientesIdsInt = clienteIDs.split(',').map(id => parseInt(id, 10));

        // Obtendo a lista de clientes com base nos IDs fornecidos
        const clientes = await clientesController.obterClientesPorIDs(clientesIdsInt);

        // Calculando a rota otimizada com base na lista de clientes
        const rotaCalculada = await clientesController.calcularRotaOtimizada(clientes);

        // Enviando a resposta JSON
        res.json(rotaCalculada);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao calcular rota.');
    }
});

// Rota para filtrar clientes com base nas informações cadastradas
router.get('/filtrar', async (req, res) => {
    try {
        const filtro = req.query.filtro;

        // Se 'filtro' não estiver presente nos parâmetros de consulta, retorne um erro
        if (!filtro) {
            return res.status(400).json({ error: 'Parâmetro "filtro" ausente na consulta.' });
        }

        // Chame a função para filtrar clientes por nome, email ou telefone
        const clientesFiltrados = await clientesController.filtrarClientes(filtro);

        // Retorne os clientes encontrados
        res.json(clientesFiltrados);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao filtrar clientes.');
    }
});

// Rota para deletar um cliente
router.delete('/:id', async (req, res) => {
    try {
        const clienteDeletado = await clientesController.deletarCliente(req.params.id);
        res.json(clienteDeletado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao deletar cliente.');
    }
});

router.get('/rota', async (req, res) => {
    try {
      // Obter os IDs dos clientes da query de requisição
      const clienteIDs = req.query.clienteIDs.split(',');
      
      // Chamar a função do backend para calcular a rota otimizada
      const response = await calcularRotaOtimizada(clienteIDs);
  
      // Retornar a resposta com a rota otimizada
      res.json(response);
    } catch (error) {
      // Em caso de erro, retornar uma resposta de erro
      console.error('Erro ao calcular a rota:', error);
      res.status(500).json({ error: 'Erro ao calcular a rota' });
    }
  });

module.exports = router;