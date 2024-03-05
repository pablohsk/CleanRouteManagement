const pool = require('../db');

class Cliente {
    constructor(nome, email, telefone, coordenada_x, coordenada_y) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.coordenada_x = coordenada_x;
        this.coordenada_y = coordenada_y;
    }

}

module.exports = Cliente;
