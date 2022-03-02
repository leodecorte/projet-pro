const express = require('express')
const db = require('../config/db') 
const authValidation = require('../validations/auth')

const app = express()

// Handles authentication for users 
app.post('/auth', (req, res) => {

    // Get decrypted email and password from headers
    let requestBody = getCredentialsFromHeaders(req);

    // Validation authentication
    const {error} = authValidation(requestBody)

    if (error) {
        res.json({
            id: '',
            message: error.details[0].message
        })
    } else {
        let sql = `SELECT id FROM users WHERE email = '${req.email}' AND password = '${req.password}'`;

        db.query(sql, (err, result) => {
            if(err) {
                res.status(400).send(err);
                return;
            } 

            if (result.length) res.json(result[0])
            else res.json({
                id: '',
                message: 'Wrong username or password!'
            })
        })
    }
})

// Get user's credentials from the headers
function getCredentialsFromHeaders(req) {

    // Get the authorization from headers
    let authorization = req.header('authorization')

    // Convert authorization to array
    let authData = authorization.split(' ')

    // Convert to utf-8
    let token = Buffer.from('${authData[1]}', 'base64').toString('utf-8')

    // Convert token to array
    let credentials = token.split(':')

    return {
        email: credentials[0],
        password: credentials[1]
    }
} 


