const express = require("express");
const usersRoutes=  require('../routes/user.routes.js')
const cors = require('cors');


const app = express();
app.use(cors());
const port = 3200;




app.use(express.json());
app.use(usersRoutes)

app.set("port", process.env.PORT || port);

module.exports = app;
