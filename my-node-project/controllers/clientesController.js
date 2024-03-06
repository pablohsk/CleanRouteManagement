const pool = require('../models/db');

const listarClientes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows;
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        throw new Error('Erro ao listar clientes');
    }
};

const calcularRota = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM clientes');
        const clientes = result.rows;

        const rotaCalculada = calcularRotaOtimizada(clientes);

        res.json(rotaCalculada);
    } catch (error) {
        console.error('Erro ao calcular a rota:', error);
        res.status(500).json({ error: 'Erro ao calcular a rota' });
    }
};

const calcularRotaOtimizada = (clientes) => {
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
        custoTotal += calcularDistancia(rota[rota.length - 1], rota[0]);
        return custoTotal;
    };

    const permutar = (arr, callback) => {
        const heapPermute = (n, arr) => {
            if (n === 1) {
                callback([...arr]);
            } else {
                for (let i = 0; i < n; i++) {
                    heapPermute(n - 1, arr);
                    const j = n % 2 === 0 ? i : 0;
                    [arr[n - 1], arr[j]] = [arr[j], arr[n - 1]];
                }
            }
        };

        let melhorRota = [];
        let menorCusto = Infinity;

        heapPermute(clientes.length, clientes, (rotaAtual) => {
            const custoAtual = calcularCustoTotal(rotaAtual);
            if (custoAtual < menorCusto) {
                melhorRota = rotaAtual;
                menorCusto = custoAtual;
            }
        });

        return { rota: melhorRota, custo: menorCusto };
    };

    return permutar(clientes);
};

module.exports = {
    listarClientes,
    calcularRota,
};