const { fetchAllCustomers } = require('./db/customers.js');
const { fetchAllRestaurants } = require('./db/restaurants.js');
const { fetchAllReservations, createReservations, deleteReservation } = require('./db/reservations.js');

const client = require(`./db/client.js`);
client.connect();

const express = require(`express`);
const app = express();

app.use(express.json());

app.get(`/api/v1/customers`, async (req, res, next) => {
  try{
  const getAllCustomers = await fetchAllCustomers();
  res.send(getAllCustomers);
  } catch(err){
    next(err);
  }
})

app.get(`/api/v1/restaurants`, async (req, res, next) => {
try{
  const getAllRestaurants = await fetchAllRestaurants();
  res.send(getAllRestaurants);
} catch(err){
  next(err);
}
})

app.get(`/api/v1/reservations`, async (req, res, next) => {
try{
  const getAllReservations = await fetchAllReservations();
  res.send(getAllReservations);
} catch (err){
  next(err);
}
})

app.post(`/api/v1/customers/:id/reservations`, async (req, res, next) => {
  
  const { id } = req.params;
  const { restaurant_id, date, party_count } = req.body;
  try{
  
  const newReservation = await createReservations(date, party_count, restaurant_id, id)
  res.status(201).send(newReservation);
  } catch (err){
    next(err);
  }
})

app.delete(`/api/v1/:customerid/reservations/:id`, async (req, res) => {
  const { customerid, reservationid } = req.params;

  await deleteReservation(reservationid, customerid);
  res.status(204);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
})