import {Link, NavLink} from "react-router-dom";

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/add">Add Item</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/">Log Out</NavLink>
        </div>
    )
}

export default Navbar;