const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String,unique: true,required:true },
  email: { type: String,unique: true,required:true,index:true },
  rol:{ type: String,required:true },
  
});

module.exports = mongoose.model('Users', userSchema);