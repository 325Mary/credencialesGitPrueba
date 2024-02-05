const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Rol = require('../models/roles.model')
const nodemailer = require('nodemailer');



const createUser = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);

    
    const user = await User.create({
      username: req.body.username,
      empresa: req.body.empresa,
      tenantId: req.body.tenantId,
      email: req.body.email,
      password: req.body.password,
      telephone: req.body.telephone,
      direction: req.body.direction,
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
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json({ success: 'Inicio de sesión correcto', token: crearToken(user) });
  } catch (e) {
    console.error('Error:', e);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};





function crearToken(user) {
  const payload = {
    user_id: user._id,
  };
  return jwt.sign(payload,  process.env.JWT_SECRET, { expiresIn: '1h' });
}

const getUsers = async () => {
  return await User.find();
};

const actualizarRolUsuario = async (userId, nuevoRolId) => {
  try {
    const usuario = await User.findById(userId);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.rol = nuevoRolId;
    await usuario.save();

    // Lógica para enviar el correo de confirmación
    await enviarCorreoConfirmacion(usuario.email, usuario.username);

    // Responder al cliente
    return { mensaje: 'Rol actualizado exitosamente y correo de confirmación enviado' };
  } catch (error) {
    console.error('Error al actualizar el rol o enviar el correo de confirmación:', error);
    // Manejo de error: puedes elegir responder con un mensaje de error específico
    throw error;
  }
};


const enviarCorreoConfirmacion = async (email, username) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
      user: 'litterbox212@gmail.com',
      pass: 'rtpr yunf crkt daif'
    }
  });

  const mailOptions = {
    from: 'litterbox212@gmail.com',
    to: email,
    subject: 'Confirmación de Usuario',
    text: `Hola ${username}, tu rol ha sido asignado correctamente. Gracias por registrarte.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de confirmación enviado a', email);
  } catch (error) {
    console.error('Error al enviar el correo de confirmación:', error);
    throw error;
  }
};

//restablecer contraseña

const generarCodigoRestablecimiento = (email) => {
  const hash = crypto.createHash('sha256').update(email).digest('hex').toUpperCase();
  return hash.substring(0, 6); // Puedes ajustar la longitud del código según tus necesidades
};

const enviarCorreoRestablecimiento = async (email, codigo) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
      user: 'litterbox212@gmail.com',
      pass: 'rtpr yunf crkt daif'
    }
  });

  const mailOptions = {
      from: 'litterbox212@gmail.com',
      to: email,
      subject: 'Código de Restablecimiento de Contraseña',
      text: `Tu código de restablecimiento es: ${codigo}`,
  };

  try {
      await transporter.sendMail(mailOptions);
      console.log('Correo de restablecimiento enviado a', email);
  } catch (error) {
      console.error('Error al enviar el correo de restablecimiento:', error);
      throw error;
  }
};

const restablecerContraseña = async (email, codigo, nuevaContraseña) => {
  try {
      console.log(`Intento de restablecimiento de contraseña para ${email} con código ${codigo}`);

      const usuario = await User.findOne({ resetCode: codigo, email: email });

      if (!usuario) {
          console.error(`Código de restablecimiento inválido para ${email}: ${codigo}`);
          throw new Error('Código de restablecimiento inválido');
      }

      console.log(`Usuario encontrado para ${email}:`, usuario);

      // Restablecer la contraseña y limpiar el código
      usuario.password = await bcrypt.hash(nuevaContraseña, 12);
      usuario.resetCode = null;
      await usuario.save();

      return { success: 'Contraseña restablecida con éxito' };
  } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw error;
  }





};


module.exports = {
  createUser,
  loginUser,
  getUsers,
  actualizarRolUsuario,
  generarCodigoRestablecimiento,
  enviarCorreoRestablecimiento,
  restablecerContraseña,
};
