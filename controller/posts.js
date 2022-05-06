const Post = require('../models/postsModel')
const User = require('../models/userModel')

const posts = {
  getData: async (req, res) => {
    // asc 遞增(由小到大，由舊到新) createdAt ; 
    // desc 遞減(由大到小、由新到舊) "-createdAt"
    const timeSort = req.query.timeSort === "asc" ? "createdAt" : "-createdAt"
    const q = req.query.q !== undefined ? { "content": new RegExp(req.query.q) } : {}
    const post = await Post.find(q).populate({
      path: 'user',
      select: 'name photo'
    }).sort(timeSort)

    res.status(200).json({
      post
    })
  },
  postData: async (req, res) => {
    try {
      const data = req.body
      if (data.content && data.user) {
        const checkUser = await User.findById(data.user)
        if (checkUser) {
          const newPost = await Post.create(data)
          res.status(200).json({
            status: 'success',
            newPost
          })
        } else {
          res.status(400).json({
            status: 'false',
            message: '查無使用者 ID'
          })
        }
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
  },
  deleteAllData: async (req, res) => {
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
  },
  deleteSingleData: async (req, res) => {
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
  },
  patchData: async (req, res) => {
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
  }
}


module.exports = posts