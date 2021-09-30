import React, {useState,useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import UserContext from './components/UserContext'
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

    const handleHome = () => {
        if (username == ""){
            window.location = "/login"
        } else 
            window.location = "./home";
    }

    return (
      <div className="mt-4">
      <div className="container" >
      
        <UserContext.Provider value={{username, setUsername, email,setEmail}}>
            <BrowserRouter>
                <div className="d-flex flex-row mb-3">
                    <img onClick={handleHome} src="./groceries.png" width="60px" height="50px" className="me-3"/>
                    <h1>PerisTable</h1>        
                </div>
                <main>
                    <Switch>
                        <Route exact path={'/'} component={Login} />
                        <Route exact path={'/login'} component={Login} />          
                        <Route exact path={'/signup'} component={Signup} />
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
                <footer className="d-flex flex-row mt-3">
                    <p>Reduce your carbon footprint today by not wasting food!</p>        
                </footer>
            </BrowserRouter>
        </UserContext.Provider>
      </div>
      </div>
    );
}

export default App;
