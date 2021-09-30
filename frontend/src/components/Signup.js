import {useState, useContext} from "react";
import axios from 'axios';
import UserContext from './UserContext'
import {Link} from "react-router-dom";

function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("")

    const user = useContext(UserContext)
 
    function handleRegister(e){
        e.preventDefault();
        const data = {username,email,password};
        axios.post('http://localhost:5000/signup',data,{withCredentials:true})
        .then(response =>{
            console.log("empty",response.data)
            
            if (response.data.errorMessage === "Please enter all required fields."){
                const msg = (<div> Please enter all required fields.</div>)
                setMsg(msg)
                return
            }
            if (response.data.errorMessage === "Existing user."){
                const msg = (<div> Existing user.</div>)
                setMsg(msg)
                return
            }

            user.setUsername(response.data.username)
            user.setEmail(response.data.email)
            setUsername('')
            setEmail('');
            setPassword('')
            window.location.href = "/home"

        })
    }

    return(
        <div className="mt-4">
            <div className="text-center mt-6 bg-dark text-white rounded-pill w-50">
                <h4>Create New Account </h4>
            </div>
            <form action="" onSubmit={e=>{handleRegister(e)}}>
                {msg}
                <div className="form-floating mb-2">
                    <input className="form-control w-50" id="floatingName" type="username" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/>
                    <label for="floatingName">Username</label>
                </div>
                <div className="form-floating mb-2">
                    <input className="form-control w-50" id="floatingEmail" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <label for="floatingEmail">Email Address</label>
                </div>
                <div className="form-floating mb-2">
                    <input className="form-control w-50" id="floatingPassword" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <label for="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-4">
                    <button className="btn btn-dark text-white" type="submit">Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default Register;