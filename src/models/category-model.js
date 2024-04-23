const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  name: { type: String,unique: true, required:true,lowercase: true},
  idCat:{ type: String, required:true },
  idUser:{ type: String, required:true },
});

module.exports = mongoose.model('Categories', categoriesSchema);