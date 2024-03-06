const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Cliente = sequelize.define('Cliente', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
  },
  coordenada_x: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  coordenada_y: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Isso criará a tabela se ela não existir
sequelize.sync();

// Função para salvar um novo cliente
const salvarCliente = async (nome, email, telefone, coordenada_x, coordenada_y) => {
    try {
        const novoCliente = await Cliente.create({
            nome,
            email,
            telefone,
            coordenada_x,
            coordenada_y,
        });
        return novoCliente;
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        throw new Error('Erro ao cadastrar cliente');
    }
};

// Função para atualizar as coordenadas de um cliente
const atualizarCoordenadas = async (id, coordenada_x, coordenada_y) => {
    try {
        const clienteAtualizado = await Cliente.update(
            { coordenada_x, coordenada_y },
            { where: { id }, returning: true }
        );
        return clienteAtualizado[1][0];
    } catch (error) {
        console.error('Erro ao atualizar coordenadas do cliente:', error);
        throw new Error('Erro ao atualizar coordenadas do cliente');
    }
};

// Função para listar todos os clientes
const listarClientes = async () => {
    try {
        const clientes = await Cliente.findAll();
        return clientes;
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        throw new Error('Erro ao listar clientes');
    }
};

module.exports = {
    Cliente,
    salvarCliente,
    atualizarCoordenadas,
    listarClientes,
};