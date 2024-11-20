const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'defaultSecret';

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'Token não fornecido.' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido.' });
        req.user = user;
        next();
    });
};