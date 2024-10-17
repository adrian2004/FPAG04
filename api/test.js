const pg = require('pg');
const bcrypt = require('bcrypt');
const { Email } = require('@react-login-page/page3');

const userPassword = 'admin';
let hash = '';

;(async () => {
    const { Client } = pg
    const client = new Client({
        user: 'postgres',
        password: '',
        host: 'localhost',
        port: '5432',
        database: 'postgres',
    });

    await client.connect()
    //console.log(res.rows[0].message)
    const a = await client.query('SELECT * FROM usuario WHERE email = $1;', ['admin@admin.com'])
    console.log(a.rows[0])
    await client.end()
})();


