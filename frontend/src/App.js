import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
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
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

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

    const handleHome = () =>{
        window.location = "./home";
    }
    

    return (
      <div className="App">
        <hr />
        <UserContext.Provider value={{username, setUsername, email,setEmail}}>
            <BrowserRouter>
                <div className="header">
                    <img onClick={handleHome} src="./logo2.png" width="60px" height="50px" style={{float:"left"}}/>;
                    <h1>PerisTable</h1> 
                </div>
                <hr />
                <main>
                    <Switch>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/login'} component={Login} />
                        <Route exact path={'/signup'} component={Signup} />
                        <Route exact path="/home">
                        <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                        <DashboardPage username={username}/>
                        </Route>
                        <Route exact path="/show/:id">
                        <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                            <ShowPage/>
                        </Route>
                        <Route exact path="/add">
                        <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                            <AddPage username={username}/>
                        </Route>
                        <Route exact path="/edit/:id">
                        <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
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
