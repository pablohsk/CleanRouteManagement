const pool = require('../db');

class Cliente {
    constructor(nome, email, telefone, coordenada_x, coordenada_y) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.coordenada_x = coordenada_x;
        this.coordenada_y = coordenada_y;
    }
    async salvar() {
        try {
            const result = await pool.query(
                'INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [this.nome, this.email, this.telefone, this.coordenada_x, this.coordenada_y]
            );
            const novoCliente = result.rows[0];
            this.id = novoCliente.id; // Atualiza o objeto com o ID gerado pelo banco de dados
            return novoCliente;
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            throw new Error('Erro ao cadastrar cliente');
        }
    }
    static async listarTodos() {
        try {
            const result = await pool.query('SELECT * FROM clientes');
            return result.rows;
        } catch (error) {
            console.error('Erro ao listar clientes:', error);
            throw new Error('Erro ao listar clientes');
        }
    }
    static async atualizarCoordenadas(id, coordenada_x, coordenada_y) {
        try {
            const result = await pool.query(
                'UPDATE clientes SET coordenada_x = $1, coordenada_y = $2 WHERE id = $3 RETURNING *',
                [coordenada_x, coordenada_y, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao atualizar coordenadas do cliente:', error);
            throw new Error('Erro ao atualizar coordenadas do cliente');
        }
    }    
}

module.exports = Cliente;