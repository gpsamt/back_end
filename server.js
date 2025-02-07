const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes'); // Importe as rotas das cidades
const stateRoutes = require('./routes/stateRoutes'); // Importe as rotas de estado
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/api/user', userRoutes); // Rotas de usuário
app.use('/api/cities', cityRoutes); // Rotas de cidades
app.use('/api/states', stateRoutes); // Rotas de estados

// Rota padrão para erros 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});