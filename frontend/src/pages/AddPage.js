import React, { useState } from "react";
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

const AddPage = (props) => {
    const [item, setItem] = useState();
    const [category, setCategory] = useState("Fruits");
    const [quantity, setQuantity] = useState();
    const [expiryDate, setExpiryDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [img, setImg] = useState('');
    const [prompt, setPrompt] = useState('');
    const username = props.username;

    const uri = "http://localhost:5000/"

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setImg(base64);
    };

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
            username,
        };
        if (!(item && category && quantity && expiryDate && purchaseDate && location && price)){
            setPrompt(
                <Alert variant="danger" onClose={() => setPrompt(false)} dismissible>
                    <Alert.Heading>Please enter all fields!</Alert.Heading>
                </Alert>
                )
        } else if (isNaN(quantity)){
            console.log(quantity)
            setPrompt(                
                <Alert variant="danger" onClose={() => setPrompt(false)} dismissible>
                    <Alert.Heading>Quantity should be a number!</Alert.Heading>
                </Alert>
                )
        } else if (isNaN(price)) {
            setPrompt(                
                <Alert variant="danger" onClose={() => setPrompt(false)} dismissible>
                    <Alert.Heading>Price should be a number!</Alert.Heading>
                </Alert>
                )
        }
        console.log(typeof(expiryDate))
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
            setImg('')
            window.location = "../home";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    return (
        <div className="center mt-4">
            <form onSubmit={handleSubmit}>                   
                    <div className="form-floating mt-2 mb-2">    
                        <input className="form-control w-70" id="inputItem" onChange={(e)=> setItem(e.target.value)} value={item} type="text" placeholder="Item"/>
                        <label for="inputItem">Item Name</label>
                    </div>
                    <div className="form-floating mt-2 mb-2">    
                        <select className="form-select" id="floatingSelect" onChange={(e)=> setCategory(e.target.value)}>
                            <option selected>Choose a category</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Seafood">Seafood</option>
                            <option value="Meat">Meat</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Others">Others</option>
                        </select>
                        <label for="floatingSelect">Category</label>
                    </div>
                    <div className="form-floating mt-2 mb-2">    
                        <input className="form-control w-70" id="inputQty" onChange={(e)=> setQuantity(e.target.value)} value={quantity} type="text" placeholder="Quantity"/>
                        <label for="inputQty">Quantity</label>
                    </div>
                    <div className="form-floating mt-2 mb-2">    
                        <input className="form-control w-70" id="inputExpiryDate" onChange={(e)=> setExpiryDate(e.target.value)} value={expiryDate} type="date" placeholder="Expiry Date"/>
                        <label for="inputExpiryDate">Expiry Date</label>
                    </div>
                    <div className="form-floating mt-2 mb-2">  
                        <input className="form-control w-70" id="inputPurchaseDate" onChange={(e)=> setPurchaseDate(e.target.value)} value={purchaseDate} type="date" placeholder="Purchase Date"/>
                        <label for="inputPurchaseDate">Purchase Date</label>
                    </div>
                    <div className="form-floating mt-2 mb-2">  
                        <input className="form-control w-70" id="inputLocation" onChange={(e)=> setLocation(e.target.value)} value={location} type="text" placeholder="Location"/>
                        <label for="inputLocation">Location</label>
                    </div>
                    <div className="form-floating mt-2 mb-2">  
                        <input className="form-control w-70" id="inputPrice" onChange={(e)=> setPrice(e.target.value)} value={price} type="text" placeholder="Price"/>
                        <label for="inputPrice">Price</label>
                    </div>
                    <div className="input-group mt-2 mb-7">    
                        <input className="form-control" id="fileUpload" onChange={handleImage} type="file" placeholder="Image" accept=".jpeg, .png, .jpg"/>
                    </div>
                    {img ? <img className="mt-2 mb-7" src={img}/> : <img className="mt-2" src="https://via.placeholder.com/400x250.png?text=No+Image+Selected"/>}
                <br/>
                <br/>
                {prompt} 
                <button className="btn btn-dark text-white mt-4" onClick={handleSubmit} href="./home" >Add Item</button>
            </form>
        </div>
    )
}

export default AddPage;