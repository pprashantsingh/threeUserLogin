const mongoose = require('mongoose')
const register = require('./register')

let session = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId,ref:register},
    token:String,
    createdAt :{type:Date,default:Date.now()}
})

module.exports = new mongoose.model('session',session)