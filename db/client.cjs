const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/acme_reservations');

module.exports = client; 
