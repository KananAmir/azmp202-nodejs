import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";

import styles from "./index.module.scss";
import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';

import { LuShoppingCart } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/wishlistContext";



const Home = () => {
    const [wines, setWines] = useState([])
    const [winesCopy, setWinesCopy] = useState([])
    const [searchQuery, setSearchQuery] = useState("")


    const { toggleWishlist } = useContext(WishlistContext)



    const getWines = async () => {
        try {
            const res = await axios(`${BASE_URL}wines`)
            // console.log(res.data);
            setWines(res.data)
            setWinesCopy(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const filteredWines = wines.filter((w) => w.title.toLowerCase().includes(searchQuery.toLowerCase().trim()))
    useEffect(() => {
        getWines()
    }, [])


    const handleChange = (e) => {
        let sortedWines = null;
        console.log(e.target.value);
        if (e.target.value === "asc") {
            sortedWines = [...wines].toSorted((a, b) => a.price - b.price)
        } else if (e.target.value === "desc") {
            sortedWines = [...wines].toSorted((a, b) => b.price - a.price)
        } else {
            sortedWines = [...winesCopy]
        }
        setWines([...sortedWines])
    }

    return (

        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="wines page" />
            </Helmet>
            <div>


                <div className="container">

                    <div style={{ margin: "1rem 0", display: "flex", justifyContent: "space-between" }}>
                        <TextField id="outlined-basic" label="Search" variant="outlined" onChange={(e) => { setSearchQuery(e.target.value) }} />
                        <select name="" id="" onChange={handleChange}>
                            <option value="asc">ASC</option>
                            <option value="desc">DESC</option>
                            <option value="default">DEFAULT</option>
                        </select>
                    </div>
                    <div className={styles.wines}>
                        <Grid container spacing={2}>
                            {
                                wines.length > 0 && filteredWines.map((w) => {
                                    return (<Grid size={{ xs: 12, md: 6, lg: 4 }} key={w._id}>
                                        <div className={styles["wine"]}>
                                            <img src={w.imageUrl} alt={w.title} />
                                            <h3 className={styles.title}>{w.title}</h3>
                                            <p> {w.oldPrice ? <span className={styles["old-price"]}>$ {w.oldPrice}</span> : ""} $ {w.price}</p>
                                            <p><Rating name="half-rating" defaultValue={w.raiting} />
                                            </p>
                                            <button className={styles["cart"]}> <LuShoppingCart />
                                                Add to Cart</button>
                                            <div style={{ display: "flex", gap: "1rem" }}>
                                                <Link to={`wines/${w._id}`}><FaInfoCircle /></Link>
                                                <FaRegHeart onClick={() => { toggleWishlist(w) }} />
                                            </div>
                                        </div>
                                    </Grid>)
                                })
                            }
                        </Grid>
                    </div>

                </div>
            </div >
        </>

    )
}

export default Home