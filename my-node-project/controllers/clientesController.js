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
        return custoTotal;
    };

    const heapPermute = (arr) => {
        const result = [];

        const swap = (a, b) => {
            const temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        };

        const generate = (n) => {
            if (n === 1) {
                result.push([...arr]);
            } else {
                for (let i = 0; i < n; i++) {
                    generate(n - 1);
                    if (n % 2 === 0) {
                        swap(i, n - 1);
                    } else {
                        swap(0, n - 1);
                    }
                }
            }
        };

        generate(arr.length);

        return result;
    };

    const permutedRoutes = await heapPermute(clientes);
    const pontoPartida = { coordenada_x: 0, coordenada_y: 0 };

    let melhorRota = [];
    let menorCusto = Infinity;

    for (const rotaAtual of permutedRoutes) {
        const rotaComPartida = [pontoPartida, ...rotaAtual];
        const custoAtual = calcularCustoTotal(rotaComPartida);

        if (custoAtual < menorCusto) {
            melhorRota = rotaComPartida;
            menorCusto = custoAtual;
        }
    }

    const idsMelhorRota = melhorRota.map(cliente => cliente.id);

    return { rota: `A rota será: ${idsMelhorRota.join(', ')}`, custo: menorCusto };
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