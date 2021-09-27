import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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

    console.log("THIS",data);


    function handleDelete (e) {

        // axios.delete((uri + `delete/${e.target.id}`))
        // .then(response => {
        //     console.log('deleted one item');
        //     // setData(response.data);
        //     // console.log('data',data);
        // })
        // .catch((error)=> {
        //     console.log({status: 'bad', msg: error.message})
        // })
    }


    return (
        <div>
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
                        {data.expiryDate}
                    </tr>
                    <tr>    
                        <label>Purchase Date: </label>
                        {data.purchaseDate}
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
                <button>Edit</button>
                <button onClick={handleDelete} id={data._id}>Remove</button>
            </form>
        </div>
    )
}

export default ShowPage;