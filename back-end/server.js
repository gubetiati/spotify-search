const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const spotifyRoutes = require('./src/routes/spotifyRoutes');
const playlistRoutes = require('./src/routes/playlists');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/playlists', playlistRoutes);
app.use('/api', spotifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});