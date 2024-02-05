const express = require('express');
const upload = require('../middleware/multerMiddleware');
const verificarToken = require('../middleware/userAuthentication')

const { postUser, postLogin, resetPasswordPost, restablecerPassword, changePassword, getUsers, actualizarRol , solicitarRestablecimiento, restablecerContraseña } = require('../controlller/user.controller');

const routes = express.Router();

routes.post('/registrer', upload.single('imgfirme'), postUser);
routes.post('/iniciarSesion', postLogin);
routes.get('/getUsers', verificarToken, getUsers);
routes.put('/usuarios/actualizar-rol', verificarToken , actualizarRol);
routes.post('/solicitar-restablecimiento', solicitarRestablecimiento);
routes.post('/restablecer-password', restablecerContraseña);


module.exports = routes;
