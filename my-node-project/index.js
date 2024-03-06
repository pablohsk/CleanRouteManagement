const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const Cliente = require('./models/Cliente');  // Use o modelo Cliente

app.use(express.json());

app.use('/clientes', clientesRoutes);

Cliente.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});