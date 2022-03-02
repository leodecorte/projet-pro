const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

// display all products
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM users'
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: `Invalid request: ${err}`
            });
        }


        if (result.length) res.json(result);
        else res.json({})
    })
})

// Register 
router.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        let sql = 'INSERT INTO users (username, password) VALUES (?, ?)'
        db.query(sql, [username, hash], (err, result) => {
            if (err) {
                res.status(400).json({
                    message: `Invalid request: ${err}`
                });
            }
            else return res.status(201).json({
                message: 'Success'
            })
        })

        if (err) throw err;        
    })

})

// Login
router.get('/login', (req, res) => {
    if(req.session.user) {
        res.send({
            loggedIn: true,
            user: req.session.user
        })
    } else {
        res.send({
            loggedIn: false
        })
    }
})
router.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;


    let sql = 'SELECT * FROM users WHERE username = ?'
    db.query(sql, [username], (err, result) => {
        if (err) {
            res.status(400).send(err);
            return;
        }

        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if(response) {
                    const id = result[0].id
                    const token = jwt.sign({id}, 'privateKey', {
                        expiresIn: 300,
                    })
                    req.session.user = result
                    // res.send(result)
                    res.json({
                        auth: true,
                        token: token,
                        result: result
                    })
                } else {
                    res.json({
                        auth: false,
                        error: error,
                        message: 'Wrong username or password!'
                    })
                }
            })
        }
        else res.json({
            auth: false,
            message: "User doesn't exist"
        })

    })

})

module.exports = router;