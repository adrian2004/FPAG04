const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
// const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Permitir apenas o frontend React
    credentials: true,
}));

// Configurações básicas
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'build')));

// Registra rotas
app.use(require('./routes'));

// Middleware para tratar erros
// app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;