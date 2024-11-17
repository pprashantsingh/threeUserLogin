let route = require('express').Router()
let login = require('../controller/login')

route.post('/login',login.Login);
route.post('/logout',login.Logout)


module.exports =route