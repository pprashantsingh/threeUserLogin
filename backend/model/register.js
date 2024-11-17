const mongoose = require('mongoose')

const register = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports = new mongoose.model('register',register)