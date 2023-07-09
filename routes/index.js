const router = require('express').Router()
const users = require('./modules/users')
const home = require('./modules/home')

router.use('/users', users)
router.use('/', home)

module.exports = router