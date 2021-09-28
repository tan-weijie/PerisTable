import {useState, useContext} from "react";
import axios from 'axios';
import UserContext from './UserContext'
import {Link} from "react-router-dom";

function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const user = useContext(UserContext)
 
    function handleRegister(e){
        e.preventDefault();
        const data = {username,email,password};
        axios.post('http://localhost:5000/signup',data,{withCredentials:true})
        .then(response =>{
            user.setUsername(response.data.username)
            user.setEmail(response.data.email)
            setUsername('')
            setEmail('');
            setPassword('')
        })
    }

    return(
        <div>
        <div><Link to={'./'}>Home</Link></div>
            <h2>Create New Account </h2>
            <form className="signup" action="" onSubmit={e=>{handleRegister(e)}}>
                <input className="input" type="username" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/><br/>
                <input className="input" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/><br/>
                <input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="button" type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Register;