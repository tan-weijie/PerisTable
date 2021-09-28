<<<<<<< HEAD
import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Home from "./components/Home"
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserContext from './components/UserContext'
import axios from "axios"

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
                        <Route exact path={'/home'} component={Home} />
                        <Route exact path={'/login'} component={Login} />
                        <Route exact path={'/signup'} component={Signup} />
                    </Switch>
                </main>
            </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
}

export default App;
=======
import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';

function App() {
    return (
        <div className="App">
            <h1 style={{textAlign: "left"}}>PerisTable</h1>
            <Navbar></Navbar>
            <main>
                <Route path="/home">
                    <DashboardPage/>
                </Route>
                <Route path="/show/:id">
                    <ShowPage/>
                </Route>
                <Route path="/add">
                    <AddPage/>
                </Route>
                <Route path="/edit/:id">
                    <EditPage/>
                </Route>
            </main>
        </div>
    );
}

export default App;
>>>>>>> production
