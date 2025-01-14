import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { BASE_URL } from "../../constants";
import Grid from '@mui/material/Grid2';
import { Container } from "@mui/material";


const Details = () => {

    const [wine, setWine] = useState(null)
    const { id } = useParams()


    const getWine = async () => {
        try {
            const res = await axios(`${BASE_URL}wines/${id}`)
            setWine(res.data)
            console.log(res.data);

        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (id) {
            getWine()
        }


    }, [])




    return (
        <>
            {wine ? <Container>
                <Grid container spacing={2}>
                    <Grid size={6}>
                        <img src={wine.imageUrl} alt={wine.title} width={400} />
                    </Grid>
                    <Grid size={6} style={{ display: "flex", flexDirection: 'column', gap: "1rem", justifyContent: "center" }}>
                        <h3>Title: {wine.title}</h3>
                        <p>{wine.description}</p>
                        <p>Price: $ {wine.price}</p>
                    </Grid>

                </Grid>
            </Container > : <h2>no such wine!</h2>
            }
        </>
    )
}

export default Details