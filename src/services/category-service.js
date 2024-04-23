const categoryModel = require('../models/category-model');
const { connection, closeConnection } = require('../../database/connection');

const createCat = async (body) => {
    try {
        await connection();
        const category = new categoryModel({
            name: body.name,
            idCat:body.idCat
        })

        const username = await categoryModel.findOne({name:body.name});
        if(username){
            throw {message:`Ya existe el nombre de la categoria ingresada`, status:400};
        }

        const id = await categoryModel.findOne({idCat:body.idCat});
        if(id){
            throw {message:`Ya existe el id de la categoria ingresada`, status:400};
        }
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