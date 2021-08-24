const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user.js')

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
        required: true,
        default: 1
    },
    p_amount: {
        type: Number,
        required: true,
        default: 1,
    },
    p_description: {
        type: String,
        required: false
    },
    p_owner: {
        type: String,
        required: false
    },
    p_category: {
        type: [String],
        required: true,
        default: ['Sonstiges']
    },
    p_forFree: {
        type: Boolean,
        required: true,
        default: false
    },
    p_priceFlex: {
        type: Boolean,
        required: true,
        default: false
    },
    p_toGiveAway: {
        type: Boolean,
        required: true,
        default: true
    },
    p_call: {
        type: Number,
        required: false
    },
    p_street: {
        type: String,
        required: false
    },
    p_city: {
        type: String,
        required: false
    },
    p_PLZ: {
        type: String,
        required: false
    },
    p_isSold: {
        type: Boolean,
        required: true,
        default: false
    },
    p_lovers: {
        type: [String],
        required: true,
        default: ['611e44bb2e64921e848d7f19']
    },
    p_ownerID: {
        // type: [User],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }

}, { timestamps: true })

const Product = mongoose.model('product', productSchema)

module.exports = Product