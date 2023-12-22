const express = require('express');
const upload = require('../middleware/multerMiddleware');

const { postUser, postLogin, resetPasswordPost, restablecerPassword } = require('../controlller/user.controller');

const routes = express.Router();

routes.post('/registrar', upload.fields([
    { name: 'imgfirme', maxCount: 1 },  // Para imágenes
    { name: 'pdfArchivo', maxCount: 1 }         // Para archivos PDF
  ]), postUser);
  
routes.post('/iniciarSesion', postLogin);
routes.post('/reset-password', resetPasswordPost);
routes.get('/restablecer', restablecerPassword);

module.exports = routes;
