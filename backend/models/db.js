<<<<<<< HEAD
const mongoose = require("mongoose");
require('dotenv').config()

const db = process.env.MONGODBURI
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("Yoohoo! DB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // 1 with issue, 0 without
    }
};
=======
const mongoose = require("mongoose");

const db = "mongodb+srv://grocerytracker:grocerytracker123@cluster0.h3idv.mongodb.net/Peristable?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log("Yoohoo! DB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // 1 with issue, 0 without
    }
};
>>>>>>> production
module.exports = connectDB;