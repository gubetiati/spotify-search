const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const connectDB = require('./src/database')

const spotifyRoutes = require('./src/routes/spotifyRoutes');
const playlistRoutes = require('./src/routes/playlists');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP em 15 minutos
  message: 'Muitas tentativas de login, por favor tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

dotenv.config();

const app = express();
connectDB();

app.use(limiter);
app.use(compression());
app.use(express.json());

app.use(
  '/static',
  expressStaticGzip(path.join(__dirname, 'public'), {
    enableBrotli: true, 
    orderPreference: ['br', 'gzip'], 
    serveStatic: {
      maxAge: '1y',
    },
  })
);


app.get('/api/data', (req, res) => {
  res.json({ message: 'Dados comprimidos!' });
});

app.use('/api/playlists', playlistRoutes);
app.use('/api', spotifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});