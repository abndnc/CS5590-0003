var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  updated_date: {type: Date, default: Date.now},
});


const User = mongoose.model('User',UserSchema);

module.exports = User ;
