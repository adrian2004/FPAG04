const express = require('express');
const router = express.Router();
const db = require('../../../models/db');
const authenticateToken = require('../../../middleware/authenticateToken');

/**
 * @swagger
 * /api/sessions/active:
 *   get:
 *     summary: Retorna todas as sessões ativas agrupadas por logged_at
 *     responses:
 *       200:
 *         description: Lista de sessões ativas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sessions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_usuario:
 *                         type: integer
 *                         description: ID do usuário.
 *                       email:
 *                         type: string
 *                         description: Email do usuário.
 *                       logged_at:
 *                         type: string
 *                         enum: [principal, projeto 1, projeto 2, projeto 3, projeto 4]
 *                         description: Local de origem da sessão.
 *       401:
 *         description: Token inválido ou ausente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token inválido ou não fornecido."
 */
router.get('/active', authenticateToken, async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                usuario.id_usuario, 
                usuario.email, 
                sessions.logged_at
            FROM sessions
            JOIN usuario ON sessions.id_usuario = usuario.id_usuario
            WHERE sessions.active = true
            ORDER BY sessions.logged_at;
        `);

        return res.json({ status: 'success', sessions: result.rows });
    } catch (error) {
        console.error('Erro ao buscar sessões ativas:', error);
        return res.status(500).json({ status: 'server_error', message: 'Erro no servidor.' });
    }
});

module.exports = router;