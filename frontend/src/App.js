import { Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';
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
