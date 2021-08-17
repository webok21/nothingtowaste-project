require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT
const app = express()
const Product = require('./backend/models/product')
const apiProductRoutes = require('./backend/routes/productRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, "frontend", "build")))

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(result => {
        console.log("connected to db")
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send("start")
})

// app.get('/', (req, res) => {
//     console.log('homepage')
//     console.log(req.body)
//     Contact.find()
//         .then((result) => {
//             console.log(result)
//             res.end()
//         })
//         .catch((err) => { console.log(err) })
// })

// app.post('/post', (req, res) => {
//     console.log('post made')
//     const contact = new Contact(req.body)
//     console.log(req.body)
//     contact.save()
//         .then((result) => {
//             console.log(result)
//             res.end()
//         })
//         .catch((err) => { console.log(err) })
// })

// app.use('/api/products', apiProductRoutes)
// app.use('/', apiRoutes)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

