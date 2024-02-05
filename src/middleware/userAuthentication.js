const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verificarToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token no proporcionado.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res.status(401).json({ error: 'Acceso no autorizado. Usuario no encontrado.' });
    }

    req.user = user; // Agrega el usuario al objeto de solicitud para que esté disponible en las rutas protegidas
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ error: 'Acceso no autorizado. Token inválido.' });
  }
};

module.exports = verificarToken;
