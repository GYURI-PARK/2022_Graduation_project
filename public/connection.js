const { Pool, Client } = require('pg')

const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
    max: 5,
})

module.exports = client