const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    tags: [
      {
        type: String,
        required: [true, '標籤不能為空字串']
      },
    ],
    type: {
      type: String,
      enum: ['group', 'person']
    },
    name: {
      type: String,
      required: [true, "名稱為必填"]
    },
    content: {
      type: String,
      required: [true, '內容為必填']
    },
    image: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: {
      type: Number,
      default: 0
    }
  },
  {
    versionKey: false
  }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post