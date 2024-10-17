require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const pg = require('pg');
const security = require('./lib/security');

const app = express();
const port = 5000;
const secretKey = 'rootroot';

const { Client } = pg;
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: '5432',
    database: 'postgres',
});

client.connect()
    .then(() => {
        console.log('Conectado ao banco de dados!');
    });

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Permite cookies nas requisições cross-origin, REMOVER EM PROD!!!
}));
app.use(express.json());
app.use(cookieParser());

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user_list = await client.query('SELECT * FROM usuario WHERE email = $1;', [email])

    if (user_list.rowCount == 0){
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
    
    if ( !security.checkHash(password, user_list.rows[0].hash) ){
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    if (user_list) {
        const token = jwt.sign({ id: user_list.user_list, email: user_list.email }, secretKey, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        });

        res.json({ message: 'Login realizado com sucesso!' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
});

app.get('/home', authenticateToken, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.email}!` });
});

app.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.status(302).redirect('http://localhost:3000/login');
});


app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
