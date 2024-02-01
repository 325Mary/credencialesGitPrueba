const rol = require('../models/roles.model');


const newRol = async (Rol) => {
  
    let newRol= new rol(Rol);
    return await newRol.save();
  };

const getRoles = async () => {
    return await rol.find();
  };
   


module.exports = {
    newRol,
    getRoles
};
