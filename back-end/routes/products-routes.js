const express = require('express')
const router = express.Router()
const db = require('../config/db')
const multer = require('multer')
const path = require('path')

// GET /products → getAll()
// POST /products → create()
// PUT /products/:id → update()
// DELETE /products/:id → remove()

// Upload photo Multer
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')     // directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


// Get All - display all products
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM products'
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                error: {
                    status: err.status || 500,
                    message: err.message || "Internal Server Error",
                },
            })
            return;
        }

        if (result.length) res.json(result);
        else res.json({})
    })
})
// Get By Category
router.get('/category/:category', (req, res) => {
    let sql = `SELECT * FROM products WHERE category = '${req.params.category}' ORDER BY id DESC LIMIT 1 `
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                error: {
                    status: err.status || 500,
                    message: err.message || "Internal Server Error",
                },
            })
            return;
        }

        if (result.length) res.json(result);
        else res.json({})
    })
})
// Get By Id
router.get('/:id', (req, res) => {
    let sql = `SELECT * FROM products WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                error: {
                    status: err.status || 500,
                    message: err.message || "Internal Server Error",
                },
            })
            return;
        }

        if (result.length) res.status(200).json(result);
        else res.json({})
    })
})
// Add product
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        console.log(req.file)
        const name = req.body.name
        const description = req.body.description
        const category = req.body.category
        const price = req.body.price
        const img_url = 'http://localhost:3005/uploads/' + req.file.filename
        let sql = `INSERT INTO products (name, description, category, price, img_url) VALUES ('${req.body.name}', '${req.body.description}', '${req.body.category}', '${req.body.price}', '${img_url}')`
        // var sql = "INSERT INTO products(img_url)VALUES(?)"
        console.log(sql)
        db.query(sql, (err, result) => {
            if (err) {
                res.status(400).json({
                    error: {
                        status: err.status || 500,
                        message: err.message || "Internal Server Error",
                    },
                })
                return;
            }

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Product Successfully Created!'
            })
        })

    }
})

// Update product
router.put("/:id", (req, res) => {
    const sql = `UPDATE products SET name = '${req.body.name}', description = '${req.body.description}', category = '${req.body.category}', price = '${req.body.price}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                error: {
                    status: err.status || 500,
                    message: err.message || "Internal Server Error",
                },
            })
            console.log(err)
            return;
        }

        res.status(200).json({
            status: 200,
            success: true,
            message: 'Product Updated!'
        })
    }
    );
});


// Delete product
router.delete('/:id', (req, res) => {
    let sql = `DELETE FROM products WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                error: {
                    status: err.status || 400,
                    message: err.message || "Internal Server Error",
                },
            })
            return;
        }

        res.status(200).json({
            status: 200,
            success: true
        })
    })
})
// Upload photo

// var storage = multer.diskStorage({
//     destination: (req, file, callBack) => {
//         callBack(null, './uploads/')     // directory name where save the file
//     },
//     filename: (req, file, callBack) => {
//         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage: storage
// })

// router.post("/upload", upload.single('file'), (req, res) => {
//     if (!req.file) {
//         console.log("No file received");
//         return res.send({
//             success: false
//         });
//     } else {
//         console.log(req.file)
//         var img_url = 'http://localhost:3005/uploads/' + req.file.filename
//         var sql = "INSERT INTO products(img_url)VALUES(?)"
//         db.query(sql, [img_url], (err, result) => {
//             if (err) throw err
//             console.log("file uploaded")
//         })
//         // console.log('file received');
//         return res.send({
//             status: 200,
//             success: true
//         })
//     }
// });

// router.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         console.log('Request --- ', req.body)
//         console.log('Request file --- ', req.file)
//         if(!err) {
//             return res.send(200).end()   
//         }
//     });
// });

// Random menu
// router.get('/menu', (req, res) => {

//     const menu = Math.random() * 100
//     let sql = 'SELECT * FROM products'
//     db.query(sql, (err, result) => {
//         if(err) {
//             res.status(400).json({
//                 error: {
//                   status: err.status || 500,
//                   message: err.message || "Internal Server Error",
//                 }, })
//             return;
//         }

//         if(result.length) res.json(result);
//         else res.json({})
//     })
// })

module.exports = router;