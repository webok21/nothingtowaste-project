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
app.get('/post', (req, res) => {
    res.send("posting")
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
//     const product = new Product(req.body)
//     console.log(req.body)
//     product.save()
//         .then((result) => {
//             console.log(result)
//             res.end()
//         })
//         .catch((err) => { console.log(err) })
// })

app.post('/post', (req, res) => {
    console.log(req.body)
    const product = new Product({
        //my req.body but more defined
        p_titel: 'Polaroid',
        p_imageUrl: './frontend/src/img/shop/polaroid',
        p_mark: 'Nokia',
        p_shiping: true,
        p_pickup: true,
        p_price: 273,
        p_amount: 1,
        p_description: 'Größe 38, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ac id elementum nec dolor. Ridiculus diam ac tellus id egestas mauris sed etiam. Amet, at eu tristique quis. Massa fermentum eget pharetra magna vitae vitae ultricies consequat. Amet, integer diam sit netus adipiscing eu vestibulum vitae ut. Sem vel fringilla malesuada amet. Tellus massa amet porta vel in. Viverra non proin tempus viverra rhoncus volutpat ac. Accumsan facilisi orci et amet vitae mauris scelerisque sed.',
        p_owner: 'ixavierayix@gmail.com'
    })
    product.save()
        .then((result) => {
            console.log(result)
            res.json({ result })
        })
        .catch((err) => {
            console.log(err)
            // res.json({ redirect: "/404" })
        })
})

// app.use('/api/products', apiProductRoutes)
// app.use('/', apiRoutes)

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

