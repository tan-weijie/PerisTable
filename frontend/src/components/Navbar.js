import {Link } from "react-router-dom";

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add">Add Item</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shoppinglist">Shopping List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx" to="/">Log Out</Link>    
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;