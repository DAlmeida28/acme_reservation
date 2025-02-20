const client = require(`./client.js`);

const createReservations = async (date, partyCount, restaurant_id, customer_id) => {

    await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${date}', ${partyCount}, '${restaurant_id}', '${customer_id}');
      `)
}

module.exports = { 
  createReservations
}