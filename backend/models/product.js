const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: Number
}, { timestamps: true })

const Product = mongoose.model('product', productSchema)

module.exports = Product