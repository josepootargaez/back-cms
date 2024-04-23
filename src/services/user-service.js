
const {validateEmail}= require("../helpers/validations");
const User = require('../models/user-model');
const PermitUser = require('../models/permitsUser-model');
const {connection,closeConnection} = require('../../database/connection');
const getAllUser = async () =>{
    try {
      await connection();
      const users = await User.find();
      await closeConnection();  
      return users;
      } catch (error) {
        console.error(error);
        return error
      }
}

const getAllRole = async () =>{
  try {
    await connection();
    const roles = await PermitUser.find();
    await closeConnection();  
    return roles;
    } catch (error) {
      console.error(error);
      return error
    }
}

const createUserService = async (body) =>{
    try {
      await connection();
      const user = new User({
        email:body.email,
        username:body.username,
        idPermission:body.idPermission
      })
      const idPermits = await PermitUser.findOne({idPermits:body.idPermission});
      if (!idPermits) {
        throw {message:`No existe el rol en los catálgos`, status:404};
      }
      const email = await User.findOne({email:body.email});
      if(email){
        throw {message:`Ya existe el correo ingresado`, status:400};
      }

      const username = await User.findOne({username:body.username});
      if(username){
        throw {message:`Ya existe el username ingresado`, status:400};
      }

      const users = await user.save();
      await closeConnection()
      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  const createRoleService = async (body) =>{
    try {
      await connection();
    const userRole = new PermitUser({
      name:body.name,
      idPermits:body.idPermits
    })
    const username = await PermitUser.findOne({name:body.name});
      if(username){
        throw {message:`Ya existe el nombre del rol ingresado`, status:400};
      }

    const id = await PermitUser.findOne({idPermits:body.idPermits});
      if(id){
        throw {message:`Ya existe el id del rol ingresado`, status:400};
      }

    const role = await userRole.save();
    await closeConnection()
    return role;
  } catch (error) {
      console.error(error);
      throw error;
    }
}


module.exports ={
    getAllUser,
    createUserService,
    createRoleService,
    getAllRole
}