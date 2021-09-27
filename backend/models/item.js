const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        itemName: {type: String, required: true },
        category: {type: String, required: true },
        qty: {type: Number, required: true },
        purchaseDate: {type: Date, required: true},
        expiryDate: { type: Date, required: true },
        location: { type: String, required: true },
        price: {type: Number, required: true},
        img: {type: String, data: Buffer, required: true}
    }, 
    {   
        collection: "items"
    }
)

const itemsModel = mongoose.model("itemsModel", itemSchema );

module.exports = itemsModel
