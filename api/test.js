const pg = require('pg');
const bcrypt = require('bcrypt');

const userPassword = 'admin';
let hash = '';


;(async () => {
    const { Client } = pg
    const client = new Client({
        user: 'postgres',
        password: '',
        host: 'localhost',
        port: '5432',
        database: 'fpa',
    });

    await client.connect()
    console.log(res.rows[0].message)
    await client.end()
});

