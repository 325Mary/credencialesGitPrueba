const express = require('express');
const upload = require('../middleware/multerMiddleware');

const { postUser, postLogin, resetPasswordPost, restablecerPassword } = require('../controlller/user.controller');

const routes = express.Router();

routes.post('/registrar', upload.single("imgFirme"), postUser);
  
routes.post('/iniciarSesion', postLogin);
routes.post('/reset-password', resetPasswordPost);
routes.get('/restablecer', restablecerPassword);

module.exports = routes;
