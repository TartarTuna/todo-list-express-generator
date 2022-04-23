const express = require('express')
const router = express.Router()
const Post = require('../models/postsModel')

router.get('/', async function (req, res, next) {
  const post = await Post.find()

  res.status(200).json({
    post
  })
})

router.post('/', async function (req, res, next) {
  const data = req.body
  const newPost = await Post.create(data)

  res.status(200).json({
    status: 'success',
    newPost
  })
})

router.delete('/', async function (req, res, next) {
  await Post.deleteMany({})

  res.status(200).json({
    status: 'success'
  })
})

router.delete('/:id', async function (req, res, next) {
  const id = req.params.id
  await Post.findByIdAndDelete(id)
  const posts = await Post.find()

  res.status(200).json({
    status: 'success',
    posts
  })
})

router.patch('/:id', async function (req, res, next) {
  const id = req.params.id
  const title = req.body.title
  const image = req.body.image

  const newPost = await Post.findByIdAndUpdate(
    id,
    {
      title,
      image
    },
    { new: true }
  )

  res.status(200).json({
    status: 'success',
    newPost
  })
})

module.exports = router