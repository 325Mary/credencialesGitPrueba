const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    // Extraer el token sin el prefijo Bearer
    const tokenBearer = token.split(' ')[1];

    const decoded = jwt.verify(tokenBearer, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: 'Token no válido' });
    }

    // Asignar el usuario decodificado a la solicitud
    req.user = decoded;

    next();

  } catch (e) {
    console.error('Error al verificar el token:', e);
    res.status(401).json({ error: 'Token no válido' });
  }
};

module.exports = verificarToken;
