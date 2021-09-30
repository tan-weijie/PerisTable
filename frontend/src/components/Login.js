import {useState, useContext} from "react";
import axios from 'axios';
import {Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import styles from "./styles.css";

function Login(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [msg, setMsg] = useState("")

    //sign new token with userinfo , send it with response
    function handleLogin(e){
        e.preventDefault();
        const data = {username,email,password};
        axios.post('http://localhost:5000/login',data,{withCredentials:true})
        .then(response =>{
            console.log('response login',response)
            if (response.data==='issue' || response.data==="err"){
                const msg = (<div> Invalid Login</div>)
                setMsg(msg)
                return
            }
            
            setUsername('')
            setEmail('');
            setPassword('')
            setLoginError(false)
            //document.getElementById('login').style.visibility = "hidden";
            window.location.href = "/home"
            
        })
        .catch(()=> {
            setLoginError(true)
            return
        })
    }
 
    return(
        <div className="mt-4">  
            <form id="login" action="" onSubmit={e=>handleLogin(e)}>
                <div className="mb-3">
                    {loginError && (
                        <div>Invalid Login </div>
                    )}
                    {msg}
                    <div className="form-floating mb-2">
                        <input className="form-control w-50" id="floatingName" type="username" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/>
                        <label for="floatingName">Username</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input className="form-control w-50" id="floatingEmail" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                        <label for="floatingEmail">Email Address</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input className="form-control w-50" id="floatingPassword" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="form-floating mb-4">
                        <button className="btn btn-dark text-white" type="submit">Log in</button>
                    </div>
                    <div className="signuplink">
                        <Link to={'/signup'} className="text-primary">Create New Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login;