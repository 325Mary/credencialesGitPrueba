const express = require('express');
const upload = require('../middleware/multerMiddleware');
const verificarToken = require('../middleware/userAuthentication')

const { postUser, postLogin, getUsers, activeUser, changePassword, solicitarRestablecimiento, restablecerContraseña} = require('../controlller/user.controller');

const routes = express.Router();

routes.post('/registrer', upload.single('imgfirme'), postUser);
routes.post('/iniciarSesion', postLogin);
routes.get('/getUsers',verificarToken ,  getUsers);
routes.put('/user/:id/active', activeUser);
routes.put('/users/:id/change-password', changePassword);
routes.post('/solicitar-restablecimiento', solicitarRestablecimiento);
routes.post('/restablecer-password', restablecerContraseña);


module.exports = routes;
