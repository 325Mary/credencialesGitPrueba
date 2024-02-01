const { createUser, loginUser, resetPassword, restablecerPassword, getUsers } = require('../services/user.services');
const User = require('../models/user.model');
const companyModel = require('../models/compay.model')
const rolModel= require ('../models/roles.model')
const ResponseStructure = require('../helpers/ResponseStructure')
const userRoleService = require('../services/user.services');


const controller = {};

controller.postUser = async (req, res) => {
  await createUser(req, res);
};

controller.postLogin = async (req, res) => {
  await loginUser(req, res);
};


controller.resetPasswordPost = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el correo existe en tu sistema
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Correo no encontrado en el sistema.' });
    }

    // Generar el token
    const token = await resetPassword.generateToken(email);

    // Aquí puedes decidir qué hacer con el token, por ejemplo, almacenarlo en la base de datos
    // o enviarlo como respuesta al cliente para que maneje el restablecimiento de la contraseña.

    // En este ejemplo, simplemente respondemos con el token (esto podría ser un riesgo de seguridad en un entorno de producción)
    res.json({ success: true, token });
  } catch (error) {
    console.error('Error al generar el token:', error);
    res.status(500).json({ success: false, message: 'Error al generar el token.' });
  }
};

controller.restablecerPassword = async (req, res) => {
  const { token } = req.query;

  try {
    // Procesar el token utilizando la función del servicio
    const user = await restablecerPassword.processResetToken(token);

    // Permitir que el usuario establezca una nueva contraseña (puedes hacerlo a través de un formulario en tu página)
    // Después de establecer la nueva contraseña, puedes invalidar o eliminar el token para mayor seguridad.

    res.json({ success: true, message: 'Token válido. Permitir al usuario restablecer la contraseña.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



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


module.exports = controller;
