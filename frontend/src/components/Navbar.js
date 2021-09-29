import { Link } from "react-router-dom";
// import "./Navbar.css"
import UserContext from './UserContext';
import { useState, useEffect } from "react"
import axios from 'axios'

const Navbar = (props) => {
    const [username,setUsername] = useState("")
    const [email, setEmail] = useState("")

    useEffect(()=>{
        axios.get("http://localhost:5000/user", {withCredentials:true})
        .then(response =>{
            setUsername(response.data.username)
            setEmail(response.data.email)    
        })
    },[])

    function handleLogout(){
        axios.post('http://localhost:5000/logout',{}, {withCredentials:true})
            .then(()=>setEmail(""))
            .then(()=>setUsername(""))
            document.getElementById('logout').style.visibility = "hidden";
            window.location.href = "/login"
        
    }
    return (
        <UserContext.Provider value={{username, setUsername, email,setEmail}}>
        <nav className="navbar navbar-dark text-white bg-dark navbar-expand-sm">
            <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item " >
                            <Link className="nav-link text-white" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add">Add Item</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/shoppinglist">Shopping List</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/home">{email && (<div>Hi, <b>{username} </b></div>)}</Link>
                        </li>
                        <li className="nav-item">
                            <div className="nav-link text-white" id="logout" onClick={()=> handleLogout()} >Log out</div> 
                        </li>
                    </ul>
            </div>
        </nav>
        </UserContext.Provider>
    )
}

export default Navbar;