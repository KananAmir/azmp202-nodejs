import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { BASE_URL } from "../../../constants"
import { AuthContext } from "../../../context/authContext"

const Products = () => {
    const [products, setProducts] = useState([])
    const { token } = useContext(AuthContext)
    const getProducts = async () => {
        try {
            console.log("token", token);

            const response = await axios(`${BASE_URL}products`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
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
        <div>
            <h2>Products</h2>
            {/* <ProductForm /> */}
            <hr />
            <ul>
                {products.length > 0 && products.map((product) => {
                    return <li key={product._id}>{product.name}</li>
                })}
            </ul>

        </div>
    )
}

export default Products