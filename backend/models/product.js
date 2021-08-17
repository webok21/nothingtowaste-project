const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    p_titel: {
        type: String,
        required: false
    },
    p_imageUrl: {
        type: String,
        required: false
    },
    p_mark: {
        type: String,
        required: false
    },
    p_shiping: {
        type: Boolean,
        required: true,
        default: true
    },
    p_pickup: {
        type: Boolean,
        required: true,
        default: true
    },
    p_price: {
        type: Number,
        required: false
    },
    p_amount: {
        type: Number,
        required: false
    },
    p_description: {
        type: String,
        required: false
    },
    p_owner: {
        type: String,
        required: false
    }

}, { timestamps: true })

const Product = mongoose.model('product', productSchema)

module.exports = Product