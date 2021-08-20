require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const user = require('./backend/routes/users.js');
const fileUpload = require('express-fileupload')

// const multer = require('multer')
// const upload = multer({ dest: './img/uploads/' })

// const Product = require('./backend/models/product')
const apiProductRoutes = require('./backend/routes/productRoutes')

const app = express();
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, "frontend", "build")))
app.use(cors());
const PORT = process.env.PORT

app.use('/user', user);
app.get('/', (req, res) => {
    res.send("start")
})

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => {
        console.log("connected to db")
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("responding")
})


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './img/uploads/')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })
// const upload = multer({ storage: storage }).single('uploaded_file')

// app.post('/api/addProduct', function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//     upload(req, res, (err) => {
//         if (err) {
//             return res.status(500).json(err)
//         } else {
//             console.log(req.file, req.body)
//         }
//         return res.status(200).json(err)

//     })

// })

app.use('/api', apiProductRoutes);


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

