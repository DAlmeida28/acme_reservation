const client = require(`./client.cjs`);

const createCustomers = async (customerName) => {

  const { rows: createdCustomer } = await client.query(`
    INSERT INTO customers(name)
    VALUES('${customerName}')
    RETURNING *; 
    `)

  return createdCustomer[0];
}

const fetchAllCustomers = async () => {
  try {
    const { rows: allCustomers } = await client.query(`
    SELECT * FROM customers;
    `)

    return allCustomers;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createCustomers,
  fetchAllCustomers
}