const client = require(`./client.js`);

const createCustomers = async (customerName) => {

  const { rows: createdCustomer } = await client.query(`
    INSERT INTO customers(name)
    VALUES('${customerName}')
    RETURNING *; 
    `)

    return createdCustomer[0];
}

module.exports = {
  createCustomers
}