require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const app = express()
const path = require('path');
const Product = require('./backend/models/product')
const apiProductRoutes = require('./backend/routes/productRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "frontend", "build")))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => {
        console.log("connected to db")
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("responding")
})

app.use('/api', apiProductRoutes)


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

