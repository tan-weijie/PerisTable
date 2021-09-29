import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home"
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserContext from './components/UserContext'
import './App.css';
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';
import axios from "axios";


function App() {
 
    const [username,setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [login, setLogin] = useState("")

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
        const login = (<Link to={"/login"}>Log in</Link>)
        setLogin(login)
    }
    return (
      <div className="App">
        <hr />
        <UserContext.Provider value={{username, setUsername, email,setEmail}}>
            <BrowserRouter>
                <span className="header">
                    <Link to="/"><img src="./logo2.png" width="60px" height="50px" style={{float:"left"}}/></Link>
                    <h1>PerisTable</h1> 
                    <span className="hi-message">
                        {email && (
                            <div>Hi <b>{username} </b>,
                                <div>{email}</div>
                                <button onClick={()=> handleLogout()}>Log out</button>
                            </div>
                        )}
                        <div>{login}</div>
                    </span>
                </span>
                <hr />
                <main>
                    <Switch>

                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/login'} component={Login} />
                        <Route exact path={'/signup'} component={Signup} />
                        <Route path="/home">
                        <Navbar />
                        <DashboardPage/>
                        </Route>
                        <Route path="/show/:id">
                        <Navbar></Navbar>
                            <ShowPage/>
                        </Route>
                        <Route path="/add">
                        <Navbar></Navbar>
                            <AddPage/>
                        </Route>
                        <Route path="/edit/:id">
                        <Navbar></Navbar>
                            <EditPage/>
                        </Route>
                    </Switch>           
                </main>
            </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
}

export default App;
