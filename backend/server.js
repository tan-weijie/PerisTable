const express = require('express');
const User =require ("./models/User.js")
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET;
console.log("secret",secret)
//const session = require('express-session')
//const PerisTableDB = require('connect-mongodb-session')(session);

const connectDB = require('./models/db')
const mongoSessions = process.env.SESSION
connectDB(mongoSessions);

// const store = new PerisTableDB({
//     uri: mongoSessions,
//     collection: "currentSessions",
// });

const app = express()
app.use(express.json({extended:true}))
app.use (express.urlencoded ({extended: true}))
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

app.get('/user', (req,res)=>{
    const payload = jwt.verify(req.cookies.token,secret)
    User.findById(payload.id)
        .then(userInfo =>{
            res.json({id:userInfo._id,username:userInfo.username,email:userInfo.email})
        })
})


app.post('/signup',(req,res)=>{
    const {username, email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const user = new User({username,password:hashedPassword,email})
    user.save().then(userInfo =>{
        jwt.sign({id:userInfo._id,username:userInfo.username,email:userInfo.email},secret, (err,token)=>{
            if (err){
                console.log(err);
            } else {
                res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
            }
        })
    })
})


app.post('/login',(req,res)=>{
    const {username,email,password} = req.body;
    console.log("hohoa")
    User.findOne({email})
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
                    res.send("Invalid Email or Password")
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


app.post('/logout',(req,res)=>{
    res.cookie('token','').send()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});






// mongoose.connect('mongodb://localhost:55555/authPeris', {useNewUrlParser:true, useUnifiedTopology:true},
// (err) => {
//     if (err) return console.error(err);
//     console.log("Connected to MongoDB");
//   })
// const db = mongoose.connection;
// db.on('error',console.log)



// const app = express()
// app.use(cookieParser());
// app.use(bodyParser.json({extended:true}))
// app.use (bodyParser.urlencoded ({extended: true}))
// app.use(cors({ 
//     credentials:true,
//     origin:"http://localhost:3000",
// }))



// app.get('/',(req,res)=>{
//     res.send("ok")
// })

// app.get('/user', (req,res)=>{
//     const payload = jwt.verify(req.cookies.token,secret)
//     User.findById(payload.id)
//         .then(userInfo =>{
//             res.json({id:userInfo._id,username:userInfo.username,email:userInfo.email})
//         })
// })


// app.post('/register',(req,res)=>{
//     const {username, email,password} = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 10)
//     const user = new User({username,password:hashedPassword,email})
//     user.save().then(userInfo =>{
//         jwt.sign({id:userInfo._id,username:userInfo.username,email:userInfo.email},secret, (err,token)=>{
//             if (err){
//                 console.log(err);
//                 res.sendStatus(500);
//             } else {
//                 res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
//             }
//         })
//     })
// })


// app.post('/login',(req,res)=>{
//     const {username,email,password} = req.body;
//     console.log("hohoa")
//     User.findOne({email})
//     .then(userInfo=>{
//         try{
//             console.log('hohoa2')
//             console.log('password',password)
//             console.log('userinfopassword',userInfo.password)
//             const passOk = bcrypt.compareSync(password,userInfo.password);
//             console.log('hohoa3')    
//             if (username && email && passOk){
//                 jwt.sign({
//                 id:userInfo._id,
//                 username, 
//                 email},
//                 secret,
//                 (err,token)=>{
//                 if (err){
//                     console.log(err);
//                     res.sendStatus(500);
//                     res.send("Invalid Email or Password")
//                     return next(err);
//                 } else {
//                     res.cookie("token",token).json({id:userInfo._id,username:userInfo.username,email:userInfo.email});
//                 }
//                 })
//             } else {
//                 res.sendStatus(401).send()
//             }
//         } catch(err){
//             console.log('caught error',err)
//             res.send("err")
//         }
    
//     })
// })



// app.post('/logout',(req,res)=>{
//     res.cookie('token','').send()
// })

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
// });