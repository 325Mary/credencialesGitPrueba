const Controller = {};

const {
    newRol,
    getRoles
} = require("../services/roles.service");


Controller.getRoles = async (req, res) => {
  const listRoles = await getRoles();
  res.json(listRoles); 
};

Controller.newRol = async (req, res) => {
  await newRol(req.body);
  res.send("Rol guardado exitosamente");
};


module.exports = Controller;
