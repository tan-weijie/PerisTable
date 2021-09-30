const express = require('express');
const User =require ("./models/User.js")
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cookieParser = require("cookie-parser")


const itemsModel = require('./models/item');
const seed = require('./models/seed');

const secret = process.env.SECRET;
console.log("secret",secret)

const connectDB = require('./models/db')
const mongoSessions = process.env.SESSION
connectDB(mongoSessions);

const app = express()
app.use(express.json({limit: "30mb", extended:true}))
app.use (express.urlencoded ({limit: "30mb", extended: true}))
app.use(cookieParser())

app.use(cors({ 
    credentials:true,
    origin:"http://localhost:3000",
}))

// app.use(
//     session({
//         secret: "secret",
//         resave: false, 
//         saveUninitialized: false, // no changes, nothing change
//         store: store,
//         maxAge: 7 * 24 * 60 * 60 * 1000 // session to last for 7 day
//     })
// );

app.get('/',(req,res)=>{
    res.send("test")
})

//verify cookie data with token data, to stay logged in
app.get('/user', (req,res)=>{
    const payload = jwt.verify(req.cookies.token,secret)
    User.findById(payload.id)
        .then(userInfo =>{
            res.json({id:userInfo._id,username:userInfo.username,email:userInfo.email})
        })
})

//sign up, jwt sign, pass payload (userinfo), with secret key, send a token inside the cookie
app.post('/signup',async (req,res)=>{
    const {username, email,password} = req.body;
    if (!username || !email || !password)
        return res.json({ errorMessage: "Please enter all required fields." });

    const hashedPassword = bcrypt.hashSync(password, 10)
    try{
        const user = await new User({username,password:hashedPassword,email})
        await user.save().then(userInfo =>{
            jwt.sign({id:userInfo._id,username:userInfo.username,email:userInfo.email},secret, (err,token)=>{
                if (err){
                    console.log(err);
                } else {
                    res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
                }
            })
            
    })
    } catch (err) {
        console.log("blaaas",err);
        return res.json({ errorMessage: "Existing user." });
    }
    
})

//login
app.post('/login',async (req,res)=>{
    const {username,email,password} = req.body;
    console.log("hohoa")
    await User.findOne({email})
    .then(userInfo=>{
        try{
            console.log('hohoa2')
            console.log('password',password)
            console.log('userinfopassword',userInfo.password)
            const passOk = bcrypt.compareSync(password,userInfo.password);
            console.log('hohoa3')    
            if (username && email && passOk){
                jwt.sign({
                id:userInfo._id,
                username, 
                email},
                secret,
                (err,token)=>{
                if (err){
                    console.log(err);
                    res.send("Invalid Input")
                    return next(err);
                } else {
                    res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
                }
                })
            } else {
                res.send("issue")
            }
        } catch(err){
            console.log('caught error',err)
            res.send("err")
        }
    
    })
})

//logout
app.post('/logout',(req,res)=>{
    res.cookie('token','').send()
})


// READ - get
app.get("/home/:username", async (req, res) => {
    try {
        const data = await itemsModel.find({username: req.params.username}); 
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
// READ - get one
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
