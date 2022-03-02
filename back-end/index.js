const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const session = require('express-session');
const jwt = require('jsonwebtoken');

const multer = require('multer');

// Connect to database
db.connect((err) => {
    if (err) throw err
})

const app = express()
// Allow api for cross origin resource sharing
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
// Allow api for parsing json
app.use(express.json())
// Allow api to receive data from a client app
app.use(express.urlencoded({
    extended:true
}))

app.use(session({
    key: 'userId',
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: 60 * 60 * 24,
        // secure: true
     }
}))


// Use Multer
// app.use(express.static("./public"))
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

// simple route
app.get('/', (req, res) => {
    res.send('Welcome to my app!')
})
// products routes
const prodRouter = require('./routes/products-routes');
app.use('/products', prodRouter)

// Admin routes
var usersRouter = require('./routes/users-routes');
app.use('/users', usersRouter)

// User Athentication
const userAuth = require('./routes/users-auth');
app.use('/auth', userAuth)


const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})