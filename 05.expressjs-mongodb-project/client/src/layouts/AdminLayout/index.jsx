import { useContext } from "react"
import { Link, Outlet } from "react-router-dom"
import { AuthContext } from "../../context/authContext"

const AdminLayout = () => {
    const { token, handleLogout } = useContext(AuthContext)

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to={"/admin"}>Dashboard</Link>
                        </li>
                        <li>
                            <Link to={"/admin/products"}>Products</Link>
                        </li>
                        <li>
                            {token
                                ?
                                <button onClick={handleLogout}>logout</button>
                                :
                                <Link to={"/admin/login"}>Login</Link>
                            }
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet /></>
    )
}

export default AdminLayout