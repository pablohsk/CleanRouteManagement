const clientesModel = require('../models/clientesModel');
const {salvarClienteModel} = require('../models/clientesModel')
const {listarClientesModel} = require('../models/clientesModel');
const {atualizarCoordenadasModel} = require('../models/clientesModel');
const { Cliente, sequelize, Sequelize } = require('../models/clientesModel');
const { Op } = require('sequelize');

const listarClientes = async (req, res) => {
    try {
        const clientes = await listarClientesModel();
        return res.json(clientes);
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        return res.status(500).json({ error: 'Erro ao listar clientes' });
    }
};

const salvarCliente = async (req, res) => {
    console.log('Body da requisição clientesController:', req.body);

    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

    try {
        const novoCliente = await salvarClienteModel(nome, email, telefone, coordenada_x, coordenada_y);
        res.json(novoCliente);
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
};

const atualizarCoordenadas = async (id, coordenada_x, coordenada_y) => {
    try {
        const clienteAtualizado = await atualizarCoordenadasModel(id, coordenada_x, coordenada_y);
        return clienteAtualizado;
    } catch (error) {
        console.error('Erro ao atualizar coordenadas do cliente:', error);
        throw new Error('Erro ao atualizar coordenadas do cliente');
    }
};

const calcularRotaOtimizada = async (clientes) => {
  const calcularDistancia = (cliente1, cliente2) => {
    const deltaX = cliente1.coordenada_x - cliente2.coordenada_x;
    const deltaY = cliente1.coordenada_y - cliente2.coordenada_y;
    return Math.sqrt(deltaX ** 2 + deltaY ** 2);
  };

  const calcularCustoTotal = (rota) => {
    let custoTotal = 0;
    for (let i = 0; i < rota.length - 1; i++) {
      custoTotal += calcularDistancia(rota[i], rota[i + 1]);
    }
    custoTotal += calcularDistancia(rota[rota.length - 1], { coordenada_x: 0, coordenada_y: 0 });
    return custoTotal * 7; // Custo considerando R$7,00 por unidade de distância
  };

  const calcularProximidade = (cliente) => {
    return calcularDistancia(cliente, { coordenada_x: 0, coordenada_y: 0 });
  };

  // Ordenar os clientes pela proximidade ao ponto de partida
  const clientesOrdenados = clientes.slice().sort((a, b) => calcularProximidade(a) - calcularProximidade(b));

  const melhorRota = [ { coordenada_x: 0, coordenada_y: 0 }, ...clientesOrdenados ];

  const custoTotal = calcularCustoTotal(melhorRota);

  const nomesMelhorRota = melhorRota.map((cliente) => cliente.nome);
  
  return { 
    rota: `A melhor rota será: ${nomesMelhorRota.join(' -> ')} e o custo total será de: R$${custoTotal.toFixed(2)}`,
    custo: custoTotal,
    clientesOrdenados: clientesOrdenados.map((cliente) => cliente),
  };
};

const obterClientesPorIDs = async (clienteIDs) => {
    try {
        const clientes = await Cliente.findAll({
            where: {
                id: clienteIDs
            }
        });
        return clientes;
    } catch (error) {
        console.error('Erro ao obter clientes por IDs:', error);
        throw error;
    }
};

async function filtrarClientes(filtro) {
    try {
      const clientesFiltrados = await Cliente.findAll({
        where: {
          [Op.or]: [
            { nome: { [Op.iLike]: `%${filtro}%` } },
            { email: { [Op.iLike]: `%${filtro}%` } },
            { telefone: { [Op.iLike]: `%${filtro}%` } },
          ],
        },
      });

      console.log('Clientes filtrados:', clientesFiltrados);
  
      return clientesFiltrados;
    } catch (error) {
      throw error;
    }
  }

const deletarCliente = async (id) => {
    try {
        const clienteDeletado = await Cliente.destroy({
            where: {
                id,
            },
        });
        return clienteDeletado;
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        throw error;
    }
};

module.exports = {
    listarClientes,
    calcularRotaOtimizada,
    atualizarCoordenadas,
    salvarCliente,
    obterClientesPorIDs,
    filtrarClientes,
    deletarCliente,
};