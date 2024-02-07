const { createUser, 
  loginUser, 
  getUsers,
  activeUser,
  changeUserPassword
  } = require('../services/user.services');

const User = require('../models/user.model');

const companyModel = require('../models/compay.model')

const rolModel= require ('../models/roles.model')





const controller = {};

//crear usuario 
controller.postUser = async (req, res) => {
  await createUser(req, res);
};

//activar usuario
controller.activeUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const activedUser = await activeUser(userId); 
    res.status(200).json(activedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//iniciar sesion
controller.postLogin = async (req, res) => {
  await loginUser(req, res);
};



//listar usuarios
controller.getUsers = async (req, res) => {
  try {
    const listUsers = await User.find().populate({
      path: 'tenantId',
      model: companyModel,
    })
    .populate({
      path: 'rol',
      mode: rolModel
    })

    res.json(listUsers); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Cambiar contraseña
controller.changePassword = async (req, res) => {
  const userId = req.params.id;
  const { newPassword } = req.body;
  try {
    await changeUserPassword(userId, newPassword);
    res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports = controller;
