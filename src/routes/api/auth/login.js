const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../../models/db');
const security = require('../../../lib/security');

const secretKey = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
    const { email, password, token } = req.body;

    try {
        if (token) {
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.id;

            await db.query(`
                INSERT INTO sessions (id_usuario, active, jwt, last_active)
                VALUES ($1, true, $2, now())
                ON CONFLICT (id_usuario)
                DO UPDATE SET 
                    active = true,
                    jwt = $2,
                    last_active = now();
            `, [userId, token]);

            return res.json({ message: 'Sessão validada e atualizada com sucesso!' });
        }

        const userResult = await db.query('SELECT * FROM usuario WHERE email = $1;', [email]);

        if (userResult.rowCount === 0) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const user = userResult.rows[0];

        if (!await security.checkHash(password, user.hash)) {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' });
        }

        const sessionResult = await db.query('SELECT * FROM sessions WHERE id_usuario = $1;', [user.id_usuario]);
        const activeSession = sessionResult.rows.find(session => session.active);

        if (activeSession) {
            const newToken = jwt.sign({ id: user.id_usuario, email: user.email }, secretKey, { expiresIn: '1h' });
            return res.status(403).json({ 
                message: 'Usuário já está logado!', 
                token: newToken 
            });
        }

        const newToken = jwt.sign({ id: user.id_usuario, email: user.email }, secretKey, { expiresIn: '1h' });

        await db.query(`
            INSERT INTO sessions (id_usuario, active, jwt, last_active)
            VALUES ($1, true, $2, now())
            ON CONFLICT (id_usuario)
            DO UPDATE SET 
                active = true,
                jwt = $2,
                last_active = now();
        `, [user.id_usuario, newToken]);

        res.cookie('token', newToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict',
        });

        return res.json({ message: 'Login realizado com sucesso!', token: newToken });
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ message: 'Erro no servidor' });
    }
});

module.exports = router;