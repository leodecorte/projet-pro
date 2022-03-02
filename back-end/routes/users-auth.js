const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const token = req.headers['x-access-token']

    if(!token) {
        res.send('There is no token!')
    } else {
        jwt.verify(token, 'privateKey', (err, decoded) => {
            if(err) {
                res.json({
                    auth: false,
                    message: err
                })
            } else {
                req.userId = decoded.id
                next()
            }
        })
    }
}

router.get('/signin', verifyJWT, (req, res) => {
    res.send('Authentication Successfully!')
})



module.exports = router;