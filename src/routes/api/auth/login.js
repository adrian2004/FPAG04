const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const db = require('../../../models/db');
const security = require('../../../lib/security')

const secretKey = process.env.JWT_SECRET

router.post('/login', async (req, res) => {
    const { email, password, token } = req.body;

    if (token) {
        try {
            jwt.verify(token, secretKey);
        }
        catch {
            return res.status(401).json({ message: 'Usuário ou senha inválidos' }); 
        }
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        });

        return res.json({ message: 'Login realizado com sucesso!' });
    }

    const user_list = await db.query('SELECT * FROM usuario WHERE email = $1;', [email])

    if (user_list.rowCount == 0){
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }    

    if (!await security.checkHash(password, user_list.rows[0].hash)){
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const active_sessions = await db.query('SELECT * FROM sessions WHERE id_usuario = $1;', [user_list.rows[0].id_usuario])


    if (active_sessions.rows.length) {
        if (active_sessions.rows[0].active) {
            return res.status(403).json({
                status: 'logged',
                message: 'Usuário já logado!',
                token: jwt.sign({
                    id: user_list.user_list,
                    email: user_list.email
                },
                secretKey,
                {
                    expiresIn: '1h'
                })
            });
        }
    }

    if (user_list && user_list.rows.length > 0) {
        const token = jwt.sign({ id: user_list.rows[0].id_usuario, email: user_list.rows[0].email }, secretKey, { expiresIn: '1h' });
    
        await db.query('INSERT INTO sessions(id_usuario, active) VALUES($1, true);', [user_list.rows[0].id_usuario]);
    
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        });
    
        return res.json({ message: 'Login realizado com sucesso!' });
    } else {
        return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }    
});

module.exports = router;