const express = require('express');
const router = express.Router();
const db = require('../../../models/db');
const authenticateToken = require('../../../middleware/authenticateToken');

/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     summary: Realiza o logout do usuário
 *     description: Invalida a sessão do usuário, atualizando o banco de dados e removendo o cookie do token JWT.
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
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
 *       500:
 *         description: Erro interno ao realizar o logout.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Erro ao realizar logout."
 */
router.get('/logout', authenticateToken, async (req, res) => {
    try {
        try {    
            const id = req.user.id;

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
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao realizar logout.' });
    }
    res.clearCookie('token')
       .sendStatus(200);
});

module.exports = router;