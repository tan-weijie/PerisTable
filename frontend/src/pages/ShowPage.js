import React, {useState, useEffect, useHistory} from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

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
        <div className="container">
            <div className="row mt-4">
                <div className="col-6 col-md-4">
                    {data.img ? <img src={data.img} className="card-img-top"/> : <img src="https://via.placeholder.com/200x250.png?text=No+Image+Selected"/>}
                </div>    
                <div className="col-md-8">  
                    <div>
                        <h3>{data.item}</h3>
                    </div> 
                    <div>    
                        <h6>{data.category}</h6>
                    </div> 
                    <div>    
                        <p>Quantity: {data.quantity}</p>
                    </div>
                    <div>    
                        <p>Bought on {pDate.toLocaleDateString('en-AU')} for ${data.price}</p>
                    </div>
                    <div>    
                        <p>Expiring on {eDate.toLocaleDateString('en-AU')}</p>
                    </div>
                    <div>    
                        <p>Currently store in {data.location}</p>
                    </div>
                    <div>    
                        <p>Price: ${data.price}</p>
                    </div>
                    <Link to={`../edit/${data._id}`} className="btn btn-dark me-2" id={data._id}>Edit</Link>
                    <a className="btn btn-dark" onClick={handleDelete} id={data._id}>Remove</a>
                </div>
            </div>

        </div>
    )
}

export default ShowPage;