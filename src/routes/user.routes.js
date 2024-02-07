const express = require('express');
const upload = require('../middleware/multerMiddleware');
const verificarToken = require('../middleware/userAuthentication')

const { postUser, postLogin, getUsers, activeUser, changePassword} = require('../controlller/user.controller');

const routes = express.Router();

routes.post('/registrer', upload.single('imgfirme'), postUser);
routes.post('/iniciarSesion', postLogin);
routes.get('/getUsers', getUsers);
routes.put('/user/:id/active', activeUser);
routes.put('/users/:id/change-password', changePassword);



module.exports = routes;
