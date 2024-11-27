const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/authenticateToken');
const db = require('../../../models/db');

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Obtém os dados do usuário autenticado
 *     description: Retorna o ID e o e-mail do usuário autenticado, baseado no token JWT.
 *     responses:
 *       200:
 *         description: Dados do usuário retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do usuário autenticado.
 *                   example: 123
 *                 email:
 *                   type: string
 *                   description: E-mail do usuário autenticado.
 *                   example: "usuario@example.com"
 *       401:
 *         description: Token inválido ou não fornecido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou não fornecido."
 */
router.get('/me', authenticateToken, async (req, res) => {
    const sessionResult = await db.query('SELECT * FROM sessions WHERE jwt = $1;', [req.token]);
    const activeSession = sessionResult.rows.find(session => session.active);

    if (!activeSession) {
        return res.sendStatus(401);
    }

    const response = {
        'id': req.user.id,
        'email': req.user.email
    }

    res.status(200).json(response);
});

module.exports = router;