const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const mongoose = require('mongoose')

const app = express()
dotenv.config({ path: "./config.env" })

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
)

mongoose.connect(DB)
    .then(res=> console.log("連線資料成功"))
    .catch(err => console.log(err.message))

// mongoose.connect('mongodb://localhost:27017/todoExpress')
//     .then(res=> console.log("連線資料成功"))

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)

module.exports = app
