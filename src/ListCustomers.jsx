import { useState, useEffect } from "react"

const ListCustomers = () => {
  const [allCustomers, setAllCustomers] = useState([]);
 
  useEffect(() => {
    const getAllCustomers = async () => {
      const allCustomers = await fetch('/api/v1/customers');
      const response = await allCustomers.json();
      setAllCustomers(response);
    }

    getAllCustomers();
  }, [])



  return(
  <>
  <h1>LIST CUSTOMERS </h1>
    <ul>
    {
        allCustomers.map((customer) => {
          return <li>{customer.name}</li>
           })

    }
    </ul>

</>
  )
}


export default ListCustomers