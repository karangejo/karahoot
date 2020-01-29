const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

const userDB = mongoose.connection.useDb('users');

const userInfo = userDB.model('user', userSchema);

module.exports =  userInfo;

//module.exports = mongoose.model('user', userSchema)
