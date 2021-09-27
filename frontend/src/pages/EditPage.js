import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./DashboardPage.css"

const EditPage = () => {
    const [item, setItem] = useState();
    const [category, setCategory] = useState();
    const [quantity, setQuantity] = useState();
    const [expiryDate, setExpiryDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [img, setImg] = useState('lala');

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
            setItem(response.data.item);
            setCategory(response.data.category);
            setQuantity(response.data.quantity);
            setExpiryDate(response.data.expiryDate);
            setPurchaseDate(response.data.purchaseDate);
            setLocation(response.data.location);
            setPrice(response.data.price);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }
    
    function editOne (){
        const data = {
            item,
            category,
            quantity,
            expiryDate,
            purchaseDate,
            location,
            price,
            img,
        }
        axios.put((uri + `edit/${id}`), data)
        .then(response =>{
            console.log('received editted data');
            console.log(response.data);
            // setData(response.data);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }



    return (
        <div class="center">
            <form>
                <table>
                    <tr>    
                        <img src="lala"/>
                    </tr>
                    <tr>    
                        <label>Item Name: </label>
                        <input onChange={(e)=> setItem(e.target.value)} value={item} type="text" placeholder="Item"/>
                    </tr>
                    <tr>    
                        <label>Category: </label>
                        <input onChange={(e)=> setCategory(e.target.value)} value={category} type="select" placeholder="Category"/>
                    </tr>
                    <tr>    
                        <label>Quantity: </label>
                        <input onChange={(e)=> setQuantity(e.target.value)} value={quantity} type="text" placeholder="Quantity"/>
                    </tr>
                    <tr>    
                        <label>Expiry Date: </label>
                        <input onChange={(e)=> setExpiryDate(e.target.value)} value={expiryDate} type="date" placeholder="Expiry Date"/>
                    </tr>
                    <tr>    
                        <label>Purchase Date: </label>
                        <input onChange={(e)=> setPurchaseDate(e.target.value)} value={purchaseDate} type="date" placeholder={purchaseDate}/>
                    </tr>
                    <tr>    
                        <label>Location: </label>
                        <input onChange={(e)=> setLocation(e.target.value)} value={location} type="text" placeholder="Location"/>
                    </tr>
                    <tr>    
                        <label>Price: </label>
                        <input onChange={(e)=> setPrice(e.target.value)} value={price} type="text" placeholder="Price"/>
                    </tr>
                </table> 
                <button onClick={editOne}>Edit</button>
            </form>
        </div>
    )
}

export default EditPage;