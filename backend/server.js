const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(cors())
app.use(bodyParser.json())
const login = require('./routes/login')
const register = require('./routes/register')
app.use('/api',login)
app.use('/api',register)

mongoose.connect('mongodb://127.0.0.1:27017/practiceDB',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log('mongoDb connected')).catch(err=>console.log(err))




app.listen(port,()=>{
    console.log(`backend is running on port ${port}` )
})

