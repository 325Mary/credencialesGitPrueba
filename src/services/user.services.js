const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



const createUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);

    
    const user = await User.create({
      username: req.body.username,
      empresa: req.body.empresa,
      tenantId: req.body.tenantId,
      email: req.body.email,
      password: req.body.password,
      imgfirme:  req.file ? req.file.path : null

    });

    res.json(user);
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Internal server error', message: e.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ error: 'Error en usuario/contraseña' });
    }

    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      return res.json({ error: 'Error en usuario/contraseña' });
    }

    res.json({ success: 'login correcto', token: crearToken(user) });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const resetPassword = {
  generateToken: async (email) => {
    const token = jwt.sign({
      email,
    }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return token;
  },

  sendEmail: async (email, token) => {
    // Aquí puedes agregar lógica adicional si es necesario
    return { success: true, message: 'Token generado correctamente.' };
  },
};


const restablecerPassword = {
  processResetToken: async (token) => {
    try {
      // Decodificar el token para obtener la información del usuario (en este caso, el correo electrónico)
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar el usuario en la base de datos por el correo electrónico
      const user = await User.findOne({ email: decodedToken.email });

      if (!user) {
        throw new Error('Usuario no encontrado.');
      }

      // Devuelve el usuario encontrado para que el controlador pueda permitir al usuario restablecer la contraseña.
      return user;
    } catch (error) {
      console.error('Error al procesar el token:', error);
      throw new Error('Error al procesar el token.');
    }
  },
};


function crearToken(user) {
  const payload = {
    user_id: user._id,
  };
  return jwt.sign(payload, 'running');
}



module.exports = {
  createUser,
  loginUser,
  resetPassword,
  restablecerPassword
};
