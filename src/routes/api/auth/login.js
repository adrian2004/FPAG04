const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../../models/db');
const security = require('../../../lib/security');

const secretKey = process.env.JWT_SECRET;

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza o login do usuário
 *     description: Autentica o usuário com e-mail e senha ou valida um token de sessão existente. Suporta rastreamento de origem do login.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: E-mail do usuário (necessário para login inicial).
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Senha do usuário (necessário para login inicial).
 *                 example: "senha123"
 *               token:
 *                 type: string
 *                 description: Token JWT existente para validar a sessão.
 *                 example: ""
 *               loggedAt:
 *                 type: string
 *                 description: Identifica a origem do login (main, unknow e etc.).
 *                 example: "main"
 *     responses:
 *       200:
 *         description: Login ou validação de sessão realizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Login realizado com sucesso!"
 *                 token:
 *                   type: string
 *                   description: Token JWT gerado (quando aplicável).
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       401:
 *         description: Credenciais inválidas ou token inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Usuário ou senha inválidos"
 *       403:
 *         description: Usuário já está logado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "logged"
 *                 message:
 *                   type: string
 *                   example: "Usuário já está logado!"
 *                 token:
 *                   type: string
 *                   description: Novo token JWT gerado para o usuário.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR..."
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "server_error"
 *                 message:
 *                   type: string
 *                   example: "Erro no servidor"
 */
router.post('/login', async (req, res) => {
    const { 
        email,
        password,
        token,
    } = req.body;

    const loggedAt = ['main', 'project1', 'project2', 'project3'].includes(req.body.loggedAt) ?
                     req.body.loggedAt : 'unknow'

    try {
        if (token) {
            const decoded = jwt.verify(token, secretKey);
            const userId = decoded.id;

            await db.query(`
                INSERT INTO sessions (id_usuario, active, jwt, last_active, logged_at)
                VALUES ($1, true, $2, now(), $3)
                ON CONFLICT (id_usuario)
                DO UPDATE SET 
                    active = true,
                    jwt = $2,
                    last_active = now(),
                    logged_at = $3;
            `, [userId, token, loggedAt]);

            return res.json({ status: 'success', message: 'Sessão validada e atualizada com sucesso!' });
        }

        const userResult = await db.query('SELECT * FROM usuario WHERE email = $1;', [email]);

        if (userResult.rowCount === 0) {
            return res.status(401).json({ status: 'unauthorized', message: 'Usuário ou senha inválidos' });
        }

        const user = userResult.rows[0];

        if (!await security.checkHash(password, user.hash)) {
            return res.status(401).json({ status: 'unauthorized', message: 'Usuário ou senha inválidos' });
        }

        const sessionResult = await db.query('SELECT * FROM sessions WHERE id_usuario = $1;', [user.id_usuario]);
        const activeSession = sessionResult.rows.find(session => session.active);

        if (activeSession) {
            const newToken = jwt.sign({ id: user.id_usuario, email: user.email }, secretKey, { expiresIn: '24h' });
            
            return res.status(403).json({ 
                status: 'logged',
                message: 'Usuário já está logado!', 
                token: newToken 
            });
        }

        const newToken = jwt.sign({ id: user.id_usuario, email: user.email }, secretKey, { expiresIn: '24h' });

        await db.query(`
            INSERT INTO sessions (id_usuario, active, jwt, last_active, logged_at)
            VALUES ($1, true, $2, now(), $3)
            ON CONFLICT (id_usuario)
            DO UPDATE SET 
                active = true,
                jwt = $2,
                last_active = now(),
                logged_at = $3;
        `, [user.id_usuario, newToken, loggedAt]);

        return res.json({ status: 'success', message: 'Login realizado com sucesso!', token: newToken });
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).json({ status: 'server_error', message: 'Erro no servidor' });
    }
});

module.exports = router;