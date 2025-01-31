import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ roles }) => {

    const { decodedToken } = useContext(AuthContext)
    // const decoded = jwtDecode(token);

    console.log("decodedToken", decodedToken);

    // const token = Cookies.get('token')
    // return token ? <Outlet /> : <Navigate to={"/admin/login"} />
    return decodedToken && roles.includes(decodedToken.role) ? <Outlet /> : <Navigate to={"/admin/login"} />
}

export default PrivateRoute