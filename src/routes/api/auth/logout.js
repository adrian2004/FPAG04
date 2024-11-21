const express = require('express');
const router = express.Router();
const db = require('../../../models/db');
const authenticateToken = require('../../../middleware/authenticateToken');

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