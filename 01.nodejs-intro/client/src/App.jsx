import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'



function App() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const BASE_URL = "http://localhost:8080/api"

  const getProducts = async () => {
    try {
      setLoading(true)
      const res = await axios(`${BASE_URL}/products`)
      // console.log(res.data);
      setProducts(res.data.data)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (pId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/products/${pId}`)

      console.log(res);

      if (res.status === 200) {
        //  await getProducts()
        setProducts([...products.filter((p) => p.id !== pId)])
      } else {
        throw new Error("failed to delete")
      }

    } catch (error) {
      console.log(error);
    }
  }

  let timeout = null
  const handleSearch = (e) => {
    clearTimeout(timeout)
    try {
      timeout = setTimeout(async () => {
        const res = await axios(`${BASE_URL}/products/search?title=${e.target.value.trim()}`)
        setProducts([...res.data.data])
      }, 500);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getProducts()
  }, [])

  if (loading) {
    return <p>LOADING...</p>
  }

  return (
    <>

      <div><input type="search" placeholder='search product..' onChange={handleSearch} /></div>
      <ul>
        {products.length > 0 && products.map((p) => {
          return <li key={p.id}><span>{p.title}</span> <button onClick={() => {
            if (window.confirm("are u sure to delete??")) {
              handleDelete(p.id)
            }
          }}>delete</button></li>
        })}
      </ul>
    </>
  )
}

export default App
