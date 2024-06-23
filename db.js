const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'olethub_motors',
    password: 'sadattmagara254',
    port: '5432'
})

module.exports = pool;