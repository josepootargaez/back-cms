const mongoose = require('mongoose');

const permitsUserSchema = new mongoose.Schema({
  name: { type: String, required:true },
  idPermits: { type: String,unique: true, required:true}
});

module.exports = mongoose.model('PermitsUsers', permitsUserSchema);