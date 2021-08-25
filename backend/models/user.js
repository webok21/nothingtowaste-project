const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('./product.js')

const productTest = new Schema({ name: { type: String }, amount: { type: Number } });
const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
    likedItems: {
        // type: [productTest],
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        required: false
    }
})



const User = mongoose.model("user", userSchema);

module.exports = User