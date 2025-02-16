const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const playlistRoutes = require('./routes/playlists');

dotenv.config(); // Carrega variáveis de ambiente do arquivo .env

const app = express();

// Middleware para processar JSON
app.use(express.json());

// Conecta ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Rotas
app.use('/api/playlists', playlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});