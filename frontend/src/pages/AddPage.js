import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';

const AddPage = () => {
    const [item, setItem] = useState();
    const [category, setCategory] = useState();
    const [quantity, setQuantity] = useState();
    const [expiryDate, setExpiryDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [img, setImg] = useState('lala');

    const uri = "http://localhost:5000/"

    function handleSubmit(e){
        e.preventDefault();
        const data = {
            item,
            category,
            quantity,
            expiryDate,
            purchaseDate,
            location,
            price,
            img,
        };
        axios.post((uri + "add"),data)
        .then(response =>{
            console.log('posted', response);
            setItem('');
            setCategory('');
            setQuantity('');
            setExpiryDate('');
            setPurchaseDate('');
            setLocation('');
            setPrice('');
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table>
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
                        <input onChange={(e)=> setPurchaseDate(e.target.value)} value={purchaseDate} type="date" placeholder="Purchase Date"/>
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
                <button type='submit'>Add Item</button>
            </form>
        </div>
    )
}

export default AddPage;