const { createUser, loginUser, resetPassword, restablecerPassword, getUsers, generarCodigoRestablecimiento,
  enviarCorreoRestablecimiento,
  restablecerContraseña,} = require('../services/user.services');
const User = require('../models/user.model');
const companyModel = require('../models/compay.model')
const rolModel= require ('../models/roles.model')
const ResponseStructure = require('../helpers/ResponseStructure')
const userRoleService = require('../services/user.services');


const controller = {};

//crear usuario 
controller.postUser = async (req, res) => {
  await createUser(req, res);
};

//iniciar sesion
controller.postLogin = async (req, res) => {
  await loginUser(req, res);
};



//listar usuarios
controller.getUsers = async (req, res) => {
  try {
    const listUsers = await User.find({ rol: null }).populate({
      path: 'tenantId',
      model: companyModel,
    })
    .populate({
      path: 'rol',
      mode: rolModel
    })

    res.json(listUsers); // Elimina res.send(ResponseStructure)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// actualizar roll de usuario
controller.actualizarRol = async (req, res) => {
  try {
    const { userId, nuevoRolId } = req.body;

    const resultado = await userRoleService.actualizarRolUsuario(userId, nuevoRolId);

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

//restablecer contraseña

controller.solicitarRestablecimiento = async (req, res) => {
  try {
      const { email } = req.body;

      const usuario = await User.findOne({ email: email });

      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const codigoRestablecimiento = generarCodigoRestablecimiento(email);
      usuario.resetCode = codigoRestablecimiento;
      await usuario.save();

      await enviarCorreoRestablecimiento(email, codigoRestablecimiento);

      res.json({ success: 'Solicitud de restablecimiento enviada con éxito' });
  } catch (error) {
      console.error('Error al solicitar restablecimiento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
};

controller.restablecerContraseña = async (req, res) => {
  try {
    const { email, codigo, nuevaContraseña } = req.body;

    console.log(`Solicitud de restablecimiento de contraseña para ${email} con código ${codigo}`);

    const resultado = await restablecerContraseña(email, codigo, nuevaContraseña);

    console.log(`Contraseña restablecida con éxito para ${email}`);
    res.json(resultado);
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);

    if (error.message === 'Código de restablecimiento inválido') {
      return res.status(400).json({ error: 'El código de restablecimiento proporcionado es inválido o ha expirado. Solicita un nuevo restablecimiento.' });
    }

    // Manejar otros errores
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }



};

module.exports = controller;
