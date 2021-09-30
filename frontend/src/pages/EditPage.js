import React, {useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';

const EditPage = () => {
    const [item, setItem] = useState();
    const [category, setCategory] = useState();
    const [quantity, setQuantity] = useState();
    const [expiryDate, setExpiryDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [img, setImg] = useState('lala');
    const [prompt, setPrompt] = useState('');

    const {id} = useParams();

    const [data, setData] = useState([]);
    const uri = "http://localhost:5000/"

    console.log(id);

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

    useEffect(()=>{
        getOne();
        console.log('useeffect')
    },[])
    
    function getOne() {
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
            setImg(response.data.img);
            console.log("THIS",data);
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }
    
    function handleEdit(e) {
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
        }
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
        axios.put((uri + `edit/${id}`), data)
        .then(response =>{
            console.log('received editted data');
            console.log(response.data);
            // setData(response.data);
            console.log("THIS",data);
            window.location = "../home";
        })
        .catch((error)=> {
            console.log({status: 'bad', msg: error.message})
        })
    }

    console.log();

    return (
        <div className="center mt-4">
            <form>
                {img ? <img src={img}/> : <img src="https://via.placeholder.com/200x250.png?text=No+Image+Selected"/>}
                <div className="input-group mt-2 mb-7">    
                    <input className="form-control w-70" id="fileUpload" onChange={handleImage} type="file" placeholder="Image" accept=".jpeg, .png, .jpg"/>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="changeItem" onChange={(e)=> setItem(e.target.value)} value={item} type="text" placeholder="Item"/>
                    <label for="changeItem">Item Name</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <select className="form-select" id="changeSelect" onChange={(e)=> setCategory(e.target.value)} value={category}>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Meat">Meat</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Others">Others</option>
                    </select>
                    <label for="changeSelect">Category</label>
               </div>
               <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="changeQty" onChange={(e)=> setQuantity(e.target.value)} value={quantity} type="text" placeholder="Quantity"/>
                    <label for="changeQty">Quantity</label>
               </div>
               <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="changeExpiryDate" onChange={(e)=> setExpiryDate(e.target.value)} value={expiryDate.split('T')[0]} type="date"/>
                    <label for="changeExpiryDate">Expiry Date</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="changePurchaseDate" onChange={(e)=> setPurchaseDate(e.target.value)} value={purchaseDate.split('T')[0]} type="date"/>
                    <label for="changePurchaseDate">Purchase Date</label>
               </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="changeLocation" onChange={(e)=> setLocation(e.target.value)} value={location} type="text" placeholder="Location"/>
                    <label for="changeLocation">Location</label>
                </div>
                <div className="form-floating mt-2 mb-2">    
                    <input className="form-control w-70" id="changePrice" onChange={(e)=> setPrice(e.target.value)} value={price} type="text" placeholder="Price"/>
                    <label for="changePrice">Price</label>
                </div>
                {prompt}
                <button className="btn btn-dark text-white mb-2" onClick={handleEdit}>Submit Update</button>
            </form>
        </div>
    )
}

export default EditPage;