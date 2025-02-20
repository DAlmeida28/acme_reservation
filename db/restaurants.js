const client = require(`./client.js`);

const createRestaurants = async (restaurantName) => {
  try {
    const { rows: createdRestaurant } = await client.query(`
    INSERT INTO restaurants(name)
    VALUES('${restaurantName}')
    RETURNING *;
    `)
    return createdRestaurant[0];
  } catch (err) {
    console.log(err);
  }
}

const fetchAllRestaurants = async () => {
  try {
    const { rows: allRestaurants } = await client.query(`
      SELECT * FROM restaurants;
      `)

    return allRestaurants;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createRestaurants,
  fetchAllRestaurants
}