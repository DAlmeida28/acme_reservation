import { Routes, Route } from 'react-router-dom'
import ListCustomers from './ListCustomers.jsx'
 
function App() {

  return (
    <>
  <h1>Acme Restaurant Reservations.</h1>

  <Routes>
    <Route path="/customers" element={<ListCustomers/>}/>

  </Routes>
    </>
  )
}

export default App
