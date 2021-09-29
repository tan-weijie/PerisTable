import React, {useState, useEffect, useHistory} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.css";

const ShowPage = () => {

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

    useEffect(()=>{
        getOne();
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
                    {data.img ? <img src={data.img}/> : <img src="https://via.placeholder.com/200x250.png?text=No+Image+Selected"/>}
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
                <Link to={`../edit/${data._id}`} id={data._id}>Edit</Link>
                <a onClick={handleDelete} id={data._id}>Remove</a>
            </form>
        </div>
    )
}

export default ShowPage;