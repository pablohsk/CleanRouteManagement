const Cliente = require('../models/clienteModel');

const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.listarClientes();
        res.json(clientes);
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
};

const salvarCliente = async (req, res) => {
    const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;

    try {
        const novoCliente = await Cliente.salvarCliente(nome, email, telefone, coordenada_x, coordenada_y);
        res.json(novoCliente);
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
};

const atualizarCoordenadas = async (req, res) => {
    const { id, coordenada_x, coordenada_y } = req.body;

    try {
        const clienteAtualizado = await Cliente.atualizarCoordenadas(id, coordenada_x, coordenada_y);
        res.json(clienteAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar coordenadas do cliente:', error);
        res.status(500).json({ error: 'Erro ao atualizar coordenadas do cliente' });
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
    calcularRotaOtimizada,
    atualizarCoordenadas,
    salvarCliente,
};