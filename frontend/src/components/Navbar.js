import {Link, NavLink} from "react-router-dom";
import "./Navbar.css"
import UserContext from './UserContext';
import {useState,useEffect} from "react"
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
        
        
    }
    return (
        <UserContext.Provider value={{username, setUsername, email,setEmail}}>
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
                        <NavLink class="right" to="/home">{email && (<div>Hi, <b>{username} </b></div>)}</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink class="right" to="/login"><div id="logout" onClick={()=> handleLogout()}>Log out</div></NavLink>
                    </li>
                </ul>
            </div>
        </UserContext.Provider>
    )
}

export default Navbar;