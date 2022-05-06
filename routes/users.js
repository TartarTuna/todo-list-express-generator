const express = require('express')
const router = express.Router()
const users = require('../controller/users.js')

router.get('/', (req, res, next) => {
  users.getData(req, res)
})

router.get('/login', (req, res, next) => {
  users.getData(req, res)
})

module.exports = router
