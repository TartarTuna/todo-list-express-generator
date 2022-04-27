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
  try {
    const data = req.body
    if (data.content) {
      const newPost = await Post.create(data)
      res.status(200).json({
        status: 'success',
        newPost
      })
    } else {
      res.status(400).json({
        status: 'false',
        message: '格式錯誤或缺少必填欄位'
      })
    }

  } catch (err) {
    res.status(400).json({
      status: 'false',
      message: err.message
    })
  }
})

router.delete('/', async function (req, res, next) {
  try {
    await Post.deleteMany({})
    res.status(200).json({
      status: 'success'
    })
  } catch (err) {
    res.status(400).json({
      status: 'false',
      message: err.message
    })
  }
})

router.delete('/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    const delPost = await Post.findByIdAndDelete(id)
    if (delPost) {
      const posts = await Post.find()
      res.status(200).json({
        status: 'success',
        posts
      })
    } else {
      res.status(400).json({
        status: 'false',
        message: '格式錯誤或 id 錯誤'
      })
    }
  } catch (err) {
    res.status(400).json({
      status: 'false',
      message: err.message
    })
  }
})

router.patch('/:id', async function (req, res, next) {
  try {
    const id = req.params.id
    const data = req.body

    if (data.content) {
      const newPost = await Post.findByIdAndUpdate(id, data)
      if (newPost) {
        const post = await Post.find()
        res.status(200).json({
          status: 'success',
          post
        })
      } else {
        res.status(400).json({
          status: 'false',
          message: 'id 填寫錯誤'
        })
      }
    } else {
      res.status(400).json({
        status: 'false',
        message: '格式錯誤或必填欄位未填'
      })
    }

  } catch (err) {
    res.status(400).json({
      status: 'false',
      message: err.message
    })
  }
})

module.exports = router