<<<<<<< HEAD
import React, {useState, useEffect, useHistory} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.css";

const ShowPage = (props) => {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

    useEffect(()=>{
        getOne();
        console.log('useeffect')
    },[])
    
    function getOne (){
        axios.get((uri + `show/${id}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            setData(response.data);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    function handleDelete (e) {
        axios.delete((uri + `delete/${id}`))
        .then(response => {
            console.log('deleted one item');
            window.location = ("../home");
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    let eDate = new Date(data.expiryDate);
    let pDate = new Date(data.purchaseDate);

    return (
        <div class="center">
            <form>
                <table>
                    <img src="lala"/>
                    <tr>    
                        <label>Item Name: </label>
                        {data.item}
                    </tr>
                    <tr>    
                        <label>Category: </label>
                        {data.category}
                    </tr>
                    <tr>    
                        <label>Quantity: </label>
                        {data.quantity}
                    </tr>
                    <tr>    
                        <label>Expiry Date: </label>
                        {eDate.toLocaleDateString('en-AU')}
                    </tr>
                    <tr>    
                        <label>Purchase Date: </label>
                        {pDate.toLocaleDateString('en-AU')}
                    </tr>
                    <tr>    
                        <label>Location: </label>
                        {data.location}
                    </tr>
                    <tr>    
                        <label>Price: </label>
                        ${data.price}
                    </tr>
                </table>
                <br/> 
                <a href={`../edit/${data._id}`} id={data._id}>Edit</a>
                <a onClick={handleDelete} id={data._id}>Remove</a>
            </form>
        </div>
    )
}

=======
import React, {useState, useEffect, useHistory} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
// import "./DashboardPage.css";

const ShowPage = (props) => {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

    useEffect(()=>{
        getOne();
        console.log('useeffect')
    },[])
    
    function getOne (){
        axios.get((uri + `show/${id}`))
        .then(response =>{
            console.log('received data');
            console.log(response.data);
            setData(response.data);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    function handleDelete (e) {
        axios.delete((uri + `delete/${id}`))
        .then(response => {
            console.log('deleted one item');
     
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    let eDate = new Date(data.expiryDate);
    let pDate = new Date(data.purchaseDate);

    return (
        <div class="center">
            <form>
                <table>
                    <img src="lala"/>
                    <tr>    
                        <label>Item Name: </label>
                        {data.item}
                    </tr>
                    <tr>    
                        <label>Category: </label>
                        {data.category}
                    </tr>
                    <tr>    
                        <label>Quantity: </label>
                        {data.quantity}
                    </tr>
                    <tr>    
                        <label>Expiry Date: </label>
                        {eDate.toLocaleDateString('en-AU')}
                    </tr>
                    <tr>    
                        <label>Purchase Date: </label>
                        {pDate.toLocaleDateString('en-AU')}
                    </tr>
                    <tr>    
                        <label>Location: </label>
                        {data.location}
                    </tr>
                    <tr>    
                        <label>Price: </label>
                        ${data.price}
                    </tr>
                </table> 
                <a href={`../edit/${data._id}`} id={data._id}>Edit</a>
                <a onClick={handleDelete} id={data._id}>Remove</a>
            </form>
        </div>
    )
}

>>>>>>> ef64882d3f51195422e3bad33d9d606bc37ed532
export default ShowPage;