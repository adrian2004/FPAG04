const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({
    origin:  [
        'https://interfocus.labs.unimar.br/',
        process.env.ENVIRONMENT == 'dev' ? 'http://localhost:3000' : undefined,
    ],
    credentials: true,
}));

// Configurações básicas
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'build')));

// Registra rotas
app.use(require('./routes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;