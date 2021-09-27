const express = require('express');
const cors = require('cors');

const session = require('express-session');
const PerisTableDB = require('connect-mongodb-session')(session);

require('dotenv').config()
const connectDB = require('./models/db');
const itemsModel = require('./models/item');
const seed = require('./models/seed');

const mongoSessions = process.env.ATLAS_URI;
connectDB(mongoSessions);

const store = new PerisTableDB({
    uri: mongoSessions,
    collection: "currentSessions",
});

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
    session({
        secret: "secret",
        resave: false, 
        saveUninitialized: false, // no changes, nothing change
        store: store,
        maxAge: 7 * 24 * 60 * 60 * 1000 // session to last for 7 day
    })
);

// READ - get
app.get("/home", async (req, res) => {
    try {
        const data = await itemsModel.find({}); 
        res.send(data);
        console.log({status: 'ok', msg: 'get'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// READ - get
app.get("/seed", async (req, res) => {
    try {
        await itemsModel.deleteMany({});
        const data = await itemsModel.create(seed); 
        res.send(data);
        console.log({status: 'ok', msg: 'seeded'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

app.get('/show/:id', async (req, res) => {
    console.log('getting one')
    try {
        const data = await itemsModel.findOne({_id: req.params.id});
        res.send(data);
        console.log({status: 'ok', msg: 'get one'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// CREATE - post
app.post("/add", async (req, res) => {
    try {
        const data = await itemsModel.create(req.body); 
        res.send({status: 'ok', msg: 'added'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// UPDATE - put
app.put("/edit/:id", async (req, res) => {
    try {
        await itemsModel.updateOne({_id: req.params.id}, req.body); 
        const data = await itemsModel.findOne({_id: req.params.id}); 
        res.send(data);
        console.log({status: 'ok', msg: 'editted'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

// DELETE - delete
app.delete("/delete/:id", async (req, res) => {
    try {
        await itemsModel.deleteOne({_id: req.params.id}); 
        const data = await itemsModel.find({}); 
        res.send(data);
        console.log({status: 'ok', msg: 'deleted'});
    } catch (error) {
        console.log({status: 'bad', msg: error.message});
    }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
