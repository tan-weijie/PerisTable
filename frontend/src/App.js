import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./components/Home"
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserContext from './components/UserContext'
// import './App.css';
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import ShowPage from './pages/ShowPage';
import Header from './components/Header';
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

    const handleHome = () => {
        window.location = "./home";
    }

    return (
      <div className="mt-4">
      <div className="container-fluid" >
      
        <UserContext.Provider value={{username, setUsername, email,setEmail}}>
            <BrowserRouter>
                <div className="d-flex flex-row mb-3">
                    <img onClick={handleHome} src="./groceries.png" width="60px" height="50px" className="me-3"/>
                    <h1>PerisTable</h1>        
                </div>
                <main>
                    <Switch>
                        <Route exact path={'/'}>
                            <Home />
                        </Route>
                        <Route exact path={'/login'} component={Login} />          
                        <Route exact path={'/signup'}>
                            <Signup />
                        </Route>
                        <Route path="/home">
                            <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                            <DashboardPage username={username}/>
                        </Route>
                        <Route path="/show/:id">
                            <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                            <ShowPage/>
                        </Route>
                        <Route path="/add">
                            <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                            <AddPage username={username}/>
                        </Route>
                        <Route path="/edit/:id">
                            <Navbar setEmail={setEmail} setUsername={setUsername} email={email} username={username}></Navbar>
                            <EditPage/>
                        </Route>
                    </Switch>           
                </main>
            </BrowserRouter>
        </UserContext.Provider>
      </div>
      </div>
    );
}

export default App;
