import { Link } from "react-router-dom";

const ShowPage = () => {
    return (
        <div>
            <form>
                <table>
                    <tr>    
                        <label>Item Name: </label>
                        <input type="text" placeholder="Item"/>
                    </tr>
                    <tr>    
                        <label>Category: </label>
                        <input type="select" placeholder="Category"/>
                    </tr>
                    <tr>    
                        <label>Quantity: </label>
                        <input type="text" placeholder="Quantity"/>
                    </tr>
                    <tr>    
                        <label>Expiry Date: </label>
                        <input type="date" placeholder="Expiry Date"/>
                    </tr>
                    <tr>    
                        <label>Purchase Date: </label>
                        <input type="date" placeholder="Purchase Date"/>
                    </tr>
                    <tr>    
                        <label>Location: </label>
                        <input type="text" placeholder="Location"/>
                    </tr>
                    <tr>    
                        <label>Price: </label>
                        <input type="text" placeholder="Price"/>
                    </tr>
                </table> 
                <button>Add Item</button>
            </form>
        </div>
    )
}

export default ShowPage;