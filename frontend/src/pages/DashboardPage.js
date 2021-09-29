<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
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

    function handleEdit (e) {

    }

    function handleDelete (e) {
        axios.delete((uri + `delete/${e.target.id}`))
        .then(response => {
            console.log('deleted one item');
            setData(response.data);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }



    return (
        <div class="center">
            <div style={{textAlign: "left"}}>
                <p>Total Items: {data.length}</p>
                {/* <p>Expiring in 5 days: </p> */}
            </div>
            <br/>
            <table class="border">
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Expiry Date</th>
                    <th>Location</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
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
                        <tr id={element._id}>
                            <td>{index + 1}</td>
                            <td><a href={`/show/${element._id}`}>{element.category}</a></td>
                            <td><a href={`/show/${element._id}`}>{element.item}</a></td>
                            <td style={{backgroundColor: color}}><a href={`/show/${element._id}`}>{eDate.toLocaleDateString('en-AU')}</a></td>
                            <td><a href={`/show/${element._id}`}>{element.location}</a></td>
                            <td><a href={`/edit/${element._id}`}id={element._id} onClick={handleEdit}>Edit</a></td>
                            <td><a href="/home" id={element._id} onClick={handleDelete}>Remove</a></td>
                            <br/>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

=======
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
// import "./DashboardPage.css";
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

    function handleEdit (e) {

    }

    function handleDelete (e) {
        axios.delete((uri + `delete/${e.target.id}`))
        .then(response => {
            console.log('deleted one item');
            setData(response.data);
            console.log('data',data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }



    return (
        <div class="center">
            <div style={{textAlign: "left"}}>
                <p>Total Items: {data.length}</p>
                {/* <p>Expiring in 5 days: </p> */}
            </div>
            <br/>
            <table className="table table-bordered">
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Item</th>
                    <th>Expiry Date</th>
                    <th>Location</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
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
                            <tr id={element._id}>
                                    <td>{index + 1}</td>
                                    <td><a href={`/show/${element._id}`}>{element.category}</a></td>
                                    <td><a href={`/show/${element._id}`}>{element.item}</a></td>
                                    <td style={{backgroundColor: color}}><a href={`/show/${element._id}`}>{eDate.toLocaleDateString('en-AU')}</a></td>
                                    <td><a href={`/show/${element._id}`}>{element.location}</a></td>
                                {/* </Link>  */}
                                <td><a href={`/edit/${element._id}`}id={element._id} onClick={handleEdit}><i className="bi bi-pencil-square text-dark"></i></a></td>
                                <td><i className="bi bi-trash text-dark" href="/home" id={element._id} onClick={handleDelete}></i></td>
                                <br/>
                            </tr>
                    )
                })}
            </table>
        </div>
    )
}

>>>>>>> ef64882d3f51195422e3bad33d9d606bc37ed532
export default DashboardPage;