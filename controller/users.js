const User = require('../models/userModel')

const users = {
  getData: async(req, res) => {
    const user = await User.find()
    res.status(200).json({
      user
    })
  }
}

module.exports = users