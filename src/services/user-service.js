
const User = require('../models/user-model');
const PermitUser = require('../models/permitsUser-model');
const {connection,closeConnection} = require('../../database/connection');
const mongoose = require('mongoose');
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
      if(body.idPermission == null || body.idPermission == undefined){
        throw {message:`El id del catalogo es requerido`, status:400};
      }
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
      const user = new User({
        email:body.email,
        username:body.username,
        rol:idPermits.name
      })
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
    const username = await PermitUser.findOne({name:body.name});
      if(username){
        throw {message:`Ya existe el nombre del rol ingresado`, status:400};
      }

    const id = await PermitUser.findOne({idPermits:body.idPermits});
      if(id){
        throw {message:`Ya existe el id del rol ingresado`, status:400};
      }
      const userRole = new PermitUser({
        name:body.name,
        idPermits:body.idPermits
      })
    const role = await userRole.save();
    await closeConnection()
    return role;
  } catch (error) {
      console.error(error);
      throw error;
    }
}

  const loginUserService = async (body) =>{
    try {
      await connection();
    const username = await User.findOne({email:body.email});
      if(!username){
        throw {message:`No  existe el correo ingresado`, status:400};
      }

    await closeConnection()
    return username;
  } catch (error) {
      console.error(error);
      throw error;
    }
}


module.exports ={
    getAllUser,
    createUserService,
    createRoleService,
    getAllRole,
    loginUserService
}