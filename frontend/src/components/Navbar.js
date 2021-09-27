import {Link, NavLink} from "react-router-dom";
import "./Navbar.css"

const Navbar = (props) => {
    return (
        <div class="navbar">
            <ul class="nav">
                <li class="nav-item">
                    <NavLink class="left" to="/home">Home</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="left" to="/add">Add Item</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="left" to="/shoppinglist">Shopping List</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="right" to="/profile">Profile</NavLink>
                </li>
                <li class="nav-item">
                    <NavLink class="right" to="/">Log Out</NavLink>    
                </li>
            </ul>
        </div>
    )
}

export default Navbar;