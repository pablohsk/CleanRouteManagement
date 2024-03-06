const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const sequelize = require('./sequelize-config');

// Chame o método `sync` na instância do Sequelize
sequelize.sync()
    .then(() => console.log('Modelo sincronizado com o banco de dados'))
    .catch((err) => console.error('Erro ao sincronizar o modelo com o banco de dados:', err));

// Configurar middleware para análise de corpo (body parsing)
app.use(express.json());

// Adicionar middleware de log de requisições
app.use((req, res, next) => {
    console.log('Body da requisição index:', req.body);
    next();
});

app.use('/clientes', clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});