const client = require('./client.js');

const { createCustomers } = require(`./customers.js`);
const { createRestaurants } = require(`./restaurants.js`);
const { createReservations } = require(`./reservations.js`);

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reservations;
      DROP TABLE IF EXISTS restaurants;
      DROP TABLE IF EXISTS customers;
      `)
  } catch (err) {
    console.log(err);
  }
}

const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE customers(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(50) NOT NULL);
    
    CREATE TABLE restaurants(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(80) NOT NULL);

    CREATE TABLE reservations(
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    date DATE NOT NULL,
    party_count INTEGER NOT NULL,
    customer_id UUID REFERENCES customers(id),
    restaurant_id UUID REFERENCES restaurants(id));
    `)
  } catch (err) {
    console.log(err);
  }
}


const dataSeed = async () => {


  console.log('Connecting to database..');
  await client.connect();
  console.log(`I'M IN. `);

  console.log('==========================');

  console.log(`Dropping Tables..`);
  await dropTables();
  console.log(`Tables Dropped.`);

  console.log('==========================');

  console.log(`Creating Tables..`);
  await createTables();
  console.log(`Tables Created.`);

  console.log('==========================');

  console.log(`Creating Restaurants..`);
  const donutRest = await createRestaurants(`Donuts R us`);
  const foodRest = await createRestaurants(`We dont have food here`);
  const dinerRest = await createRestaurants(`Mickeys Diner`);
  console.log(`Restaurants Created.`);

  console.log('==========================');

  console.log(`Creating Customers..`);
  const hazel = await createCustomers('Hazel Cat');
  const tansy = await createCustomers('Tansy Cat');
  const wookie = await createCustomers('Wookie Cat');
  console.log(`Customers Created.`);

  console.log('==========================');

  console.log(`Creating Reservations..`);
  await createReservations('10/28/2024', '3', `${donutRest.id}`, `${hazel.id}`);
  await createReservations('02/20/20202', '20', `${foodRest.id}`, `${tansy.id}`);
  await createReservations('08/24/2025', '4', `${dinerRest.id}`, `${wookie.id}`);
  console.log('Reservations Created.');

  console.log('==========================');

  console.log(`Disconnecting from database..`);
  await client.end();
  console.log(`Disconnected from database.`);
}

dataSeed();