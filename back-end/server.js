require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require("./routes/authRoutes");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectador ao MongoDB: ', err))

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API de playlists personalizadas')
})

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})