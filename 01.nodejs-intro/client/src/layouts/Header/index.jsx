import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/add"}>Add</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Header