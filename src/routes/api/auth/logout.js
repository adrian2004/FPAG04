const express = require('express');
const router = express.Router();
const db = require('../../../models/db');
const jwt = require('jsonwebtoken');

const DEV_MODE = process.env.DEV_MODE;
const secretKey = process.env.JWT_SECRET;

const logoutUser = async (token) => {
    try {
        if (!token) return;

        const { id } = jwt.verify(token, secretKey);

        // Atualiza a sessão no banco para desativar e limpar o JWT
        await db.query(`
            UPDATE sessions 
            SET 
                active = false, 
                jwt = '',
                last_active = now()
            WHERE id_usuario = $1;
        `, [id]);
    } catch (error) {
        console.error('Erro durante o logout:', error);
        throw new Error('Falha ao processar logout.');
    }
};

router.post('/logout', async (req, res) => {
    const token = req.cookies.token;

    try {
        await logoutUser(token);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar logout.' });
    }

    res.clearCookie('token');
    res.redirect(DEV_MODE ? 'http://localhost:3000/login' : '/login');
});

router.get('/logout', async (req, res) => {
    const token = req.cookies.token;

    try {
        await logoutUser(token);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar logout.' });
    }

    res.clearCookie('token');
    res.redirect(DEV_MODE ? 'http://localhost:3000/login' : '/login');
});

module.exports = router;
