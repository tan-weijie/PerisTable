import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

const DashboardPage = (props) => { //props or useContext;

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    useEffect(()=>{
        getData();
    },[props])
    
    function getData (){
   
        // console.log('THIS',username);
        axios.get((uri + `home/${props.username}`))
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
    
    function handleDelete (e) {
        axios.delete((uri + `delete/${e.target.id}`))
        .then(response => {
            console.log('deleted one item');
            // setData(response.data);
            console.log('data',data);
            window.location = ("../home");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div class="center">
            <div className="center mt-4">
                <h5>You have <span className="badge bg-secondary">{data.length}</span> perishable items!</h5>
            </div>
            <br/>
            <table className="table table-striped table-borderless table-hover">
                <thead>
                    <tr className="table-dark">
                        <th scope="col">#</th>
                        <th scope="col">Category</th>
                        <th scope="col">Item</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Location</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {data.map((element, index) => {
                    let color;
                    let newDate = new Date;
                    let eDate = new Date(element.expiryDate);
                    let difference = newDate - eDate;
                    difference = difference/1000/60/60/24
                    console.log(difference);
                    if (difference > 0){
                        color = "pink"; 
                    } else if (difference < 0 && difference > -3) {
                        color = "yellow"
                    }
                    return (
                        <tbody>
                            <tr id={element._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{element.category}</td>
                                <td><Link to={`/show/${element._id}`}>{element.item}</Link></td>
                                <td style={{backgroundColor: color}}><Link to={`/show/${element._id}`}>{eDate.toLocaleDateString('en-AU')}</Link></td>
                                <td>{element.location}</td>
                                <td><Link to={`/edit/${element._id}`}><i className="bi bi-pencil-square text-dark" id={element._id}></i></Link></td>
                                <td><i className="bi bi-trash text-dark" href="/home" id={element._id} onClick={handleDelete}></i></td>
                                <br/>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

export default DashboardPage;