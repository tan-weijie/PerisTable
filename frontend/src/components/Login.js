import {useState, useContext} from "react";
import axios from 'axios';
import UserContext from './UserContext'
import {Link} from "react-router-dom"
import styles from "./styles.css";

function Login(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [msg, setMsg] = useState("")

    const user = useContext(UserContext)

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
            
            
            user.setEmail(response.data.email)
            user.setUsername(response.data.username)
            setUsername('')
            setEmail('');
            setPassword('')
            setLoginError(false)
            document.getElementById('login').style.visibility = "hidden";
            window.location.href = "/home"
        })
        .catch(()=> {
            setLoginError(true)
            return
        })
    }
 
    return(
        <div>
            <br />
            <br />
            <img src="./main.gif" width="560px" height="520px" className="main-img"/>
            <form className="login" id="login" action="" onSubmit={e=>handleLogin(e)}>
                {loginError && (
                    <div>Invalid Login </div>
                )}
                {msg}
                <input className="input user" type="username" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)}/><br />
                <input className="input" type="email" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/><br />
                <input className="input" type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="button" style={{display:"block"}} type="submit">Log in</button>
                <br/>
                <hr />
                <p style={{marginLeft:"20px"}}>Sign up now</p>
                <div className="signuplink"><Link to={'/signup'} style={{textDecoration:"none"}}>Create New Account</Link></div>
            </form>
        </div>
    )
}

export default Login;

    //         {!loginError && (
    // window.location.reload()
    // )}