import React, {useState, useEffect} from "react";
import "./DashboardPage.css";
import axios from 'axios';

const DashboardPage = () => { //props or useContext;

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"


    useEffect(()=>{
        getData();
    },[])

    function getData (){
        axios.get((uri + "home"))
        .then(response =>{
            console.log('received data');
            setData(response.data);
            // console.log(response);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

  

    return (
        <div>
            <div style={{textAlign: "left"}}>
                <p>Total Items:</p>
                <p>Expired in 5 days:</p>
            </div>
            <br/>
            <table className="container" border="1">
                <tr>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Expiry Date</th>
                    <th>Location</th>
                </tr>
                <br/>
                {data.map(element => {
                    return (
                        <tr>
                            <td>{element.category}</td>
                            <td>{element.item}</td>
                            <td>{element.expiryDate}</td>
                            <td>{element.location}</td>
                            <td><button id={element._id} onClick>Edit</button></td>
                            <td><button id={element._id} onClick>Remove</button></td>
                            <br/>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default DashboardPage;