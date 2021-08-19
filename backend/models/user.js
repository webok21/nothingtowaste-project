const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true }, 
    email: { type: String, require: true},
    password: { type: String, require: true},
    id: { type: String }
})



const User = mongoose.model("user", userSchema);

module.exports = User