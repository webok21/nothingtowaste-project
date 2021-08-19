require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const user = require('./backend/routes/users.js');

// const Product = require('./backend/models/product')
const apiProductRoutes = require('./backend/routes/productRoutes')


const app = express();

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

app.use('/api', apiProductRoutes);


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
// })

