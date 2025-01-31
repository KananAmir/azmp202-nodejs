import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("token") || null);
    const [decodedToken, setDecodedToken] = useState(null);

    const nav = useNavigate()
    function handleLogin(value) {
        if (!value) return;

        try {
            const decoded = jwtDecode(value);
            console.log(decoded);

            const expiresInDays = (decoded.exp * 1000 - Date.now()) / (1000 * 60 * 60 * 24);

            Cookies.set("token", value, { expires: expiresInDays });
            setToken(value);
            setDecodedToken(decoded);
            nav("/admin")
        } catch (error) {
            console.error("Invalid token:", error);
            setToken(null);
            setDecodedToken(null);
            Cookies.remove("token");
        }
    }

    function handleLogout() {
        setToken(null);
        setDecodedToken(null);
        Cookies.remove("token");
    }

    // function checkIsTokenValid(){

    // }

    useEffect(() => {
        const savedToken = Cookies.get("token");
        if (savedToken) {
            handleLogin(savedToken);
        }
    }, []);

    // console.log("Token:", token);
    // console.log("Decoded Token:", decodedToken);

    return (
        <AuthContext.Provider value={{ token, decodedToken, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
