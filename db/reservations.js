const client = require(`./client.js`);

const createReservations = async (date, partyCount, restaurant_id, customer_id) => {
  try {
    const { rows: newReservation } = await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${date}', ${partyCount}, '${restaurant_id}', '${customer_id}')
      RETURNING *;
      `)

    return newReservation[0];
  } catch (err) {
    console.log(err);
  }
}

const fetchAllReservations = async () => {
  try {
    const { rows: allReservations } = await client.query(`
    SELECT * FROM reservations;
    `)

    return allReservations;
  } catch (err) {
    console.log(err);
  }
}

const deleteReservation = async (reservationid, customerid) => {
  try {
    await client.query(`
      DELETE FROM reservations WHERE reservation_id = ${reservationid} AND customer_id = ${customerid};
      `)
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createReservations,
  fetchAllReservations,
  deleteReservation
}