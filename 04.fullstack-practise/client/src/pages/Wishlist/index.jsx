import { useContext } from "react";

import Grid from '@mui/material/Grid2';
import Rating from '@mui/material/Rating';
import styles from "./index.module.scss"
import { LuShoppingCart } from "react-icons/lu";
import { FaInfoCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/wishlistContext";



const Wishlist = () => {



    const { wishlist, toggleWishlist } = useContext(WishlistContext)






    return (

        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="wines page" />
            </Helmet>
            <div>


                <div className="container">


                    <div className={styles.wines}>
                        <Grid container spacing={2}>
                            {
                                wishlist.length > 0 && wishlist.map((w) => {
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
                                                <FaRegHeart onClick={() => { toggleWishlist(w) }} />
                                            </div>
                                        </div>
                                    </Grid>)
                                })
                            }
                        </Grid>
                    </div>

                </div>
            </div>
        </>

    )
}

export default Wishlist