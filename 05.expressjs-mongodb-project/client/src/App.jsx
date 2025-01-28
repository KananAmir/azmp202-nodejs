import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { BASE_URL } from './constants'
import ProductForm from './components/AddProduct'

function App() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    try {
      const response = await axios(`${BASE_URL}products`)
      setProducts(response.data.data)

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getProducts()
  }, [])


  if (products.length === 0) {
    return <p>no product to show!</p>
  }
  return (
    <>
      <ProductForm />
      <hr />
      <ul>
        {products.length > 0 && products.map((product) => {
          return <li key={product._id}>{product.name}</li>
        })}
      </ul>

    </>
  )
}

export default App
