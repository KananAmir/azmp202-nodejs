import axios from "axios"
import { data, useParams } from "react-router-dom"
import { BASE_URL } from "../../constants"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

const Details = () => {

    const [product, setProduct] = useState(null)

    const { id } = useParams()

    const getProduct = async () => {
        try {
            const resp = await axios(`${BASE_URL}/products/${id}`)
            // console.log(resp.data);
            setProduct(resp.data)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {

        getProduct()

    }, [])


    return (
        <>

            <Helmet>
                <title>{product?.title}</title>
                <meta name="description" content={`${product?.description}`} />
            </Helmet>
            {!product ? <p>Loading...</p> : <div>{product.title}</div>}
        </>
    )
}

export default Details