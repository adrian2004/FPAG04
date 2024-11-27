const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token inválido ou não fornecido.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token inválido ou não fornecido.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Acesso negado.' });
        req.token = token;
        req.user = user;
        next();
    });
};