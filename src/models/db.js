const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'postgres',
});

pool.on('error', (err) => {
    console.error('Erro no pool de conexões:', err);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool,
};