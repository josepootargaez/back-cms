const mongoose = require('mongoose');
require('dotenv/config');
const url = process.env.MONGO_URI;
const  connection =  async () => {

  try {
    const options = {
      connectTimeoutMS: 30000
    }
    // Conexión a la base de datos
    return await mongoose.connect(url,options);

  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
  }
}

const  closeConnection =  async () => {
  try {
    // Conexión a la base de datos
   return await mongoose.connection.close();

  } catch (error) {
    console.error('Error al conectar con MongoDB:', error.message);
  }
}

module.exports = {connection,closeConnection};