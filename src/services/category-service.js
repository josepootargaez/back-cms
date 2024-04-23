const categoryModel = require('../models/category-model');
const { connection, closeConnection } = require('../../database/connection');
const User = require('../models/user-model');
const mongoose = require('mongoose');
const createCat = async (body) => {
    try {
        if(body.idUser == null || body.idUser == undefined){
            throw {message:`El id del usuario es requerido`, status:400};
        }
        if(!mongoose.Types.ObjectId.isValid(body.idUser)){
            throw {message:`El id del usuario no tiene un formato válido`, status:400};
        }
        await connection();
        const user = await User.findById(body.idUser);
        if(!user){
            throw {message:`el id del usuario no existe`, status:404};
        }
        if(user.rol !== "admin" && user.rol !== "creador"){
            throw {message:`No tienes permisos para realizar esta acción`, status:401};
        }
        const username = await categoryModel.findOne({name:body.name});
        if(username){
            throw {message:`Ya existe el nombre de la categoria ingresada`, status:400};
        }

        const id = await categoryModel.findOne({idCat:body.idCat});
        if(id){
            throw {message:`Ya existe el id de la categoria ingresada`, status:400};
        }

        const category = new categoryModel({
            name: body.name,
            idCat:body.idCat,
            idUser:body.idUser
        })
        const cat = await category.save();
        await closeConnection()
        return cat;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllCategories = async () =>{
    try {
      await connection();
      const categories = await categoryModel.find();
      await closeConnection();  
      return categories;
      } catch (error) {
        console.error(error);
        return error
      }
  }

module.exports={
    createCat,
    getAllCategories
}