const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const swaggerSetup = require('./swagger');

const app = express();

let allowedOrigins = [ 'https://interfocus.labs.unimar.br/' ]

if (process.env.ENVIRONMENT === 'dev' || process.env.ENVIRONMENT === 'hml') {
    allowedOrigins = '*'
}

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configurações básicas
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'build')));

// Configurações Swagger
swaggerSetup(app);

// Registra rotas
app.use(require('./routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;