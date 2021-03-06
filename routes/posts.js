const express = require('express')
const router = express.Router()
const posts = require('../controller/posts.js')

router.get('/', (req, res, next) => {
  posts.getData(req, res)
})

router.post('/', (req, res, next) => {
  posts.postData(req, res)
})

router.delete('/', (req, res, next) => {
  posts.deleteAllData(req, res)
})

router.delete('/:id', (req, res, next) => {
  posts.deleteSingleData(req, res)
})

router.patch('/:id', (req, res, next) => {
  posts.patchData(req, res)
})

module.exports = router