const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//usuarios
const UserSchema = new Schema({
  username: {
    type: String,
    unique : true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('user', UserSchema);
