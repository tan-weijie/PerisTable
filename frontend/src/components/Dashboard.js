import Navbar from "./Navbar";

const Dashboard = () => { //props or useContext;

    let data = [{category: "Vegetable", item: "carrots", expiryDate: "22/10/2021", location: "fridge"}]; // comment out later
    return (
        <div>
            <h1 style={{textAlign: "left"}}>PerisTable</h1>
            <Navbar/>
            <div style={{textAlign: "left"}}>
                <p>Total Items:</p>
                <p>Expired in 5 days:</p>
            </div>
            <br/>
            <table>
                <tr>
                    <td>Category</td>
                    <td>Item</td>
                    <td>Expiry Date</td>
                    <td>Location</td>
                </tr>
                <br/>
                {data.map(element => {
                    return (
                        <tr>
                            <td>{element.category}</td>
                            <td>{element.item}</td>
                            <td>{element.expiryDate}</td>
                            <td>{element.location}</td>
                            <td><button id={element._id} onClick>Edit</button></td>
                            <td><button id={element._id} onClick>Remove</button></td>
                            <br/>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default Dashboard;