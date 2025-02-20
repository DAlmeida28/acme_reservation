const { fetchAllCustomers } = require('./db/customers.js');
const { fetchAllRestaurants } = require('./db/restaurants.js');
const { fetchAllReservations, createReservations, deleteReservation } = require('./db/reservations.js');

const client = require(`./db/client.js`);
client.connect();

const express = require(`express`);
const app = express();

app.get(`/api/v1/customers`, async (req, res) => {

  const getAllCustomers = await fetchAllCustomers();
  res.send(getAllCustomers);
})

app.get(`/api/v1/restaurants`, async (req, res) => {

  const getAllRestaurants = await fetchAllRestaurants();
  res.send(getAllRestaurants);
})

app.get(`/api/v1/reservations`, async (req, res) => {

  const getAllReservations = await fetchAllReservations();
  res.send(getAllReservations);
})

app.post(`/api/v1/customers/:id/reservations`, async (req, res) => {
  const { id } = req.params;
  const { restaurant_id, date, party_count } = req.body;

  const newReservation = await createReservations(date, party_count, restaurant_id, id)
  res.send(newReservation);
})

app.delete(`/api/v1/:customerid/reservations/:id`, async (req, res) => {
  const { customerid, reservationid } = req.params;

  await deleteReservation(reservationid, customerid);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})