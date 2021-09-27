const express = require('express');
const cors = require('cors');

const session = require('express-session');
const PerisTableDB = require('connect-mongodb-session')(session);

const connectDB = require('./models/db');

const mongoSessions = "mongodb+srv://grocerytracker:grocerytracker123@cluster0.h3idv.mongodb.net/sessions?retryWrites=true&w=majority"
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
