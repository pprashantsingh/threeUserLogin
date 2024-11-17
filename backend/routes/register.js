const router = require('express').Router()
const reg = require('../controller/register')

router.post('/register',reg.register)

module.exports = router