const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const sequelize = require('./sequelize-config');  // Importe a instância do Sequelize

// Chame o método `sync` na instância do Sequelize
sequelize.sync()
    .then(() => console.log('Modelo sincronizado com o banco de dados'))
    .catch((err) => console.error('Erro ao sincronizar o modelo com o banco de dados:', err));

app.use(express.json());
app.use('/clientes', clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
