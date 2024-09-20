const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;
const secretKey = 'seuSegredoSuperSeguro'; // Mantenha isso seguro

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // Permite cookies nas requisições cross-origin
}));
app.use(express.json());
app.use(cookieParser());

const users = [
    { id: 1, email: 'admin@interfocus.com.br', password: 'admin' }
];



app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // Gerar o token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

        // Setar o token como um cookie
        res.cookie('token', token, {
            httpOnly: true, // Para maior segurança, impede o acesso via JavaScript
            secure: false,  // Defina como `true` se usar HTTPS
            sameSite: 'Strict' // Controla o uso do cookie entre sites
        });

        res.json({ message: 'Login realizado com sucesso!' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
});

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
