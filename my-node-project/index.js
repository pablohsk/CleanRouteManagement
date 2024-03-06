const express = require('express');
const app = express();
const clientesRoutes = require('./routes/clientesRoutes');
const pool = require('./models/db');  // Use o pool de db.js

app.use(express.json());

app.use('/clientes', clientesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});